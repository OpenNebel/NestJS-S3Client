# **`getObject(bucketName: string, key: string)`**

## Description

The `getObject` method retrieves an object from a specified S3 bucket. This is useful for accessing and reading the content stored in your S3 buckets.

### Usage

```typescript
const content = await this.s3Service.getObject('my-new-bucket', 'my-object-key');
console.log('Object content:', content);
```

### Parameters

- `bucketName`: The name of the bucket where the object is stored.
- `key`: The key under which the object is stored.

### Returns

- `Promise<string | undefined>`: A promise that resolves with the object content as a string, or `undefined` if the object does not exist.

## Example Integration

#### Example 1: Basic Object Retrieval

This example demonstrates how to retrieve a simple text object from an S3 bucket using the `getObject` method.

```typescript
import { Injectable } from '@nestjs/common';
import { S3Service } from '@open-nebel/nestjs-s3';

@Injectable()
export class MyService {
  constructor(private readonly s3Service: S3Service) {}

  async retrieveObject(): Promise<void> {
    try {
      const content = await this.s3Service.getObject('my-new-bucket', 'my-object-key');
      console.log('Object content:', content);
    } catch (error) {
      console.error('Error retrieving object:', error);
    }
  }
}
```

In this example:
- The `MyService` class uses the `S3Service` to retrieve a text object from the `my-new-bucket` bucket with the key `my-object-key`.
- The `retrieveObject` method logs the content of the object or logs an error if the retrieval fails.

#### Example 2: Retrieving JSON Data

This example demonstrates how to retrieve JSON data from an S3 bucket using the `getObject` method and parse it.

```typescript
import { Injectable } from '@nestjs/common';
import { S3Service } from '@open-nebel/nestjs-s3';

@Injectable()
export class MyService {
  constructor(private readonly s3Service: S3Service) {}

  async retrieveJsonObject(bucketName: string, key: string): Promise<void> {
    try {
      const content = await this.s3Service.getObject(bucketName, key);
      if (content) {
        const data = JSON.parse(content);
        console.log('JSON data:', data);
      } else {
        console.log('Object not found.');
      }
    } catch (error) {
      console.error('Error retrieving JSON object:', error);
    }
  }
}
```

In this example:
- The `MyService` class retrieves a JSON object from the specified bucket and key.
- The content is parsed using `JSON.parse` and logged to the console.

#### Example 3: Handling Large Objects

This example demonstrates how to handle the retrieval of large objects from an S3 bucket.

```typescript
import { Injectable } from '@nestjs/common';
import { S3Service } from '@open-nebel/nestjs-s3';

@Injectable()
export class MyService {
  constructor(private readonly s3Service: S3Service) {}

  async retrieveLargeObject(bucketName: string, key: string): Promise<void> {
    try {
      const content = await this.s3Service.getObject(bucketName, key);
      if (content) {
        // Process the large content as needed
        console.log('Large object content size:', content.length);
      } else {
        console.log('Object not found.');
      }
    } catch (error) {
      console.error('Error retrieving large object:', error);
    }
  }
}
```

In this example:
- The `MyService` class retrieves a large object from the specified bucket and key.
- The size of the object content is logged to the console.

#### Example 4: Retrieving Object with Error Handling

This example demonstrates enhanced error handling for object retrieval, capturing specific error codes and providing user-friendly messages.

```typescript
import { Injectable } from '@nestjs/common';
import { S3Service } from '@open-nebel/nestjs-s3';

@Injectable()
export class MyService {
  constructor(private readonly s3Service: S3Service) {}

  async retrieveObjectWithEnhancedErrorHandling(bucketName: string, key: string): Promise<void> {
    try {
      const content = await this.s3Service.getObject(bucketName, key);
      if (content) {
        console.log('Object content:', content);
      } else {
        console.log('Object not found.');
      }
    } catch (error) {
      if (error.name === 'NoSuchKey') {
        console.error('The specified key does not exist.');
      } else {
        console.error('Error retrieving object:', error);
      }
    }
  }
}
```

In this example:
- The `MyService` class provides specific error handling for object retrieval.
- Different error scenarios (e.g., object not found) are handled with custom error messages.

### Summary

The `getObject` method is essential for retrieving content from S3 buckets in AWS. With this method, you can access various types of data, including text, JSON objects, and large files. The provided examples show how to integrate this method into your NestJS application, demonstrating various use cases and handling common scenarios for robust application behavior.