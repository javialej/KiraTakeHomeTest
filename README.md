

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

## CI/CD Configuration

The CI/CD pipeline is configured to use Google Cloud's Workload Identity Federation for secure authentication from GitHub Actions. This method avoids the need for long-lived service account keys, enhancing security.

### Required Permissions and Secrets

To enable the CI/CD pipeline, you need to configure your GCP project and GitHub repository as follows:

1.  **Workload Identity Federation**: Set up a Workload Identity Pool and Provider in your GCP project to trust GitHub Actions.
2.  **Service Account**: Create a GCP Service Account with the necessary permissions to manage the resources defined in the Terraform files (e.g., Artifact Registry Administrator, Kubernetes Engine Admin, Compute Network Admin).
3.  **GitHub Secrets**: Add the following secrets to your GitHub repository. These are used to configure the application environment and connect to the database.
    *   `GCP_PROJECT_ID`: The unique ID of your Google Cloud project.
    *   `DB_HOST`: The hostname or IP address of the database server.
    *   `DB_PORT`: The port number of the database server.
    *   `DB_USERNAME`: The username for the database connection.
    *   `DB_PASSWORD`: The password for the database connection.
    *   `DB_NAME`: The name of the database.
    *   `SERVICE_NAME`: The name of the service.
    *   `COLLECTION_NAME`: The name of the Firestore collection.

### How to Add Secrets to GitHub

1.  **Navigate to your GitHub Repository:**
    Open your web browser and go to your repository page.

2.  **Go to Settings:**
    Click on the **Settings** tab, located in the main navigation bar of your repository.

3.  **Access Actions Secrets:**
    In the left sidebar, under the "Security" section, click on **Secrets and variables**, and then select **Actions**.

4.  **Add Each Secret:**
    Click the **New repository secret** button for each secret you need to add. Enter the secret's name in the "Name" field and its value in the "Secret" field, then click **Add secret**. Repeat this for all the required secrets listed above.

## CI/CD Pipeline Flow

The CI/CD pipeline is defined in the `.github/workflows/cd.yaml` file and is designed to provide a safe and efficient path to production, with automated testing and deployment for development environments.

### Development Workflow (`feature/*` branches)

This workflow is triggered whenever a developer pushes a commit to a branch prefixed with `feature/`.

1.  **Build & Push Docker Image**: The `build` job is triggered, which builds a new Docker image of the application. The image is tagged with the commit SHA and pushed to Google Container Registry (GCR).
2.  **Deploy to Development**: The `deploy_dev` job starts, creating a unique Terraform workspace for the feature branch (e.g., `feature-new-login`). This provisions a dedicated, isolated environment in GCP.
3.  **Application Deployment**: The application is deployed to the new GKE cluster using the newly built Docker image.

### Production Workflow (`main` branch)

This workflow is triggered when a feature branch is merged into the `main` branch.

1.  **Build & Push Docker Image**: The `build` job is triggered, creating a new production-ready Docker image.
2.  **Manual Approval**: The `deploy_prod` job starts but immediately pauses, waiting for manual approval from a designated reviewer in the GitHub `production` environment.
3.  **Deploy to Production**: Once approved, the job resumes. Terraform selects the `production` workspace and applies the configuration, updating the GKE deployment with the new image.

### Cleanup Workflow (Branch Deletion)

This workflow is triggered when a `feature/*` branch is deleted.

1.  **Destroy Environment**: The `destroy_dev` job is triggered, selecting the Terraform workspace associated with the deleted branch.
2.  **Resource Cleanup**: `terraform destroy` is executed, tearing down all cloud resources for that environment. This helps manage costs and keeps the cloud environment clean.

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
