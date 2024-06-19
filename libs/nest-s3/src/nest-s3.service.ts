import { Inject, Injectable } from '@nestjs/common';
import {
  CreateBucketCommand,
  DeleteBucketCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  paginateListObjectsV2,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3ModuleOptions } from './interfaces/s3.interface';

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

  async createBucket(bucketName: string): Promise<void> {
    await this.s3Client.send(
      new CreateBucketCommand({
        Bucket: bucketName,
      }),
    );
  }

  async uploadObject(
    bucketName: string,
    key: string,
    body: string,
  ): Promise<void> {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: body,
      }),
    );
  }

  async getObject(bucketName: string, key: string): Promise<string|undefined> {
    const { Body } = await this.s3Client.send(
      new GetObjectCommand({
        Bucket: bucketName,
        Key: key,
      }),
    );
    return Body?.transformToString();
  }

  async deleteOneObject(bucketName: string, key: string): Promise<void> {
    await this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: bucketName,
        Key: key,
      }),
    );
  }

  async deleteAllObjects(bucketName: string): Promise<void> {
    const paginator = paginateListObjectsV2(
      { client: this.s3Client },
      { Bucket: bucketName },
    );

    for await (const page of paginator) {
      const objects = page.Contents;
      if (objects) {
        for (const object of objects) {
          await this.s3Client.send(
            new DeleteObjectCommand({ Bucket: bucketName, Key: object.Key }),
          );
        }
      }
    }
  }

  async deleteBucket(bucketName: string): Promise<void> {
    await this.s3Client.send(new DeleteBucketCommand({ Bucket: bucketName }));
  }

  async createPresignedUrlWithClient({ bucket, key } : { bucket: string, key: string }) {
    const command = new GetObjectCommand({ Bucket: bucket, Key: key });
    return getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
  }

  async uploadFile(): Promise<string> {
    const bucketName = `test-bucket-${Date.now()}`;
    await this.createBucket(bucketName);
    await this.uploadObject(
      bucketName,
      'my-first-object.txt',
      'Hello JavaScript SDK !!!',
    );
    //return await this.getObject(bucketName, 'my-first-object.txt');

    return this.createPresignedUrlWithClient({
      bucket: bucketName,
      key: 'my-first-object.txt',
    });
  }
}
