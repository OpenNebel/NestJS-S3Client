# **`deleteAllObjects(bucketName: string)`**

## Description

The `deleteAllObjects` method deletes all objects from a specified S3 bucket. This is useful for cleaning up a bucket by removing all its contents, which can be particularly helpful during testing, reinitialization, or bulk deletions.

### Usage

```typescript
await this.s3Service.deleteAllObjects('my-new-bucket');
```

### Parameters

- `bucketName`: The name of the bucket from which all objects will be deleted.

### Returns

- `Promise<void>`: A promise that resolves when all objects are successfully deleted.

## Example Integration

#### Example 1: Basic Deletion of All Objects

This example demonstrates how to delete all objects from an S3 bucket using the `deleteAllObjects` method.

```typescript
import { Injectable } from '@nestjs/common';
import { S3Service } from '@open-nebel/nestjs-s3';

@Injectable()
export class MyService {
  constructor(private readonly s3Service: S3Service) {}

  async clearBucket(): Promise<void> {
    try {
      await this.s3Service.deleteAllObjects('my-new-bucket');
      console.log('All objects deleted successfully.');
    } catch (error) {
      console.error('Error deleting all objects:', error);
    }
  }
}
```

In this example:
- The `MyService` class uses the `S3Service` to delete all objects from the `my-new-bucket` bucket.
- The `clearBucket` method logs a message upon successful deletion of all objects or logs an error if the deletion fails.

#### Example 2: Conditional Deletion with Confirmation

This example demonstrates how to delete all objects from a bucket only after user confirmation.

```typescript
import { Injectable } from '@nestjs/common';
import { S3Service } from '@open-nebel/nestjs-s3';

@Injectable()
export class MyService {
  constructor(private readonly s3Service: S3Service) {}

  async clearBucketWithConfirmation(bucketName: string, confirm: boolean): Promise<void> {
    if (!confirm) {
      console.log('Deletion cancelled by user.');
      return;
    }

    try {
      await this.s3Service.deleteAllObjects(bucketName);
      console.log(`All objects in bucket "${bucketName}" deleted successfully.`);
    } catch (error) {
      console.error('Error deleting all objects:', error);
    }
  }
}
```

In this example:
- The `MyService` class deletes all objects from the specified bucket only if the `confirm` parameter is `true`.
- This approach is useful for preventing accidental deletions by requiring user confirmation.

#### Example 3: Logging Deleted Object Information

This example demonstrates how to log detailed information about each deleted object for auditing purposes.

```typescript
import { Injectable } from '@nestjs/common';
import { S3Service } from '@open-nebel/nestjs-s3';
import { paginateListObjectsV2, DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class MyService {
  private s3Client: S3Client;

  constructor(private readonly s3Service: S3Service) {
    this.s3Client = this.s3Service.getClient();
  }

  async clearBucketAndLog(bucketName: string): Promise<void> {
    try {
      const paginator = paginateListObjectsV2(
        { client: this.s3Client },
        { Bucket: bucketName }
      );

      for await (const page of paginator) {
        const objects = page.Contents;
        if (objects) {
          for (const object of objects) {
            await this.s3Client.send(
              new DeleteObjectCommand({ Bucket: bucketName, Key: object.Key })
            );
            console.log(`Deleted object: ${object.Key} from bucket: ${bucketName}`);
          }
        }
      }
      console.log(`All objects in bucket "${bucketName}" deleted successfully.`);
    } catch (error) {
      console.error('Error deleting all objects:', error);
    }
  }
}
```

In this example:
- The `MyService` class logs detailed information about each deleted object, including the object key and bucket name.
- This approach is useful for maintaining an audit trail of deleted objects.

### Summary

The `deleteAllObjects` method is essential for cleaning up S3 buckets by removing all their contents. This method allows for efficient bulk deletions, making it useful in scenarios such as testing, reinitialization, or maintenance. The provided examples show how to integrate this method into your NestJS application, demonstrating various use cases and handling common scenarios for robust application behavior.