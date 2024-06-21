# **`copyObject(sourceBucket: string, sourceKey: string, destinationBucket: string, destinationKey: string)`**

::: danger ⚠️ **Information**
This method is available only since version 0.2.0.
:::

## Description

The `copyObject` method copies an object from one bucket to another within AWS S3. This is useful for duplicating data or migrating objects between different buckets.

### Usage

```typescript
await this.s3Service.copyObject('source-bucket', 'source-key', 'destination-bucket', 'destination-key');
```

### Parameters

- `sourceBucket`: The name of the source bucket.
- `sourceKey`: The key of the source object.
- `destinationBucket`: The name of the destination bucket.
- `destinationKey`: The key of the destination object.

### Returns

- `Promise<void>`: A promise that resolves when the object is successfully copied.

## Example Integration

### Example 1: Basic Object Copying

This example demonstrates how to copy an object from one bucket to another using the `copyObject` method.

```typescript
import { Injectable } from '@nestjs/common';
import { S3Service } from '@open-nebel/nestjs-s3';

@Injectable()
export class MyService {
  constructor(private readonly s3Service: S3Service) {}

  async copyFile(): Promise<void> {
    try {
      await this.s3Service.copyObject('source-bucket', 'source-key', 'destination-bucket', 'destination-key');
      console.log('Object copied successfully.');
    } catch (error) {
      console.error('Error copying object:', error);
    }
  }
}
```

In this example:
- The `MyService` class uses the `S3Service` to copy an object.
- The `copyFile` method logs a success message or an error if the copy operation fails.

### Example 2: Copying with Metadata Update

This example shows how to copy an object and update its metadata in the destination bucket.

```typescript
import { Injectable } from '@nestjs/common';
import { S3Service } from '@open-nebel/nestjs-s3';
import { CopyObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class MyService {
  constructor(private readonly s3Service: S3Service) {}

  async copyObjectWithMetadataUpdate(): Promise<void> {
    try {
      const command = new CopyObjectCommand({
        CopySource: 'source-bucket/source-key',
        Bucket: 'destination-bucket',
        Key: 'destination-key',
        MetadataDirective: 'REPLACE',
        Metadata: {
          newKey: 'newValue'
        }
      });
      await this.s3Service.getClient().send(command);
      console.log('Object copied with updated metadata.');
    } catch (error) {
      console.error('Error copying object with metadata update:', error);
    }
  }
}
```

In this example:
- The `MyService` class copies an object and updates its metadata during the copy operation.

### Example 3: Copying Large Objects

This example demonstrates how to handle the copying of large objects between buckets.

```typescript
import { Injectable } from '@nestjs/common';
import { S3Service } from '@open-nebel/nestjs-s3';

@Injectable()
export class MyService {
  constructor(private readonly s3Service: S3Service) {}

  async copyLargeObject(sourceBucket: string, sourceKey: string, destinationBucket: string, destinationKey: string): Promise<void> {
    try {
      await this.s3Service.copyObject(sourceBucket, sourceKey, destinationBucket, destinationKey);
      console.log('Large object copied successfully.');
    } catch (error) {
      console.error('Error copying large object:', error);
    }
  }
}
```

In this example:
- The `MyService` class handles the copying of large objects between specified buckets and keys.

### Example 4: Enhanced Error Handling for Copying Objects

This example demonstrates enhanced error handling for copying objects, capturing specific error codes and providing user-friendly messages.

```typescript
import { Injectable } from '@nestjs/common';
import { S3Service } from '@open-nebel/nestjs-s3';

@Injectable()
export class MyService {
  constructor(private readonly s3Service: S3Service) {}

  async copyObjectWithEnhancedErrorHandling(sourceBucket: string, sourceKey: string, destinationBucket: string, destinationKey: string): Promise<void> {
    try {
      await this.s3Service.copyObject(sourceBucket, sourceKey, destinationBucket, destinationKey);
      console.log('Object copied successfully.');
    } catch (error) {
      if (error.name === 'NoSuchBucket') {
        console.error('The specified bucket does not exist.');
      } else {
        console.error('Error copying object:', error);
      }
    }
  }
}
```

In this example:
- The `MyService` class provides specific error handling for the copy operation.
- Different error scenarios (e.g., bucket not found) are handled with custom error messages.

### Summary

The `copyObject` method is essential for duplicating or migrating objects within AWS S3 buckets. With this method, you can perform straightforward copies, update metadata, and handle large files. The provided examples show how to integrate this method into your NestJS application, demonstrating various use cases and handling common scenarios for robust application behavior.