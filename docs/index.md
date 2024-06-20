---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "NestJS Library"
  text: "For AWS S3 Integration"
  tagline: A NestJS module for interacting with AWS S3. This module simplifies the integration of AWS S3 within a NestJS application by providing injectable services and configuration options.
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started
    - theme: alt
      text: Features
      link: /features/available-methods

features:
  - icon: 🛠️
    title: S3 Module Configuration
    details: Easily configure the S3 module with synchronous and asynchronous options for seamless integration with AWS S3 in a NestJS application.
  - icon: 🔗
    title: Direct Access to S3 Client
    details: Access the configured S3Client instance directly for full interaction with the AWS S3 API. Leverage the power and flexibility of native S3 methods.
  - icon: ⚙️
    title: Asynchronous Configuration
    details: Configure the S3 module asynchronously, integrating configuration services like NestJS's ConfigService for dynamic, environment-based setup.
---


