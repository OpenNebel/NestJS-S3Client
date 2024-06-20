# **`deleteBucket(bucketName: string)`**

## Description

The `deleteBucket` method deletes a specified S3 bucket. This method is useful when you need to completely remove a bucket, including all its configurations and metadata.

### Usage

```typescript
await this.s3Service.deleteBucket('my-new-bucket');
```

### Parameters

- `bucketName`: The name of the bucket to be deleted.

### Returns

- `Promise<void>`: A promise that resolves when the bucket is successfully deleted.

## Example Integration

#### Example 1: Basic Bucket Deletion

This example demonstrates how to delete a specified S3 bucket using the `deleteBucket` method.

```typescript
import { Injectable } from '@nestjs/common';
import { S3Service } from '@open-nebel/nestjs-s3';

@Injectable()
export class MyService {
  constructor(private readonly s3Service: S3Service) {}

  async removeBucket(): Promise<void> {
    try {
      await this.s3Service.deleteBucket('my-new-bucket');
      console.log('Bucket deleted successfully.');
    } catch (error) {
      console.error('Error deleting bucket:', error);
    }
  }
}
```

In this example:
- The `MyService` class uses the `S3Service` to delete the `my-new-bucket` bucket.
- The `removeBucket` method logs a message upon successful deletion or logs an error if the deletion fails.

#### Example 2: Conditional Bucket Deletion

This example demonstrates how to check if a bucket is empty before deleting it to avoid accidental deletions.

```typescript
import { Injectable } from '@nestjs/common';
import { S3Service } from '@open-nebel/nestjs-s3';
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

@Injectable()
export class MyService {
  private s3Client: S3Client;

  constructor(private readonly s3Service: S3Service) {
    this.s3Client = this.s3Service.getClient();
  }

  async deleteBucketIfEmpty(bucketName: string): Promise<void> {
    try {
      const response = await this.s3Client.send(new ListObjectsV2Command({ Bucket: bucketName }));
      if (response.Contents && response.Contents.length > 0) {
        console.log(`Bucket "${bucketName}" is not empty.`);
      } else {
        await this.s3Service.deleteBucket(bucketName);
        console.log(`Bucket "${bucketName}" deleted successfully.`);
      }
    } catch (error) {
      console.error('Error checking or deleting bucket:', error);
    }
  }
}
```

In this example:
- The `MyService` class checks if the specified bucket is empty using the `ListObjectsV2Command`.
- If the bucket is empty, it deletes the bucket using the `deleteBucket` method.
- The method logs appropriate messages based on whether the bucket is empty and deleted or if an error occurs.

#### Example 3: Deleting a Bucket with Confirmation

This example demonstrates how to delete a bucket only after user confirmation to prevent accidental deletions.

```typescript
import { Injectable } from '@nestjs/common';
import { S3Service } from '@open-nebel/nestjs-s3';

@Injectable()
export class MyService {
  constructor(private readonly s3Service: S3Service) {}

  async deleteBucketWithConfirmation(bucketName: string, confirm: boolean): Promise<void> {
    if (!confirm) {
      console.log('Deletion cancelled by user.');
      return;
    }

    try {
      await this.s3Service.deleteBucket(bucketName);
      console.log(`Bucket "${bucketName}" deleted successfully.`);
    } catch (error) {
      console.error('Error deleting bucket:', error);
    }
  }
}
```

In this example:
- The `MyService` class deletes the specified bucket only if the `confirm` parameter is `true`.
- This approach is useful for preventing accidental deletions by requiring user confirmation.

#### Example 4: Deleting a Bucket and Logging

This example demonstrates how to log detailed information about the deleted bucket for auditing purposes.

```typescript
import { Injectable } from '@nestjs/common';
import { S3Service } from '@open-nebel/nestjs-s3';

@Injectable()
export class MyService {
  constructor(private readonly s3Service: S3Service) {}

  async deleteBucketAndLog(bucketName: string): Promise<void> {
    try {
      await this.s3Service.deleteBucket(bucketName);
      console.log(`Bucket "${bucketName}" deleted successfully at ${new Date().toISOString()}.`);
    } catch (error) {
      console.error('Error deleting bucket:', error);
    }
  }
}
```

In this example:
- The `MyService` class deletes a bucket and logs detailed information about the deletion, including the bucket name and timestamp.
- This approach is useful for maintaining an audit trail of deleted buckets.

### Summary

The `deleteBucket` method is essential for completely removing S3 buckets. This method allows for efficient management of your S3 infrastructure by enabling bucket deletions when they are no longer needed. The provided examples show how to integrate this method into your NestJS application, demonstrating various use cases and handling common scenarios for robust application behavior.