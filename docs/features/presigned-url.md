# **`createPresignedUrlWithClient(params: { bucket: string; key: string; expiresIn?: number })`**

## Description

The `createPresignedUrlWithClient` method generates a presigned URL for accessing an object in the specified S3 bucket. This URL can be used to provide temporary access to the object without requiring AWS credentials, which is useful for sharing files securely.

### Usage

```typescript
const presignedUrl = await this.s3Service.createPresignedUrlWithClient({ bucket: 'my-new-bucket', key: 'my-object-key' });
console.log('Presigned URL:', presignedUrl);
```

### Parameters

- `params`: An object containing:
    - `bucket`: The name of the bucket where the object is stored.
    - `key`: The key under which the object is stored.
    - `expiresIn` (optional): The expiration time of the URL in seconds. Defaults to 3600 seconds (1 hour).

### Returns

- `Promise<string>`: A promise that resolves with the presigned URL as a string.

## Example Integration

#### Example 1: Basic Presigned URL Generation

This example demonstrates how to generate a presigned URL for an object in an S3 bucket using the `createPresignedUrlWithClient` method.

```typescript
import { Injectable } from '@nestjs/common';
import { S3Service } from '@open-nebel/nestjs-s3';

@Injectable()
export class MyService {
  constructor(private readonly s3Service: S3Service) {}

  async generatePresignedUrl(): Promise<void> {
    try {
      const presignedUrl = await this.s3Service.createPresignedUrlWithClient({ bucket: 'my-new-bucket', key: 'my-object-key' });
      console.log('Presigned URL:', presignedUrl);
    } catch (error) {
      console.error('Error generating presigned URL:', error);
    }
  }
}
```

In this example:
- The `MyService` class uses the `S3Service` to generate a presigned URL for the `my-object-key` in the `my-new-bucket` bucket.
- The `generatePresignedUrl` method logs the generated presigned URL or logs an error if the URL generation fails.

#### Example 2: Presigned URL with Custom Expiration

This example demonstrates how to generate a presigned URL with a custom expiration time.

```typescript
import { Injectable } from '@nestjs/common';
import { S3Service } from '@open-nebel/nestjs-s3';

@Injectable()
export class MyService {
  constructor(private readonly s3Service: S3Service) {}

  async generatePresignedUrlWithCustomExpiration(): Promise<void> {
    try {
      const presignedUrl = await this.s3Service.createPresignedUrlWithClient({ bucket: 'my-new-bucket', key: 'my-object-key', expiresIn: 7200 });
      console.log('Presigned URL with custom expiration:', presignedUrl);
    } catch (error) {
      console.error('Error generating presigned URL:', error);
    }
  }
}
```

In this example:
- The `MyService` class generates a presigned URL for the `my-object-key` in the `my-new-bucket` bucket with a custom expiration time of 7200 seconds (2 hours).
- The `generatePresignedUrlWithCustomExpiration` method logs the generated presigned URL or logs an error if the URL generation fails.

#### Example 3: Using Presigned URL to Share a File

This example demonstrates how to generate a presigned URL and use it to share a file with an external user.

```typescript
import { Injectable } from '@nestjs/common';
import { S3Service } from '@open-nebel/nestjs-s3';

@Injectable()
export class MyService {
  constructor(private readonly s3Service: S3Service) {}

  async shareFile(bucketName: string, key: string, email: string): Promise<void> {
    try {
      const presignedUrl = await this.s3Service.createPresignedUrlWithClient({ bucket: bucketName, key });
      // Send the presigned URL via email (implementation of sendEmail not shown)
      await this.sendEmail(email, 'File Share', `You can download the file using this link: ${presignedUrl}`);
      console.log('Presigned URL sent to email:', email);
    } catch (error) {
      console.error('Error sharing file:', error);
    }
  }

  private async sendEmail(to: string, subject: string, body: string): Promise<void> {
    // Placeholder for email sending logic
    console.log(`Email sent to ${to}: ${subject} - ${body}`);
  }
}
```

In this example:
- The `MyService` class generates a presigned URL for an object and sends it via email to share the file with an external user.
- The `shareFile` method logs the email recipient and any errors that occur during the process.

#### Example 4: Logging Presigned URL Generation

This example demonstrates how to log detailed information about the presigned URL generation for auditing purposes.

```typescript
import { Injectable } from '@nestjs/common';
import { S3Service } from '@open-nebel/nestjs-s3';

@Injectable()
export class MyService {
  constructor(private readonly s3Service: S3Service) {}

  async generateAndLogPresignedUrl(bucketName: string, key: string): Promise<void> {
    try {
      const presignedUrl = await this.s3Service.createPresignedUrlWithClient({ bucket: bucketName, key });
      console.log(`Presigned URL for ${bucketName}/${key} generated at ${new Date().toISOString()}: ${presignedUrl}`);
    } catch (error) {
      console.error('Error generating presigned URL:', error);
    }
  }
}
```

In this example:
- The `MyService` class generates a presigned URL and logs detailed information, including the bucket name, key, and timestamp.
- This approach is useful for maintaining an audit trail of presigned URL generation.

### Summary

The `createPresignedUrlWithClient` method is essential for generating presigned URLs to securely share access to objects in S3 buckets. This method allows for temporary access to specific objects without requiring AWS credentials, making it ideal for sharing files with external users. The provided examples show how to integrate this method into your NestJS application, demonstrating various use cases and handling common scenarios for robust application behavior.