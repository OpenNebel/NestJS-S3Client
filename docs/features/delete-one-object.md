# **`deleteOneObject(bucketName: string, key: string)`**

## Description

The `deleteOneObject` method deletes a specific object from a specified S3 bucket. This is useful for managing and maintaining your S3 storage by removing unneeded or obsolete objects.

### Usage

```typescript
await this.s3Service.deleteOneObject('my-new-bucket', 'my-object-key');
```

### Parameters

- `bucketName`: The name of the bucket where the object is stored.
- `key`: The key under which the object is stored.

### Returns

- `Promise<void>`: A promise that resolves when the object is successfully deleted.

## Example Integration

#### Example 1: Basic Object Deletion

This example demonstrates how to delete a specific object from an S3 bucket using the `deleteOneObject` method.

```typescript
import { Injectable } from '@nestjs/common';
import { S3Service } from '@open-nebel/nestjs-s3';

@Injectable()
export class MyService {
  constructor(private readonly s3Service: S3Service) {}

  async deleteSampleObject(): Promise<void> {
    try {
      await this.s3Service.deleteOneObject('my-new-bucket', 'my-object-key');
      console.log('Object deleted successfully.');
    } catch (error) {
      console.error('Error deleting object:', error);
    }
  }
}
```

In this example:
- The `MyService` class uses the `S3Service` to delete a specific object from the `my-new-bucket` bucket with the key `my-object-key`.
- The `deleteSampleObject` method logs a message upon successful deletion or logs an error if the deletion fails.

#### Example 2: Conditional Object Deletion

This example demonstrates how to check if an object exists before deleting it, ensuring that an object is only deleted if it is present.

```typescript
import { Injectable } from '@nestjs/common';
import { S3Service } from '@open-nebel/nestjs-s3';
import { S3Client, HeadObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class MyService {
  private s3Client: S3Client;

  constructor(private readonly s3Service: S3Service) {
    this.s3Client = this.s3Service.getClient();
  }

  async deleteObjectIfExists(bucketName: string, key: string): Promise<void> {
    try {
      await this.s3Client.send(new HeadObjectCommand({ Bucket: bucketName, Key: key }));
      await this.s3Service.deleteOneObject(bucketName, key);
      console.log(`Object "${key}" deleted successfully.`);
    } catch (error) {
      if (error.name === 'NotFound') {
        console.log(`Object "${key}" not found in bucket "${bucketName}".`);
      } else {
        console.error('Error checking or deleting object:', error);
      }
    }
  }
}
```

In this example:
- The `MyService` class checks if an object with the specified key exists in the bucket using the `HeadObjectCommand`.
- If the object exists, it deletes the object using the `deleteOneObject` method.
- The method logs appropriate messages based on whether the object exists and is deleted or if an error occurs.

#### Example 3: Deleting an Object with Error Handling

This example demonstrates enhanced error handling by capturing specific error codes and providing user-friendly messages.

```typescript
import { Injectable } from '@nestjs/common';
import { S3Service } from '@open-nebel/nestjs-s3';

@Injectable()
export class MyService {
  constructor(private readonly s3Service: S3Service) {}

  async deleteObjectWithEnhancedErrorHandling(bucketName: string, key: string): Promise<void> {
    try {
      await this.s3Service.deleteOneObject(bucketName, key);
      console.log('Object deleted successfully.');
    } catch (error) {
      if (error.name === 'NoSuchKey') {
        console.error('The specified key does not exist.');
      } else {
        console.error('Error deleting object:', error);
      }
    }
  }
}
```

In this example:
- The `MyService` class provides more specific error handling for object deletion.
- Different error scenarios (e.g., object not found) are handled with custom error messages.

#### Example 4: Logging Deleted Object Information

This example demonstrates how to log detailed information about the deleted object for auditing purposes.

```typescript
import { Injectable } from '@nestjs/common';
import { S3Service } from '@open-nebel/nestjs-s3';

@Injectable()
export class MyService {
  constructor(private readonly s3Service: S3Service) {}

  async deleteObjectAndLog(bucketName: string, key: string): Promise<void> {
    try {
      await this.s3Service.deleteOneObject(bucketName, key);
      console.log(`Object "${key}" from bucket "${bucketName}" deleted successfully at ${new Date().toISOString()}.`);
    } catch (error) {
      console.error('Error deleting object:', error);
    }
  }
}
```

In this example:
- The `MyService` class deletes an object and logs detailed information about the deleted object, including the bucket name, key, and timestamp.
- This approach is useful for maintaining an audit trail of deleted objects.

### Summary

The `deleteOneObject` method is essential for managing and maintaining your S3 storage by allowing you to delete specific objects. With this method, you can efficiently remove unneeded or obsolete objects from your buckets. The provided examples show how to integrate this method into your NestJS application, demonstrating various use cases and handling common scenarios for robust application behavior.