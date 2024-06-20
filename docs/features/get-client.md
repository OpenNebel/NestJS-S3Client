# **`getClient(): S3Client`**

## Description

The `getClient` method returns the configured `S3Client` instance, allowing for direct interaction with the AWS S3 API. This is useful when you need to perform operations that are not explicitly covered by the convenience methods provided by the `S3Service` class.

### Usage

```typescript
const s3Client: S3Client = this.s3Service.getClient();
```

### Parameters

This method does not take any parameters.

### Returns

- `S3Client`: The configured AWS S3 client instance.

## Example Integration

#### Example 1: Listing All Buckets

This example demonstrates how to use the `getClient` method to list all S3 buckets in your AWS account.

```typescript
import { Injectable, OnModuleInit } from '@nestjs/common';
import { S3Service } from '@open-nebel/nestjs-s3';
import { S3Client, ListBucketsCommand } from '@aws-sdk/client-s3';

@Injectable()
export class MyService implements OnModuleInit {
  private s3Client: S3Client;

  constructor(private readonly s3Service: S3Service) {}

  onModuleInit() {
    this.s3Client = this.s3Service.getClient();
  }

  async listBuckets(): Promise<void> {
    try {
      const response = await this.s3Client.send(new ListBucketsCommand({}));
      console.log('Buckets:', response.Buckets);
    } catch (error) {
      console.error('Error listing buckets:', error);
    }
  }
}
```

In this example:
- The `MyService` class uses the `S3Service` to get the configured `S3Client`.
- The `listBuckets` method sends a `ListBucketsCommand` using the `S3Client` to list all buckets in the AWS account.

#### Example 2: Getting Bucket Location

This example demonstrates how to use the `getClient` method to get the location of a specific bucket.

```typescript
import { Injectable, OnModuleInit } from '@nestjs/common';
import { S3Service } from '@open-nebel/nestjs-s3';
import { S3Client, GetBucketLocationCommand } from '@aws-sdk/client-s3';

@Injectable()
export class MyService implements OnModuleInit {
  private s3Client: S3Client;

  constructor(private readonly s3Service: S3Service) {}

  onModuleInit() {
    this.s3Client = this.s3Service.getClient();
  }

  async getBucketLocation(bucketName: string): Promise<void> {
    try {
      const response = await this.s3Client.send(new GetBucketLocationCommand({
        Bucket: bucketName,
      }));
      console.log('Bucket location:', response.LocationConstraint);
    } catch (error) {
      console.error('Error getting bucket location:', error);
    }
  }
}
```

In this example:
- The `MyService` class uses the `S3Service` to get the configured `S3Client`.
- The `getBucketLocation` method sends a `GetBucketLocationCommand` using the `S3Client` to get the location of a specified bucket.

#### Example 3: Uploading a File with Custom Settings

This example demonstrates how to use the `getClient` method to upload a file with custom settings that are not directly supported by the convenience methods in `S3Service`.

```typescript
import { Injectable, OnModuleInit } from '@nestjs/common';
import { S3Service } from '@open-nebel/nestjs-s3';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class MyService implements OnModuleInit {
  private s3Client: S3Client;

  constructor(private readonly s3Service: S3Service) {}

  onModuleInit() {
    this.s3Client = this.s3Service.getClient();
  }

  async uploadFileWithCustomSettings(bucketName: string, key: string, body: string): Promise<void> {
    try {
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: body,
        ContentType: 'text/plain',
        Metadata: {
          'x-amz-meta-custom-label': 'custom-value',
        },
      });
      await this.s3Client.send(command);
      console.log('File uploaded successfully with custom settings.');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }
}
```

In this example:
- The `MyService` class uses the `S3Service` to get the configured `S3Client`.
- The `uploadFileWithCustomSettings` method sends a `PutObjectCommand` using the `S3Client` to upload a file with custom metadata and content type.

### Summary

The `getClient` method provides direct access to the configured `S3Client` instance, enabling you to perform a wide range of AWS S3 operations beyond the predefined methods in `S3Service`. This flexibility allows you to fully leverage the capabilities of the AWS S3 SDK within your NestJS application.