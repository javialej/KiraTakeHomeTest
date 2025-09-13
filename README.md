

<p align="center">
  A production-ready, cross-border payments API built with NestJS, Hexagonal Architecture, and a secure, automated infrastructure on Google Cloud.
</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <a href="https://github.com/google/gts" target="_blank"><img src="https://img.shields.io/badge/code%20style-google-blueviolet.svg" alt="Code Style: Google" /></a>
  <a href="https://sonarcloud.io/summary/new_code?id=kira-take-home-test" target="_blank"><img src="https://sonarcloud.io/api/project_badges/measure?project=kira-take-home-test&metric=coverage" alt="Coverage" /></a>
</p>

---

## About This Project

This repository contains a robust and extensible cross-border payments API designed for high performance and security. The initial implementation handles USDC to COP (Colombian Peso) transfers, integrating with multiple off-ramp vendors and verifying each transaction via its `txhash`.

The project's primary focus is on **infrastructure, observability, automation, and security**, providing a solid, SOC 2-aligned foundation for a scalable payments service.

-   **Architecture**: [Hexagonal (Ports & Adapters)](./ARCHITECTURE.md) for a clean separation of concerns.
-   **Infrastructure**: Fully automated with Terraform on **Google Cloud Platform (GCP)**.
-   **CI/CD**: Automated build, test, and deployment pipelines using **GitHub Actions**.
-   **Security**: Secure, keyless authentication between CI/CD and GCP using **Workload Identity Federation**.

## Table of Contents

- [Running the Application Locally](#running-the-application-locally)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [CI/CD Pipelines](#cicd-pipelines)
- [Further Documentation](#further-documentation)

---

## Running the Application Locally

You can run the application locally using Docker, which ensures a consistent and isolated environment.

### Prerequisites

-   [Docker](https://www.docker.com/get-started) must be installed and running on your machine.
-   You must have a `.env` file. You can create one by copying the example:
    ```bash
    cp .env.example .env
    ```

### Step 1: Build and Run the Container

This project includes a `docker-compose.yml` file to simplify the local setup.

```bash
docker-compose up --build
```

This command will:
1.  Build the Docker image for the application.
2.  Start the container in the foreground, so you can see the application logs.
3.  Make the API available at `http://localhost:3000`.

### Step 2: Send a Test Request

Once the application is running, you can test the primary endpoint using a tool like `curl`. This example simulates a transfer of 100 USDC.

```bash
curl -X POST \
  http://localhost:3000/api-payments/transfer \
  -H 'Content-Type: application/json' \
  -d '{ "amount": 100, "txhash": "0x123abc..." }'
```

### Expected Response

A successful request will return a `201 Created` status and a response body similar to this:

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

### Step 3: Cleanup

To stop and remove the containers and network created by Docker Compose, simply press `Ctrl+C` in the terminal where the container is running, or run the following command from the project root:

```bash
docker-compose down
```

---

## Testing

The project has a comprehensive suite of unit tests.

-   **Run all tests:**
    ```bash
    npm test
    ```
-   **Run tests with coverage report:**
    ```bash
    npm run test:cov
    ```

### Code Coverage

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

---

## Project Structure

The repository is organized to reflect the Hexagonal Architecture, with a clear separation between the `domain` (core business logic) and `infrastructure` layers.

```
.
├── .github/                # CI/CD workflows and PR templates
├── domain/                 # Core business logic (independent of frameworks)
├── infrastructure/         # Infrastructure as Code (Terraform)
├── src/                    # NestJS application layer (infrastructure and adapters)
│   ├── adapter/
│   │   ├── in/http/        # Inbound adapters (REST API controllers)
│   │   └── out/            # Outbound adapters (database, external APIs)
│   ├── common/             # Shared utilities, filters, and interceptors
│   └── ...
├── Dockerfile
└── README.md
```

---

## CI/CD Pipelines

The project uses two distinct GitHub Actions workflows to separate infrastructure management from application deployment.

### 1. Infrastructure Pipeline (`infrastructure.yml`)

-   **Purpose**: Manages the lifecycle of the core cloud infrastructure (VPC, GKE Cluster, etc.) for a specific environment.
-   **Trigger**: Manual execution (`workflow_dispatch`).
-   **How to Run**:
    1.  Navigate to the **Actions** tab in the GitHub repository.
    2.  Select the **Infrastructure CI/CD** workflow from the list.
    3.  Click the **Run workflow** button.
    4.  Use the dropdown menu to select the target environment (`development` or `production`).
    5.  Click the green **Run workflow** button to start the process.
-   **Details**: This workflow uses Terraform workspaces to create and manage isolated infrastructure for each environment. It should be run once to provision a new environment and only re-run when infrastructure changes are needed.

### 2. Application CI/CD Pipeline (`ci-cd.yml`)

-   **Purpose**: Builds, tests, and deploys the application to an existing GKE cluster.
-   **Triggers**:
    -   Push to `main` or `feature/*` branches.
    -   Pull request to `main`.
-   **Flow**:
    1.  **CI**: Runs linting and unit tests.
    2.  **Build & Push**: Builds a new Docker image and pushes it to Google Artifact Registry.
    3.  **Deploy**: Connects to the GKE cluster and updates the running application to use the new Docker image.
    4.  **Manual Approval**: Deployments to the `production` environment require manual approval from a designated reviewer in GitHub.

### CI/CD Configuration and Secrets

For the pipelines to run, you must configure your GCP project and add the following secrets to your GitHub repository.

#### Required Secrets

-   `GCP_PROJECT_ID`: The unique ID of your Google Cloud project.
-   `DB_HOST`: The hostname or IP address of the database server.
-   `DB_PORT`: The port number of the database server.
-   `DB_USERNAME`: The username for the database connection.
-   `DB_PASSWORD`: The password for the database connection.
-   `DB_NAME`: The name of the database.
-   `SERVICE_NAME`: The name of the service (e.g., `kira-payments`).
-   `COLLECTION_NAME`: The name of the Firestore collection.

#### How to Add Secrets to GitHub

1.  **Navigate to your GitHub Repository:**
    Open your web browser and go to your repository's main page.

2.  **Go to Settings:**
    Click on the **Settings** tab in the main navigation bar.

3.  **Access Actions Secrets:**
    In the left sidebar, navigate to **Secrets and variables** > **Actions**.

4.  **Add Each Secret:**
    Click the **New repository secret** button. Enter the secret's name (e.g., `DB_HOST`) in the "Name" field and paste its value in the "Secret" field. Click **Add secret** and repeat this process for all the required secrets listed above.

---

## Automated Triggers

This project provides methods for external scripts or agents to perform key actions.

### Triggering a Transfer Request

An external agent can initiate a transfer by sending a `POST` request to the `/api-payments/transfer` endpoint.

-   **URL**: `http://<your-service-url>/api-payments/transfer`
-   **Method**: `POST`
-   **Body**:
    -   `amount` (number): The amount to transfer.
    -   `txhash` (string): The transaction hash for verification.
    -   `vendor` (string, optional): The specific vendor to use (e.g., `BlockchainVendorA`). If omitted, the system will route based on the amount.

**Example using `curl`:**

```bash
curl -X POST \
  http://localhost:3000/api-payments/transfer \
  -H 'Content-Type: application/json' \
  -d '{ "amount": 100, "txhash": "0x123abc...", "vendor": "BlockchainVendorA" }'
```

### Deploying a New Vendor Service

To streamline the process of adding a new payment vendor, this project includes a custom NestJS schematic. This generator automatically scaffolds all the necessary files and updates the application module.

**Usage:**

1.  **Run the Schematic**: From the root of the project, run the following `nest generate` (or `nest g`) command, passing the new vendor's name in PascalCase (e.g., `VendorC`).

    ```bash
    nest generate vendor VendorC
    ```

2.  **Implement the Logic**: The generator will create a new directory at `src/adapter/out/blockchainVendors/vendor-c` with boilerplate files. You will need to:
    *   Implement the actual transfer logic in the new controller file.
    *   Add routing logic for the new vendor in `src/adapter/out/blockchainVendors/blockchainVendors.controller.ts`.

3.  **Commit and Push**: Once you have implemented the logic, commit the new files and push them. The CI/CD pipeline will automatically deploy the updated application with the new vendor.

---

## Further Documentation


-   [**Architecture Deep Dive**](./ARCHITECTURE.md): A detailed explanation of the hexagonal architecture, infrastructure design, CI/CD configuration.
-   [**SOC 2 Alignment**](./SOC2.md): A description of how the infrastructure and processes align with SOC 2 principles.
