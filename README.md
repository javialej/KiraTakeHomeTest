

[![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white&style=plastic)](https://nestjs.com/)
[![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white&style=plastic)](https://nodejs.org)
[![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white&style=plastic)](https://www.npmjs.com/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white&style=plastic)](https://www.typescriptlang.org/)
[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=kira-take-home-test&metric=coverage)](https://sonarcloud.io/summary/new_code?id=kira-take-home-test)

# Payments API Module - Kira Take-Home Test: Platform Engineer

## Description

This repository contains the infrastructure for a cross-border payments API, designed for high performance and extensibility. The initial implementation handles USDC to COP (Colombian Peso) transfers, integrating with multiple off-ramp vendors and verifying each transaction via its `txhash`.

The platform's hexagonal architecture ensures that new vendors can be added with minimal effort. The primary focus of this project is the infrastructure, observability, automation, and SOC 2 alignment, providing a solid foundation for a secure and scalable payments service.

## Table of Contents

- [Payments API Module - Kira Take-Home Test: Platform Engineer](#payments-api-module---kira-take-home-test-platform-engineer)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Documentation](#documentation)
  - [Hexagonal Architecture](#hexagonal-architecture)
  - [Code Coverage](#code-coverage)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
  - [Testing](#testing)
  - [Local Testing with Docker](#local-testing-with-docker)
    - [Prerequisites](#prerequisites)
    - [Running the Application Locally](#running-the-application-locally)
    - [Cleanup](#cleanup)
  - [Support](#support)

## Documentation

-   [**Architecture**](./ARCHITECTURE.md): An in-depth explanation of the hexagonal architecture, infrastructure design, vendor extensibility, and transaction verification flow.
-   [**SOC 2 Alignment**](./SOC2.md): A description of how the infrastructure and processes align with SOC 2 principles.

## Hexagonal Architecture

This project is built using a hexagonal architecture (also known as ports and adapters). This architectural style isolates the application's core logic from external concerns, such as databases, APIs, and frameworks. This separation of concerns makes the application easier to test, maintain, and evolve.

For a more detailed explanation of the hexagonal architecture and how it is implemented in this project, please see the [**Architecture**](./ARCHITECTURE.md) document.

## Code Coverage

| File                                                          | % Stmts | % Branch | % Funcs | % Lines |
| ------------------------------------------------------------- | ------- | -------- | ------- | ------- |
| **All files**                                                 | **98.98** | **76.08** | **100** | **98.83** |
| domain/src/common                                             | 100     | 100      | 100     | 100     |
| domain/src/model                                              | 100     | 100      | 100     | 100     |
| domain/src/usecase                                            | 100     | 100      | 100     | 100     |
| src/adapter/in/http                                           | 100     | 77.27    | 100     | 100     |
| src/adapter/in/http/dto                                       | 100     | 100      | 100     | 100     |
| src/adapter/out/blockchainVendors                             | 100     | 80       | 100     | 100     |
| src/adapter/out/blockchainVendors/blockchainVendorA           | 100     | 75       | 100     | 100     |
| src/adapter/out/blockchainVendors/blockchainVendorA/dto       | 100     | 100      | 100     | 100     |
| src/adapter/out/blockchainVendors/blockchainVendorB           | 100     | 75       | 100     | 100     |
| src/adapter/out/blockchainVendors/blockchainVendorB/dto       | 100     | 100      | 100     | 100     |
| src/adapter/out/firestore                                     | 92.85   | 66.66    | 100     | 91.66   |
| src/adapter/out/postgres                                      | 94.11   | 60       | 100     | 93.1    |
| src/common/logger                                             | 100     | 60       | 100     | 100     |
| src/common/metrics                                            | 100     | 100      | 100     | 100     |
| src/common/response-states                                    | 100     | 100      | 100     | 100     |
| src/common/utils                                              | 100     | 100      | 100     | 100     |
| src/handler                                                   | 100     | 78.57    | 100     | 100     |
| src/model/dto                                                 | 100     | 100      | 100     | 100     |
| src/model/enum                                                | 100     | 100      | 100     | 100     |
| src/model/exceptions                                          | 100     | 100      | 100     | 100     |
| src/model/mapper                                              | 100     | 100      | 100     | 100     |

## Installation

1.  **Node.js Version:** This project uses a specific version of Node.js. It is recommended to use a version manager like `nvm` to ensure compatibility. Run `nvm use` to automatically switch to the correct version specified in the `.nvmrc` file.

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:** Create a `.env` file by copying the `.env.example` file. This file is required to store sensitive information and environment-specific configurations.

## Running the App

-   `npm run build`: Compiles the TypeScript application into JavaScript.
-   `npm run start`: Starts the compiled application. This is typically used for production.
-   `npm run start:dev`: Starts the application in development mode with live-reloading.
-   `npm run start:debug`: Starts the application in debug mode with the Node.js inspector attached.
-   `npm run start:prod`: Starts the application in production mode.
-   `npm run lint`: Lints the codebase to check for style and syntax errors.
-   `npm run lint:fix`: Lints the codebase and automatically fixes any fixable issues.

## Testing

-   `npm test`: Runs all unit tests.
-   `npm run test:cov`: Runs all unit tests and generates a code coverage report.
-   `npm run test:watch`: Runs tests in watch mode, re-running them whenever a file is changed.

## Local Testing with Docker

This project includes a Docker Compose setup that allows you to run and test the application locally without needing to install any dependencies other than Docker.

### Prerequisites

-   [Docker](https://www.docker.com/get-started) must be installed and running on your machine.

### Running the Application Locally

1.  **Start the application:**

    ```bash
    docker-compose up --build
    ```

    This command will build the Docker image for the application and start the container. The API will be available at `http://localhost:3000`.

2.  **Send a test request:**

    You can use a tool like `curl` to send a `POST` request to the `/transfer` endpoint.

    ```bash
    curl -X POST \
      http://localhost:3000/api-payments/transfer \
      -H 'Content-Type: application/json' \
      -d '{ "amount": 100, "txhash": "0x123..." }'
    ```

3.  **Expected Response:**

    If the request is successful, you should receive a `201 Created` response with the transfer data in the response body:

    ```json
    {
        "meta": {
            "trace_id": "a2c1a7b7-918a-423e-8483-3f2839f48133"
        },
        "code": "OK",
        "message": "Transfer created successfully",
        "data": {
            "status": "CONFIRMED",
            "transactionId": "0xabc-vendor-a",
            "provider": "BlockchainVendorA",
            "rawData": {
                "transactionStatus": "CONFIRMED",
                "destinationTransactionHash": "0xabc-vendor-a"
            }
        }
    }
    ```

### Cleanup

To stop and remove the containers, run the following command:

```bash
docker-compose down
```

## Support

For questions or support, please open an issue in the GitHub repository.
