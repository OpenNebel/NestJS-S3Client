---
outline: deep
---

# Introduction

![COVER IMAGE OF PACKAGE](https://raw.githubusercontent.com/OpenNebel/NestJS-S3Client/master/assets/images/NEST_S3.PNG "Nest JS S3 Module")


### Introduction to @open-nebel/nestjs-s3

Welcome to the documentation for `@open-nebel/nest-s3`, a powerful and flexible NestJS module designed to seamlessly integrate AWS S3 into your NestJS applications. This library simplifies the interaction with AWS S3, providing easy-to-use, configurable services to manage your storage needs.

### Why Use @open-nebel/nestjs-s3 ?

Amazon S3 (Simple Storage Service) is one of the most widely used cloud storage solutions, known for its scalability, data availability, security, and performance. Integrating AWS S3 into your NestJS application allows you to leverage these benefits for a variety of use cases, including:

- **File Storage**: Store and retrieve files such as images, videos, and documents.
- **Backup and Archiving**: Securely backup your data and maintain archives.
- **Data Lakes**: Build and manage large-scale data repositories.
- **Static Website Hosting**: Host static websites directly from S3.

However, directly interacting with the AWS SDK can be cumbersome. `@open-nebel/nest-s3` abstracts the complexity, offering a clean and idiomatic way to work with S3 in your NestJS projects.

### Key Features

- **Easy Configuration**: Configure the S3 module with both synchronous and asynchronous options, allowing for dynamic setup based on your environment.
- **Seamless Integration**: Quickly integrate AWS S3 into your NestJS application, enabling efficient management of storage spaces.
- **Comprehensive API**: Access a wide range of functionalities, from creating and managing buckets to uploading, retrieving, and deleting objects.
- **Secure Access**: Generate presigned URLs for secure and temporary access to objects.
- **Direct Client Access**: Leverage the full power of the AWS S3 API through direct access to the configured S3Client instance.
- **Robust Management**: Easily handle large-scale data operations with features like deleting all objects in a bucket and batch processing.

This introduction provides a clear overview of the library, highlighting its purpose, key features, and benefits, as well as guiding users on how to get started with installation and configuration.