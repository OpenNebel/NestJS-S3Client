import {Inject, Injectable} from '@nestjs/common';
import {
    CopyObjectCommand,
    CreateBucketCommand,
    DeleteBucketCommand,
    DeleteObjectCommand,
    GetObjectCommand, ListBucketsCommand, ListObjectsV2Command,
    paginateListObjectsV2,
    PutObjectCommand,
    S3Client,
} from '@aws-sdk/client-s3';
import {getSignedUrl} from '@aws-sdk/s3-request-presigner';
import {S3ModuleOptions} from './interfaces/s3.interface';

@Injectable()
export class S3Service {
    private readonly s3Client: S3Client;

    constructor(@Inject('S3_MODULE_OPTIONS') private options: S3ModuleOptions) {
        this.s3Client = new S3Client({
            region: options.region,
            credentials: {
                accessKeyId: options.accessKeyId,
                secretAccessKey: options.secretAccessKey,
            },
        });
    }

    /**
     * This method is used to get the S3 client.
     *
     * @returns {S3Client} The S3 client.
     */
    getClient(): S3Client {
        return this.s3Client;
    }

    /**
     * This method is used to create a new bucket in AWS S3.
     *
     * @async
     * @param {string} bucketName - The name of the bucket to be created.
     * @returns {Promise<void>} A promise that resolves when the bucket is successfully created.
     * @throws {Error} Will throw an error if the bucket creation fails.
     */
    async createBucket(bucketName: string): Promise<void> {
        await this.s3Client.send(
            new CreateBucketCommand({
                Bucket: bucketName,
            }),
        );
    }

    /**
     * This method is used to upload an object to a specified bucket in AWS S3.
     *
     * @async
     * @param {string} bucketName - The name of the bucket where the object will be uploaded.
     * @param {string} key - The key under which the object is stored.
     * @param {string} body - The content of the object.
     * @returns {Promise<void>} A promise that resolves when the object is successfully uploaded.
     * @throws {Error} Will throw an error if the object upload fails.
     */
    async uploadObject(
        bucketName: string,
        key: string,
        body: string | Uint8Array | Buffer | ReadableStream<any> | Blob
    ): Promise<void> {
        await this.s3Client.send(
            new PutObjectCommand({
                Bucket: bucketName,
                Key: key,
                Body: body,
            }),
        );
    }

    /**
     * This method is used to retrieve an object from a specified bucket in AWS S3.
     *
     * @async
     * @param {string} bucketName - The name of the bucket where the object is stored.
     * @param {string} key - The key under which the object is stored.
     * @returns {Promise<string | undefined>} A promise that resolves with the object content as a string, or undefined if the object does not exist.
     * @throws {Error} Will throw an error if the object retrieval fails.
     */
    async getObject(bucketName: string, key: string): Promise<string | undefined> {
        const {Body} = await this.s3Client.send(
            new GetObjectCommand({
                Bucket: bucketName,
                Key: key,
            }),
        );
        return Body?.transformToString();
    }

    /**
     * This method is used to delete a single object from a specified bucket in AWS S3.
     *
     * @async
     * @param {string} bucketName - The name of the bucket where the object is stored.
     * @param {string} key - The key under which the object is stored.
     * @returns {Promise<void>} A promise that resolves when the object is successfully deleted.
     * @throws {Error} Will throw an error if the object deletion fails.
     */
    async deleteOneObject(bucketName: string, key: string): Promise<void> {
        await this.s3Client.send(
            new DeleteObjectCommand({
                Bucket: bucketName,
                Key: key,
            }),
        );
    }

    /**
     * This method is used to delete all objects from a specified bucket in AWS S3.
     *
     * @async
     * @param {string} bucketName - The name of the bucket where the objects are stored.
     * @returns {Promise<void>} A promise that resolves when all objects are successfully deleted.
     * @throws {Error} Will throw an error if the deletion of any object fails.
     */
    async deleteAllObjects(bucketName: string): Promise<void> {
        const paginator = paginateListObjectsV2(
            {client: this.s3Client},
            {Bucket: bucketName},
        );

        for await (const page of paginator) {
            const objects = page.Contents;
            if (objects) {
                for (const object of objects) {
                    await this.s3Client.send(
                        new DeleteObjectCommand({Bucket: bucketName, Key: object.Key}),
                    );
                }
            }
        }
    }

    /**
     * This method is used to delete a bucket in AWS S3.
     *
     * @async
     * @param {string} bucketName - The name of the bucket to be deleted.
     * @returns {Promise<void>} A promise that resolves when the bucket is successfully deleted.
     * @throws {Error} Will throw an error if the bucket deletion fails.
     */
    async deleteBucket(bucketName: string): Promise<void> {
        await this.s3Client.send(new DeleteBucketCommand({Bucket: bucketName}));
    }


    /**
     * This method is used to create a presigned URL for a specific object in a specified bucket in AWS S3.
     *
     * @async
     * @param {Object} params - An object containing the bucket name, key of the object and the expiration time of the URL in seconds.
     * @param {string} params.bucket - The name of the bucket where the object is stored.
     * @param {string} params.key - The key under which the object is stored.
     * @param {number} [params.expiresIn=3600] - The expiration time of the URL in seconds. Defaults to 3600 seconds (1 hour).
     * @returns {Promise<string>} A promise that resolves with the presigned URL as a string.
     * @throws {Error} Will throw an error if the presigned URL creation fails.
     */
    async createPresignedUrlWithClient({bucket, key, expiresIn = 3600}: {
        bucket: string,
        key: string,
        expiresIn?: number
    }) {
        const command = new GetObjectCommand({Bucket: bucket, Key: key});
        return getSignedUrl(this.s3Client, command, {expiresIn: expiresIn});
    }


    /**
     * This method is used to copy an object from one bucket to another in AWS S3.
     *
     * @async
     * @param {string} sourceBucket - The name of the source bucket.
     * @param {string} sourceKey - The key of the source object.
     * @param {string} destinationBucket - The name of the destination bucket.
     * @param {string} destinationKey - The key of the destination object.
     * @returns {Promise<void>} A promise that resolves when the object is successfully copied.
     * @throws {Error} Will throw an error if the object copy fails.
     */
    async copyObject(
        sourceBucket: string,
        sourceKey: string,
        destinationBucket: string,
        destinationKey: string
    ): Promise<void> {
        const command = new CopyObjectCommand({
            CopySource: `${sourceBucket}/${sourceKey}`,
            Bucket: destinationBucket,
            Key: destinationKey,
        });

        await this.s3Client.send(command);
    }

    /**
     * This method is used to list all buckets in the AWS S3.
     *
     * @async
     * @returns {Promise<{owner: {name: string}, buckets: {name: string}[]}>} A promise that resolves with the owner and buckets information.
     * @throws {Error} Will throw an error if the bucket listing fails.
     */
    async listBuckets(): Promise<{
        owner: { name: string };
        buckets: { name: string }[];
    }> {
        const command = new ListBucketsCommand({});
        const response = await this.s3Client.send(command);

        const owner = response.Owner
            ? {name: response.Owner.DisplayName ?? "unknown"}
            : {name: "unknown"};

        const buckets = (response.Buckets ?? []).map(bucket => ({
            name: bucket.Name ?? "Unnamed"
        }));

        return {owner: owner, buckets: buckets};
    }
}
