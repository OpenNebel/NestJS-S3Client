# @open-nebel/nest-s3

A NestJS module for interacting with AWS S3. This module simplifies the integration of AWS S3 within a NestJS application by providing injectable services and configuration options.

**Note**: This library is compatible with AWS SDK V3.

> **Version 2.x Upcoming End-of-Support**
>
> We announced the upcoming end-of-support for AWS SDK for JavaScript v2. We recommend that you migrate to AWS SDK for JavaScript v3. For dates, additional details, and information on how to migrate, please refer to the linked announcement.
>
> The AWS SDK for JavaScript v3 is the latest and recommended version, which has been GA since December 2020. Here is why and how you should use AWS SDK for JavaScript v3. You can try our experimental migration scripts in aws-sdk-js-codemod to migrate your application from v2 to v3.

## Installation

To install the package, use the following commands:

```bash
npm install @open-nebel/nest-s3
```

or

```bash
yarn add @open-nebel/nest-s3
```

## Usage

### Configuration

You can configure the S3 module using either synchronous or asynchronous configuration.

#### Synchronous Configuration

```typescript
import { Module } from '@nestjs/common';
import { S3Module } from '@open-nebel/nest-s3';

@Module({
    imports: [
        S3Module.forRoot({
            region: 'your-region',
            accessKeyId: 'your-access-key-id',
            secretAccessKey: 'your-secret-access-key',
        }),
    ],
})
export class AppModule {}
```

#### Asynchronous Configuration

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { S3Module } from '@open-nebel/nest-s3';

@Module({
    imports: [
        ConfigModule.forRoot(),
        S3Module.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                region: configService.get<string>('AWS_REGION'),
                accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
                secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'),
            }),
        }),
    ],
})
export class AppModule {}
```

### Using the S3Service

The `S3Service` provides methods to interact with AWS S3, such as creating buckets, uploading objects, and generating presigned URLs.

```typescript
import { Injectable } from '@nestjs/common';
import { S3Service } from '@open-nebel/nest-s3';

@Injectable()
export class MyService {
    constructor(private readonly s3Service: S3Service) {}

    async uploadFile() {
        const bucketName = 'your-bucket-name';
        const key = 'your-file-key';
        const body = 'your-file-content';

        await this.s3Service.createBucket(bucketName);
        await this.s3Service.uploadObject(bucketName, key, body);

        const presignedUrl = await this.s3Service.createPresignedUrlWithClient({ bucket: bucketName, key });
        console.log('Presigned URL:', presignedUrl);
    }
}
```

### Available Methods

#### `createBucket(bucketName: string): Promise<void>`

Creates a new S3 bucket with the specified name.

#### `uploadObject(bucketName: string, key: string, body: string): Promise<void>`

Uploads an object to the specified S3 bucket.

#### `getObject(bucketName: string, key: string): Promise<string | undefined>`

Retrieves an object from the specified S3 bucket.

#### `deleteOneObject(bucketName: string, key: string): Promise<void>`

Deletes an object from the specified S3 bucket.

#### `deleteAllObjects(bucketName: string): Promise<void>`

Deletes all objects from the specified S3 bucket.

#### `deleteBucket(bucketName: string): Promise<void>`

Deletes the specified S3 bucket.

#### `createPresignedUrlWithClient(params: { bucket: string; key: string }): Promise<string>`

Generates a presigned URL for accessing an object in the specified S3 bucket.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue on GitHub.

## Acknowledgements

This package uses the AWS SDK for JavaScript (v3) and is inspired by the design principles of NestJS.

## Support

If you encounter any issues or have any questions, feel free to open an issue on GitHub or contact the maintainers.

---