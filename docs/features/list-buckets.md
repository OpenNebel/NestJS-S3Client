# **`listBuckets()`**

::: danger ⚠️ **Information**
This method is available only since version 0.2.0.
:::

## Description

The `listBuckets` method lists all buckets in your AWS S3 account. This is useful for obtaining an overview of all the buckets you have and the owner information.

### Usage

```typescript
const { owner, buckets } = await this.s3Service.listBuckets();
console.log('Owner:', owner);
console.log('Buckets:', buckets);
```

### Parameters

This method does not require any parameters.

### Returns

- `Promise<{ owner: { name: string }; buckets: { name: string }[] }>`: A promise that resolves with an object containing the owner information and an array of buckets.

## Example Integration

### Example 1: Basic Bucket Listing

This example demonstrates how to list all buckets in your AWS S3 account using the `listBuckets` method.

```typescript
import { Injectable } from '@nestjs/common';
import { S3Service } from '@open-nebel/nestjs-s3';

@Injectable()
export class MyService {
  constructor(private readonly s3Service: S3Service) {}

  async listAllBuckets(): Promise<void> {
    try {
      const { owner, buckets } = await this.s3Service.listBuckets();
      console.log('Owner:', owner);
      console.log('Buckets:', buckets);
    } catch (error) {
      console.error('Error listing buckets:', error);
    }
  }
}
```

In this example:
- The `MyService` class uses the `S3Service` to list all buckets.
- The `listAllBuckets` method logs the owner and bucket information or logs an error if the listing fails.

### Example 2: Displaying Bucket Names

This example shows how to display just the names of all buckets in your AWS S3 account.

```typescript
import { Injectable } from '@nestjs/common';
import { S3Service } from '@open-nebel/nestjs-s3';

@Injectable()
export class MyService {
  constructor(private readonly s3Service: S3Service) {}

  async displayBucketNames(): Promise<void> {
    try {
      const { buckets } = await this.s3Service.listBuckets();
      console.log('Bucket Names:', buckets.map(bucket => bucket.name));
    } catch (error) {
      console.error('Error listing bucket names:', error);
    }
  }
}
```

In this example:
- The `MyService` class retrieves the list of buckets and logs only their names.

### Example 3: Handling No Buckets

This example demonstrates how to handle the scenario where there are no buckets in your AWS S3 account.

```typescript
import { Injectable } from '@nestjs/common';
import { S3Service } from '@open-nebel/nestjs-s3';

@Injectable()
export class MyService {
  constructor(private readonly s3Service: S3Service) {}

  async handleNoBuckets(): Promise<void> {
    try {
      const { buckets } = await this.s3Service.listBuckets();
      if (buckets.length === 0) {
        console.log('No buckets found.');
      } else {
        console.log('Buckets:', buckets);
      }
    } catch (error) {
      console.error('Error listing buckets:', error);
    }
  }
}
```

In this example:
- The `MyService` class checks if there are any buckets and logs an appropriate message if no buckets are found.

### Example 4: Listing Buckets with Enhanced Error Handling

This example demonstrates enhanced error handling for listing buckets, capturing specific error codes and providing user-friendly messages.

```typescript
import { Injectable } from '@nestjs/common';
import { S3Service } from '@open-nebel/nestjs-s3';

@Injectable()
export class MyService {
  constructor(private readonly s3Service: S3Service) {}

  async listBucketsWithEnhancedErrorHandling(): Promise<void> {
    try {
      const { owner, buckets } = await this.s3Service.listBuckets();
      console.log('Owner:', owner);
      console.log('Buckets:', buckets);
    } catch (error) {
      if (error.name === 'AccessDenied') {
        console.error('Access denied. Check your AWS credentials and permissions.');
      } else {
        console.error('Error listing buckets:', error);
      }
    }
  }
}
```

In this example:
- The `MyService` class provides specific error handling for listing buckets.
- Different error scenarios (e.g., access denied) are handled with custom error messages.

### Summary

The `listBuckets` method is essential for obtaining a list of all buckets in your AWS S3 account. With this method, you can access detailed information about the buckets and the owner. The provided examples show how to integrate this method into your NestJS application, demonstrating various use cases and handling common scenarios for robust application behavior.