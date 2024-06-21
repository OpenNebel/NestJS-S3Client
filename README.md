![COVER IMAGE OF PACKAGE](https://raw.githubusercontent.com/OpenNebel/NestJS-S3Client/master/assets/images/NEST_S3.PNG "Nest JS S3 Module")

<p align="center">
<a href="https://www.npmjs.com/package/@open-nebel/nest-s3" target="_blank"><img src="https://img.shields.io/npm/v/@open-nebel/nest-s3" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/package/@open-nebel/nest-s3" target="_blank"><img src="https://img.shields.io/npm/dm/@open-nebel/nest-s3" alt="NPM Downloads" /></a>
<a href="https://github.com/OpenNebel/Nest-AWS-SDK-V3-S3-CLIENT/blob/master/LICENCE.txt" target="_blank"><img src="https://img.shields.io/github/license/OpenNebel/Nest-AWS-SDK-V3-S3-CLIENT.svg" alt="License" /></a>
</p>

<p align="center">
<a href="https://buymeacoffee.com/nebelmass" target="_blank"><img src="https://i.imgur.com/CahshSS.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>
</p>

## @open-nebel/nest-s3

📖 **Docs**: [https://nestjs-s3.netlify.app](https://nestjs-s3.netlify.app/introduction)

A NestJS module for interacting with AWS S3. This module simplifies the integration of AWS S3 within a NestJS application by providing injectable services and configuration options.

**Note**: This library is compatible with AWS SDK V3.

> ⚠️ **AWS SDK Version 2.x Upcoming End-of-Support**
>
> We [announced](https://aws.amazon.com/blogs/developer/announcing-end-of-support-for-aws-sdk-for-javascript-v2) the upcoming end-of-support for AWS SDK for JavaScript v2. We recommend that you migrate to [AWS SDK for JavaScript v3](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/welcome.html). For dates, additional details, and information on how to migrate, please refer to the linked announcement.
>
> The AWS SDK for JavaScript v3 is the latest and recommended version, which has been GA since December 2020. Here is [why and how you should use AWS SDK for JavaScript v3](https://aws.amazon.com/blogs/developer/why-and-how-you-should-use-aws-sdk-for-javascript-v3-on-node-js-18/). You can try our experimental migration scripts in [aws-sdk-js-codemod](https://www.npmjs.com/package/aws-sdk-js-codemod) to migrate your application from v2 to v3.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
    - [Configuration](#configuration)
        - [Synchronous Configuration](#synchronous-configuration)
        - [Asynchronous Configuration](#asynchronous-configuration)
    - [Using the S3Service](#using-the-s3service)
        - [Example Usage in a Service](#example-usage-in-a-service)
- [Available Methods](#available-methods)
    - [getClient(): S3Client](#getclients3client)
    - [createBucket(bucketName: string): Promise<void>](#createbucketbucketname-string-promisevoid)
    - [uploadObject(bucketName: string, key: string, body: string): Promise<void>](#uploadobjectbucketname-string-key-string-body-string-promisevoid)
    - [getObject(bucketName: string, key: string): Promise<string | undefined>](#getobjectbucketname-string-key-string-promise-string--undefined)
    - [deleteOneObject(bucketName: string, key: string): Promise<void>](#deleteoneobjectbucketname-string-key-string-promisevoid)
    - [deleteAllObjects(bucketName: string): Promise<void>](#deleteallobjectsbucketname-string-promisevoid)
    - [deleteBucket(bucketName: string): Promise<void>](#deletebucketbucketname-string-promisevoid)
    - [createPresignedUrlWithClient(params: { bucket: string; key: string }): Promise<string>](#createpresignedurlwithclientparams--bucket-string-key-string--promisestring)
    - [copyObject(sourceBucket: string, sourceKey: string, destinationBucket: string, destinationKey: string): Promise<void>](#copyobjectsourcebucket-string-sourcekey-string-destinationbucket-string-destinationkey-string-promisevoid)
    - [listBuckets(): Promise<{ owner: { name: string }; buckets: { name: string }[] }>] (#listbuckets-promise-owner-name-string-buckets-name-string)
- [License](#license)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)
- [Support](#support)

## Installation

To install the package, use the following commands:

```bash
npm install @open-nebel/nest-s3 @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```

or

```bash
yarn add @open-nebel/nest-s3 @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```

## Usage

### Configuration

You can configure the S3 module using either synchronous or asynchronous configuration.

#### Synchronous Configuration

```typescript
import { Module } from '@nestjs/common';
import { S3Module } from '@open-nebel/nest-s3';

@Module({
  imports: [
    S3Module.forRoot({
      region: 'your-region',
      accessKeyId: 'your-access-key-id',
      secretAccessKey: 'your-secret-access-key',
    }),
  ],
})
export class AppModule {}
```

#### Asynchronous Configuration

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { S3Module } from '@open-nebel/nest-s3';

@Module({
  imports: [
    ConfigModule.forRoot(),
    S3Module.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        region: configService.get<string>('AWS_REGION'),
        accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      }),
    }),
  ],
})
export class AppModule {}
```

### Using the S3Service

The `S3Service` provides methods to interact with AWS S3, such as creating buckets, uploading objects, and generating presigned URLs. Additionally, it exposes an instance of `S3Client` configured with the module settings, allowing direct interaction with S3.

#### Example Usage in a Service

```typescript
import { Injectable } from '@nestjs/common';
import { S3Service } from '@open-nebel/nest-s3';
import { S3Client, ListBucketsCommand } from '@aws-sdk/client-s3';

@Injectable()
export class MyService {
  constructor(private readonly s3Service: S3Service) {}

  async useS3ClientOriginal(): Promise<void> {
    const s3Client: S3Client = this.s3Service.getClient();

    const buckets = await s3Client.send(new ListBucketsCommand({}));

    console.log('Buckets:', buckets.Buckets);
  }

  async useS3Methods() {
    const bucketName = 'your-bucket-name';
    const key = 'your-file-key';
    const body = 'your-file-content';

    // Create a bucket
    await this.s3Service.createBucket(bucketName);

    // Upload an object
    await this.s3Service.uploadObject(bucketName, key, body);

    // Get an object
    const objectContent = await this.s3Service.getObject(bucketName, key);
    console.log('Object Content:', objectContent);

    // Generate a presigned URL
    const presignedUrl = await this.s3Service.createPresignedUrlWithClient({ bucket: bucketName, key });
    console.log('Presigned URL:', presignedUrl);

    // Delete an object
    await this.s3Service.deleteOneObject(bucketName, key);

    // Delete all objects in the bucket
    await this.s3Service.deleteAllObjects(bucketName);

    // Delete the bucket
    await this.s3Service.deleteBucket(bucketName);
    
    // Copy an object
    await this.s3Service.copyObject('source-bucket', 'source-key', 'destination-bucket', 'destination-key');

    // List all buckets
    const { owner, buckets } = await this.s3Service.listBuckets();
    console.log('Owner:', owner);
    console.log('Buckets:', buckets);
  }
}
```

## Available Methods

Given below are the available methods provided by the `S3Client` and `S3Service` classes.

### `getClient(): S3Client`

Returns the configured S3Client instance for direct interaction with AWS S3.

```typescript
const s3Client: S3Client = this.s3Service.getClient();
```

### `createBucket(bucketName: string): Promise<void>`

Creates a new S3 bucket with the specified name.

```typescript
await this.s3Service.createBucket('my-new-bucket');
```

### `uploadObject(bucketName: string, key: string, body: string | Uint8Array | Buffer | ReadableStream<any> | Blob): Promise<void>`

Uploads an object to the specified S3 bucket.

```typescript


await this.s3Service.uploadObject('my-new-bucket', 'my-object-key', 'Hello, world!');
```

### `getObject(bucketName: string, key: string): Promise<string | undefined>`

Retrieves an object from the specified S3 bucket.

```typescript
const content = await this.s3Service.getObject('my-new-bucket', 'my-object-key');
console.log('Object content:', content);
```

### `deleteOneObject(bucketName: string, key: string): Promise<void>`

Deletes an object from the specified S3 bucket.

```typescript
await this.s3Service.deleteOneObject('my-new-bucket', 'my-object-key');
```

### `deleteAllObjects(bucketName: string): Promise<void>`

Deletes all objects from the specified S3 bucket.

```typescript
await this.s3Service.deleteAllObjects('my-new-bucket');
```

### `deleteBucket(bucketName: string): Promise<void>`

Deletes the specified S3 bucket.

```typescript
await this.s3Service.deleteBucket('my-new-bucket');
```

### `createPresignedUrlWithClient(params: { bucket: string; key: string }): Promise<string>`

Generates a presigned URL for accessing an object in the specified S3 bucket.

```typescript
const presignedUrl = await this.s3Service.createPresignedUrlWithClient({ bucket: 'my-new-bucket', key: 'my-object-key' });
console.log('Presigned URL:', presignedUrl);
```

### `copyObject(sourceBucket: string, sourceKey: string, destinationBucket: string, destinationKey: string): Promise<void>`

Copies an object from one bucket to another in AWS S3.

```typescript
await this.s3Service.copyObject('source-bucket', 'source-key', 'destination-bucket', 'destination-key');
```

### `listBuckets(): Promise<{ owner: { name: string }; buckets: { name: string }[] }>`

Lists all buckets in AWS S3.

```typescript
const { owner, buckets } = await this.s3Service.listBuckets();
console.log('Owner:', owner);
console.log('Buckets:', buckets);
```

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/OpenNebel/Nest-AWS-SDK-V3-S3-CLIENT/blob/master/LICENCE.txt) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue on GitHub.

## Acknowledgements

This package uses the AWS SDK for JavaScript (v3) and is inspired by the design principles of NestJS.

## Support

If you encounter any issues or have any questions, feel free to open an issue on GitHub or contact the maintainers.

---

By following this README, users should be able to easily install, configure, and use your NestJS AWS S3 library in their projects, with the added ability to directly interact with the AWS S3 client.