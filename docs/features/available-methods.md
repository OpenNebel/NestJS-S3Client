# **Available Methods**

Below are the available methods provided by the `S3Client` and `S3Service`

Before using these methods, ensure that you have configured the S3 module with the necessary credentials and settings. The S3 module provides a set of methods to interact with AWS S3, such as creating buckets, uploading objects, retrieving objects, deleting objects, and deleting buckets.

## *Inject the s3Service*

To use the methods provided by the `S3Service`, you need to inject the `S3Service` into your services or controllers. The `S3Service` class encapsulates the logic for interacting with AWS S3, providing a convenient way to perform various operations on S3 buckets and objects.

### *Example Usage in a Service*

```typescript
import { Injectable } from '@nestjs/common';
import { S3Service } from '@open-nebel/nest-s3';
import { S3Client, ListBucketsCommand } from '@aws-sdk/client-s3';

@Injectable()
export class MyService {
  constructor(private readonly s3Service: S3Service) {}
    
  // Use the s3Service to interact with AWS S3
}
```

## Available Methods

### **`getClient(): S3Client`**

Returns the configured S3Client instance for direct interaction with AWS S3.

#### Usage

```typescript
import { S3Client, ListBucketsCommand } from '@aws-sdk/client-s3';

const s3Client: S3Client = this.s3Service.getClient();

const buckets = await s3Client.send(new ListBucketsCommand({}));

console.log('Buckets:', buckets.Buckets);
// Output: Buckets: [ { Name: 'pdfs', CreationDate: 2022-01-01T00:00:00.000Z } ]
```

------

### **`createBucket(bucketName: string): Promise<void>`**

Creates a new S3 bucket with the specified name.

#### Parameters
- `bucketName`: The name of the bucket to be created.

#### Usage

```typescript
await this.s3Service.createBucket('my-new-bucket');
```

#### Description
This method creates a new bucket in AWS S3. If the bucket creation fails, it throws an error.

------

### **`uploadObject(bucketName: string, key: string, body: string | Uint8Array | Buffer | ReadableStream<any> | Blob): Promise<void>`**

Uploads an object to the specified S3 bucket.

#### Parameters
- `bucketName`: The name of the bucket where the object will be uploaded.
- `key`: The key under which the object is stored.
- `body`: The content of the object.

#### Usage

```typescript
await this.s3Service.uploadObject('my-new-bucket', 'my-object-key', 'Hello, world!');
```

#### Description
This method uploads an object to a specified bucket in AWS S3. If the upload fails, it throws an error.

------

### **`getObject(bucketName: string, key: string): Promise<string | undefined>`**

Retrieves an object from the specified S3 bucket.

#### Parameters
- `bucketName`: The name of the bucket where the object is stored.
- `key`: The key under which the object is stored.

#### Usage

```typescript
const content = await this.s3Service.getObject('my-new-bucket', 'my-object-key');
console.log('Object content:', content);
```

#### Description
This method retrieves an object from a specified bucket in AWS S3. It returns the object content as a string, or `undefined` if the object does not exist. If the retrieval fails, it throws an error.

------

### **`deleteOneObject(bucketName: string, key: string): Promise<void>`**

Deletes an object from the specified S3 bucket.

#### Parameters
- `bucketName`: The name of the bucket where the object is stored.
- `key`: The key under which the object is stored.

#### Usage

```typescript
await this.s3Service.deleteOneObject('my-new-bucket', 'my-object-key');
```

#### Description
This method deletes a single object from a specified bucket in AWS S3. If the deletion fails, it throws an error.

------

### **`deleteAllObjects(bucketName: string): Promise<void>`**

Deletes all objects from the specified S3 bucket.

#### Parameters
- `bucketName`: The name of the bucket where the objects are stored.

#### Usage

```typescript
await this.s3Service.deleteAllObjects('my-new-bucket');
```

#### Description
This method deletes all objects from a specified bucket in AWS S3. It uses pagination to ensure all objects are deleted. If the deletion of any object fails, it throws an error.

------

### **`deleteBucket(bucketName: string): Promise<void>`**

Deletes the specified S3 bucket.

#### Parameters
- `bucketName`: The name of the bucket to be deleted.

#### Usage

```typescript
await this.s3Service.deleteBucket('my-new-bucket');
```

#### Description
This method deletes a bucket in AWS S3. If the bucket deletion fails, it throws an error.

------

### **`createPresignedUrlWithClient(params: { bucket: string; key: string; expiresIn?: number }): Promise<string>`**

Generates a presigned URL for accessing an object in the specified S3 bucket.

#### Parameters
- `params`: An object containing:
  - `bucket`: The name of the bucket where the object is stored.
  - `key`: The key under which the object is stored.
  - `expiresIn`: (Optional) The expiration time of the URL in seconds. Defaults to 3600 seconds (1 hour).

#### Usage

```typescript
await this.s3Service.createPresignedUrlWithClient({ bucket: 'my-new-bucket', key: 'my-object-key' });
// Output: https://my-new-bucket.s3.amazonaws.com/my-object-key?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=...
```

#### Description
This method generates a presigned URL for a specific object in a specified bucket in AWS S3. The URL can be used to access the object securely within the specified expiration time. If the presigned URL creation fails, it throws an error.

------

### **`copyObject(sourceBucket: string, sourceKey: string, destinationBucket: string, destinationKey: string): Promise<void>`**

Copies an object from one bucket to another in AWS S3.

#### Parameters
- `sourceBucket`: The name of the source bucket.
- `sourceKey`: The key of the source object.
- `destinationBucket`: The name of the destination bucket.
- `destinationKey`: The key of the destination object.

#### Usage

```typescript
await this.s3Service.copyObject('source-bucket', 'source-key', 'destination-bucket', 'destination-key');
```

#### Description
This method copies an object from one bucket to another in AWS S3. If the copy operation fails, it throws an error.

------

### **`listBuckets(): Promise<{ owner: { name: string }; buckets: { name: string }[] }>`**

Lists all buckets in AWS S3.

#### Usage

```typescript
const { owner, buckets } = await this.s3Service.listBuckets();
console.log('owner:', owner);
console.log('buckets:', buckets);
```

#### Description
This method lists all buckets in AWS S3. It returns an object containing the owner and an array of buckets. If the listing fails, it throws an error.

---

This documentation page provides a comprehensive overview of the available methods in the `S3Service` class, along with usage examples, parameters, and descriptions for each method.