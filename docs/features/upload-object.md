# **`uploadObject(bucketName: string, key: string, body: string)`**

## Description

The `uploadObject` method uploads an object to a specified S3 bucket. This is useful for storing files, data, or any content in your S3 buckets.

### Usage

```typescript
await this.s3Service.uploadObject('my-new-bucket', 'my-object-key', 'Hello, world!');
```

### Parameters

- `bucketName`: The name of the bucket where the object will be uploaded.
- `key`: The key under which the object is stored.
- `body`: The content of the object. (string, Uint8Array, Buffer, ReadableStream, Blob)

### Types

- `bucketName: string`
- `key: string`
- `body: string | Uint8Array | Buffer | ReadableStream<any> | Blob`

### Returns

- `Promise<void>`: A promise that resolves when the object is successfully uploaded.

## Example Integration

#### Example 1: Basic Object Upload

This example demonstrates how to upload a simple text object to an S3 bucket using the `uploadObject` method.

```typescript
import { Injectable } from '@nestjs/common';
import { S3Service } from '@open-nebel/nestjs-s3';

@Injectable()
export class MyService {
  constructor(private readonly s3Service: S3Service) {}

  async uploadSampleObject(): Promise<void> {
    try {
      await this.s3Service.uploadObject('my-new-bucket', 'my-object-key.txt', 'Hello, world!');
      console.log('Object uploaded successfully.');
    } catch (error) {
      console.error('Error uploading object:', error);
    }
  }
}
```

In this example:
- The `MyService` class uses the `S3Service` to upload a text object to the `my-new-bucket` bucket with the key `my-object-key`.
- The `uploadSampleObject` method logs a message upon successful upload or logs an error if the upload fails.

#### Example 2: Uploading a File from Local Storage

This example demonstrates how to upload a file from local storage to an S3 bucket using the `uploadObject` method.

```typescript
import { Injectable } from '@nestjs/common';
import { S3Service } from '@open-nebel/nestjs-s3';
import * as fs from 'fs';

@Injectable()
export class MyService {
  constructor(private readonly s3Service: S3Service) {}

  async uploadFileFromLocal(bucketName: string, key: string, filePath: string): Promise<void> {
    try {
      const fileContent = fs.readFileSync(filePath);
      await this.s3Service.uploadObject(bucketName, key, fileContent.toString());
      console.log('File uploaded successfully.');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }
}
```

In this example:
- The `MyService` class reads a file from the local filesystem using `fs.readFileSync`.
- The file content is uploaded to the specified bucket and key using the `uploadObject` method.
- The `uploadFileFromLocal` method logs appropriate messages based on the upload success or failure.

#### Example 3: Uploading JSON Data

This example demonstrates how to upload JSON data to an S3 bucket using the `uploadObject` method.

```typescript
import { Injectable } from '@nestjs/common';
import { S3Service } from '@open-nebel/nestjs-s3';

@Injectable()
export class MyService {
  constructor(private readonly s3Service: S3Service) {}

  async uploadJsonData(bucketName: string, key: string, data: Record<string, any>): Promise<void> {
    try {
      const jsonData = JSON.stringify(data);
      await this.s3Service.uploadObject(bucketName, key, jsonData);
      console.log('JSON data uploaded successfully.');
    } catch (error) {
      console.error('Error uploading JSON data:', error);
    }
  }
}
```

In this example:
- The `MyService` class converts a JavaScript object to a JSON string using `JSON.stringify`.
- The JSON string is uploaded to the specified bucket and key using the `uploadObject` method.
- The `uploadJsonData` method logs appropriate messages based on the upload success or failure.

#### Example 4: Uploading a Buffer

This example demonstrates how to upload a buffer to an S3 bucket using the `uploadObject` method.

```typescript
import { Injectable } from '@nestjs/common';
import { S3Service } from '@open-nebel/nestjs-s3';
import * as fs from 'fs';

@Injectable()
export class MyService {
  constructor(private readonly s3Service: S3Service) {}

  async uploadBuffer(bucketName: string, key: string, filePath: string): Promise<void> {
    try {
      const buffer = fs.readFileSync(filePath);
      await this.s3Service.uploadObject(bucketName, key, buffer);
      console.log('Buffer uploaded successfully.');
    } catch (error) {
      console.error('Error uploading buffer:', error);
    }
  }
}
```

In this example:
- The `MyService` class reads a file into a buffer using `fs.readFileSync`.
- The buffer is uploaded to the specified bucket and key using the `uploadObject` method.
- The `uploadBuffer` method logs appropriate messages based on the upload success or failure.

### Summary

The `uploadObject` method is essential for uploading content to S3 buckets in AWS. With this method, you can store various types of data, including text, files, JSON objects, and buffers. The provided examples show how to integrate this method into your NestJS application, demonstrating various use cases and handling common scenarios for robust application behavior.