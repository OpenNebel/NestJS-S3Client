import { Test, TestingModule } from '@nestjs/testing';
import { S3Service } from './nest-s3.service';
import { S3Client, CreateBucketCommand, DeleteBucketCommand, DeleteObjectCommand, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3ModuleOptions } from './interfaces/s3.interface';

jest.mock('@aws-sdk/client-s3', () => {
    return {
        S3Client: jest.fn().mockImplementation(() => {
            return {
                send: jest.fn(),
            };
        }),
        CreateBucketCommand: jest.fn(),
        DeleteBucketCommand: jest.fn(),
        DeleteObjectCommand: jest.fn(),
        GetObjectCommand: jest.fn(),
        PutObjectCommand: jest.fn(),
    };
});

jest.mock('@aws-sdk/s3-request-presigner', () => ({
    getSignedUrl: jest.fn(),
}));

describe('S3Service', () => {
    let service: S3Service;
    let s3Client: S3Client;

    const mockS3Options: S3ModuleOptions = {
        region: 'us-east-1',
        accessKeyId: 'test',
        secretAccessKey: 'test',
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                S3Service,
                {
                    provide: 'S3_MODULE_OPTIONS',
                    useValue: mockS3Options,
                },
            ],
        }).compile();

        service = module.get<S3Service>(S3Service);
        s3Client = service.getClient();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a bucket', async () => {
        const bucketName = 'test-bucket';
        const sendMock = jest.spyOn(s3Client, 'send').mockResolvedValueOnce({});

        await service.createBucket(bucketName);

        expect(sendMock).toHaveBeenCalledWith(expect.any(CreateBucketCommand));
        expect(sendMock).toHaveBeenCalledTimes(1);
    });

    it('should upload an object', async () => {
        const bucketName = 'test-bucket';
        const key = 'test-key';
        const body = 'test-body';
        const sendMock = jest.spyOn(s3Client, 'send').mockResolvedValueOnce({});

        await service.uploadObject(bucketName, key, body);

        expect(sendMock).toHaveBeenCalledWith(expect.any(PutObjectCommand));
        expect(sendMock).toHaveBeenCalledTimes(1);
    });

    it('should get an object', async () => {
        const bucketName = 'test-bucket';
        const key = 'test-key';
        const bodyContent = 'test-body';
        const sendMock = jest.spyOn(s3Client, 'send').mockResolvedValueOnce({ Body: { transformToString: jest.fn().mockResolvedValueOnce(bodyContent) } });

        const result = await service.getObject(bucketName, key);

        expect(sendMock).toHaveBeenCalledWith(expect.any(GetObjectCommand));
        expect(sendMock).toHaveBeenCalledTimes(1);
        expect(result).toBe(bodyContent);
    });

    it('should delete one object', async () => {
        const bucketName = 'test-bucket';
        const key = 'test-key';
        const sendMock = jest.spyOn(s3Client, 'send').mockResolvedValueOnce({});

        await service.deleteOneObject(bucketName, key);

        expect(sendMock).toHaveBeenCalledWith(expect.any(DeleteObjectCommand));
        expect(sendMock).toHaveBeenCalledTimes(1);
    });

    it('should delete a bucket', async () => {
        const bucketName = 'test-bucket';
        const sendMock = jest.spyOn(s3Client, 'send').mockResolvedValueOnce({});

        await service.deleteBucket(bucketName);

        expect(sendMock).toHaveBeenCalledWith(expect.any(DeleteBucketCommand));
        expect(sendMock).toHaveBeenCalledTimes(1);
    });

    it('should create a presigned URL', async () => {
        const params = { bucket: 'test-bucket', key: 'test-key', expiresIn: 3600 };
        const signedUrl = 'https://example.com/test-url';
        (getSignedUrl as jest.Mock).mockResolvedValueOnce(signedUrl);

        const result = await service.createPresignedUrlWithClient(params);

        expect(getSignedUrl).toHaveBeenCalledWith(expect.any(S3Client), expect.any(GetObjectCommand), { expiresIn: params.expiresIn });
        expect(result).toBe(signedUrl);
    });
});
