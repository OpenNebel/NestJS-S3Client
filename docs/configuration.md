# Configuration

To effectively use the `@open-nebel/nest-s3` library in your NestJS application, you need to configure it properly. This page provides detailed instructions on how to set up the module both synchronously and asynchronously.

### Synchronous Configuration

In the synchronous configuration, you provide the AWS S3 credentials and settings directly in your module configuration. Here’s how you can do it:

1. **Import the S3Module:**

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

2. **Parameters:**
    - `region`: Your AWS region (e.g., `us-west-2`).
    - `accessKeyId`: Your AWS access key ID.
    - `secretAccessKey`: Your AWS secret access key.

This configuration initializes the S3 module with the provided credentials and settings, making it ready for use in your application.

### Asynchronous Configuration

Asynchronous configuration allows you to use other services, such as the `ConfigService`, to dynamically provide the AWS S3 configuration. This is particularly useful for loading configuration from environment variables or external sources.

1. **Import the ConfigModule and S3Module:**

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

2. **Setting up Environment Variables:**

   Ensure that your environment variables are set up correctly. Create a `.env` file in the root of your project (or ensure your environment variables are configured appropriately).

    ```env
    AWS_REGION=your-region
    AWS_ACCESS_KEY_ID=your-access-key-id
    AWS_SECRET_ACCESS_KEY=your-secret-access-key
    ```

3. **Parameters:**
    - `region`: Retrieved from `AWS_REGION` environment variable.
    - `accessKeyId`: Retrieved from `AWS_ACCESS_KEY_ID` environment variable.
    - `secretAccessKey`: Retrieved from `AWS_SECRET_ACCESS_KEY` environment variable.

The asynchronous configuration leverages the `ConfigService` to dynamically load the AWS S3 configuration, making it flexible and adaptable to different environments.

### Using the Configured Module

Once configured, the S3 module is ready for use in your services. You can inject the `S3Service` into any of your providers to start interacting with AWS S3.

**Example:**

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

### Summary

By following the above steps, you can configure the `@open-nebel/nest-s3` library to integrate AWS S3 seamlessly into your NestJS application. Choose the configuration method that best suits your project's needs, and leverage the powerful features of AWS S3 for your storage solutions.

---