# **`createBucket(bucketName: string)`**

## Description

The `createBucket` method creates a new S3 bucket with the specified name. This is useful when you need to programmatically create new buckets for organizing your data in AWS S3.

### Usage

```typescript
await this.s3Service.createBucket('my-new-bucket');
```

### Parameters

- `bucketName`: The name of the bucket to be created.

### Returns

- `Promise<void>`: A promise that resolves when the bucket is successfully created.

## Example Integration

#### Example 1: Basic Bucket Creation

This example demonstrates how to create a new S3 bucket using the `createBucket` method.

```typescript
import { Injectable } from '@nestjs/common';
import { S3Service } from '@open-nebel/nestjs-s3';

@Injectable()
export class MyService {
  constructor(private readonly s3Service: S3Service) {}

  async createNewBucket(): Promise<void> {
    try {
      await this.s3Service.createBucket('my-new-bucket');
      console.log('Bucket created successfully.');
    } catch (error) {
      console.error('Error creating bucket:', error);
    }
  }
}
```

In this example:
- The `MyService` class uses the `S3Service` to create a new S3 bucket named `my-new-bucket`.
- The `createNewBucket` method logs a message upon successful creation or logs an error if the creation fails.

#### Example 2: Conditional Bucket Creation

This example demonstrates how to check if a bucket exists before creating it, ensuring that a bucket is only created if it doesn't already exist.

```typescript
import { Injectable } from '@nestjs/common';
import { S3Service } from '@open-nebel/nestjs-s3';
import { S3Client, HeadBucketCommand } from '@aws-sdk/client-s3';

@Injectable()
export class MyService {
  private s3Client: S3Client;

  constructor(private readonly s3Service: S3Service) {
    this.s3Client = this.s3Service.getClient();
  }

  async createBucketIfNotExists(bucketName: string): Promise<void> {
    try {
      await this.s3Client.send(new HeadBucketCommand({ Bucket: bucketName }));
      console.log(`Bucket "${bucketName}" already exists.`);
    } catch (error) {
      if (error.name === 'NotFound') {
        try {
          await this.s3Service.createBucket(bucketName);
          console.log(`Bucket "${bucketName}" created successfully.`);
        } catch (createError) {
          console.error('Error creating bucket:', createError);
        }
      } else {
        console.error('Error checking bucket existence:', error);
      }
    }
  }
}
```

In this example:
- The `MyService` class checks if a bucket named `bucketName` exists using the `HeadBucketCommand`.
- If the bucket does not exist, it creates the bucket using the `createBucket` method.
- The method logs appropriate messages based on whether the bucket exists, is created successfully, or encounters an error.

#### Example 3: Bucket Creation with Error Handling

This example demonstrates enhanced error handling by capturing specific error codes and providing user-friendly messages.

```typescript
import { Injectable } from '@nestjs/common';
import { S3Service } from '@open-nebel/nestjs-s3';

@Injectable()
export class MyService {
  constructor(private readonly s3Service: S3Service) {}

  async createBucketWithEnhancedErrorHandling(bucketName: string): Promise<void> {
    try {
      await this.s3Service.createBucket(bucketName);
      console.log('Bucket created successfully.');
    } catch (error) {
      if (error.name === 'BucketAlreadyExists') {
        console.error('Bucket with the same name already exists.');
      } else if (error.name === 'BucketAlreadyOwnedByYou') {
        console.error('You already own a bucket with the same name.');
      } else {
        console.error('Error creating bucket:', error);
      }
    }
  }
}
```

In this example:
- The `MyService` class provides more specific error handling for bucket creation.
- Different error scenarios (e.g., bucket already exists, bucket already owned by the user) are handled with custom error messages.

### Summary

The `createBucket` method is essential for programmatically creating new S3 buckets in AWS. With this method, you can dynamically manage your storage infrastructure, ensuring that new buckets are created as needed. The provided examples show how to integrate this method into your NestJS application, handle common scenarios like bucket existence checks, and enhance error handling for robust application behavior.