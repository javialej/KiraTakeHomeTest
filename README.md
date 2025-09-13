

[![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white&style=plastic)](https://nestjs.com/)
[![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white&style=plastic)](https://nodejs.org)
[![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white&style=plastic)](https://www.npmjs.com/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white&style=plastic)](https://www.typescriptlang.org/)
[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)

# Kira Take-Home Test - Platform Engineer

## Description

This repository contains the infrastructure for a cross-border payments API, designed for high performance and extensibility. The initial implementation handles USDC to COP (Colombian Peso) transfers, integrating with multiple off-ramp vendors and verifying each transaction via its `txhash`.

The platform's hexagonal architecture ensures that new vendors can be added with minimal effort. The primary focus of this project is the infrastructure, observability, automation, and SOC 2 alignment, providing a solid foundation for a secure and scalable payments service.

## About the Base Project

This repository contains a boilerplate for a NestJS-based microservice designed for a cross-border payments API. It is built following Domain-Driven Design (DDD) principles and a Hexagonal Architecture to ensure a clean separation between the core business logic and external infrastructure concerns.

The primary goals of this architecture are:
- **Isolation of Business Logic:** The core domain is independent of any specific framework or technology.
- **Extensibility:** New features, adapters, or vendors can be added with minimal changes to the core application.
- **Testability:** The separation of concerns makes the application easier to test at different levels (unit, integration, e2e).

### Technology Stack

The project utilizes a modern and robust technology stack:

-   **Application:**
    -   **Framework:** NestJS
    -   **Language:** TypeScript
    -   **Runtime:** Node.js
-   **Infrastructure & Deployment:**
    -   **Cloud Provider:** Google Cloud Platform (GCP)
    -   **Infrastructure as Code (IaC):** Terraform
    -   **Containerization:** Docker
    -   **Container Orchestration:** Google Kubernetes Engine (GKE)
-   **CI/CD:**
    -   **Automation:** GitHub Actions
-   **Testing:**
    -   **Unit & Integration:** Jest

### Repository Structure

The repository is organized to reflect the Hexagonal Architecture, with a clear separation between the `domain` and `infrastructure` layers.

```
.
├── .github/workflows/      # GitHub Actions CI/CD pipeline (cd.yaml)
├── domain/                 # Core business logic, entities, and use cases.
├── infrastructure/         # Infrastructure as Code (Terraform) for GCP resources.
│   ├── modules/
│   │   ├── gke/            # GKE Cluster module
│   │   └── networking/     # VPC and networking module
│   ├── main.tf             # Root Terraform configuration
│   ├── k8s.tf              # Kubernetes deployment and service definitions
│   └── ...
├── src/                    # NestJS application code (the "infrastructure" layer of the hexagon)
│   ├── adapter/
│   │   ├── in/             # Inbound adapters (e.g., REST controllers)
│   │   └── out/            # Outbound adapters (e.g., database clients, vendor APIs)
│   └── ...
├── Dockerfile              # Defines the application's container image.
└── README.md
```

## Hexagonal Architecture Assessment

This project demonstrates a mature and well-executed implementation of Hexagonal Architecture. The clear separation between the `domain` and `infrastructure` (`src`) layers provides a strong foundation for building a scalable and maintainable microservice.

<p align="center">
  <img src="./README-hexarch-diagram.svg">
</p>
<p align="center">
  <img src="./README-hexagonal-architecture-data-flow.jpeg" alt="Hexagonal Architecture Data Flow">
</p>

### Key Strengths:

*   **Excellent Separation of Concerns:** The project strictly adheres to the principles of hexagonal architecture, ensuring that the core business logic in the `domain` is completely decoupled from external technologies and frameworks. This makes the application highly adaptable and easy to test.
*   **Well-Organized Adapters:** The `src/adapter` directory is a textbook example of how to structure inbound and outbound adapters. The `in` and `out` subdirectories, further organized by protocol (`http`) and external service (`dynamodb`, `postgres`, `slack`), make the code easy to navigate and understand.
*   **Scalable Vendor Integration:** The pattern established for integrating with external vendors (e.g., the `acme` example) is robust and scalable. It provides a clear blueprint for adding new integrations while maintaining a consistent and organized codebase.

### Extensibility for New Vendors

One of the most significant advantages of this architecture is its extensibility. Adding a new vendor to the platform is a straightforward process that requires minimal effort, thanks to the clear separation of concerns.

To add a new vendor, a developer simply needs to follow these steps:

1.  **Create a New Vendor Directory:** Inside `src/adapter/out/vendors`, create a new directory for the new vendor (e.g., `src/adapter/out/vendors/new-vendor`).

2.  **Implement the Vendor Adapter:** Create a new adapter class (e.g., `new-vendor.adapter.ts`) that contains the logic for making the external API call. This adapter will be responsible for handling the specifics of the vendor's API, such as the endpoint URL, authentication, and request/response formats.

3.  **Define DTOs:** Create Data Transfer Objects (DTOs) to define the request and response data structures for the new vendor. This ensures type safety and a clear contract for the data being exchanged.

4.  **Create a Module:** Create a new NestJS module (e.g., `new-vendor.module.ts`) to encapsulate the vendor's adapter and its dependencies. This module will then be imported into the main `app.module.ts` to make the adapter available for dependency injection.

By following this pattern, which is exemplified by the `acme` adapter, new vendors can be added to the platform without modifying any of the core business logic. This makes the system highly modular, scalable, and easy to maintain.

## DevOps and CI/CD Assessment

Beyond the application architecture, the project excels in its approach to DevOps and Continuous Integration/Continuous Deployment (CI/CD).

### Key Strengths:

*   **Infrastructure as Code (IaC):** The `infrastructure` directory contains well-organized and modular Terraform code. By defining the entire cloud environment (VPC, GKE cluster, etc.) as code, the project ensures that infrastructure is repeatable, version-controlled, and easy to manage.
*   **Robust CI/CD Pipeline:** The GitHub Actions workflow (`cd.yaml`) is well-structured and follows best practices for modern software delivery. Key features include:
    *   **Branch-Based Deployments:** Automatically deploys to a `development` environment from `feature/*` branches and to `production` from the `main` branch.
    *   **Ephemeral Environments:** Creates unique, isolated environments for each feature branch, which are automatically destroyed when the branch is deleted. This is a powerful and cost-effective way to manage development infrastructure.
    *   **Production Safeguards:** Requires manual approval before deploying to the `production` environment, providing a critical safety net.

This comprehensive CI/CD setup provides a safe, efficient, and professional process for testing, deploying, and managing the application.

## SOC 2 Alignment

SOC 2 is a compliance framework that specifies how organizations should manage customer data. It is based on five Trust Services Criteria: **Security, Availability, Processing Integrity, Confidentiality, and Privacy**. This project has been designed with a strong focus on the **Security** and **Availability** criteria, which are foundational for building a trustworthy financial service.

### Security

The Security principle refers to the protection of system resources against unauthorized access.

*   **Infrastructure as Code (IaC):** All infrastructure is defined in Terraform and stored in version control. This enables peer reviews for all infrastructure changes, creates a detailed audit trail, and reduces the risk of manual configuration errors that could lead to security vulnerabilities.
*   **Network Security:** The application is deployed within a dedicated Virtual Private Cloud (VPC) with specific firewall rules. This isolates the application and restricts network traffic to only what is necessary, protecting against unauthorized access and network-based attacks.
*   **Change Management & Access Control:** The CI/CD pipeline enforces a strict change management process. All code and infrastructure changes are reviewed via pull requests. Production deployments require manual approval from designated reviewers, creating a clear audit trail and preventing unauthorized changes. The pipeline uses a GCP service account with the least-privilege principle to limit its permissions.

### Availability

The Availability principle refers to the accessibility of the system as stipulated by a contract or service level agreement (SLA).

*   **High Availability:** The use of Google Kubernetes Engine (GKE) ensures that the application is highly available. GKE automatically manages the health of the application by restarting failed containers and distributing traffic across multiple replicas, which minimizes downtime.
*   **Reliable Deployments:** The automated CI/CD pipeline ensures that deployments are consistent and repeatable, which significantly reduces the risk of human error that could cause an outage.
*   **Disaster Recovery:** Because the entire infrastructure is defined as code, it can be quickly and reliably redeployed in the event of a regional outage or other disaster. This dramatically improves the Recovery Time Objective (RTO) and ensures that the service can be restored quickly.

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

-   `npm test`: Runs all unit and integration tests using Jest.
-   `npm test:watch`: Runs tests in watch mode, re-running them whenever a file is changed.
-   `npm test:cov`: Runs tests and generates a code coverage report.
-   `npm test:debug`: Runs tests in debug mode, allowing you to attach a debugger.

## Local Testing

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

    You can use a tool like `curl` to send a `POST` request to the `/transfer` endpoint. Note that you will need to provide a valid JWT in the `Authorization` header.

    ```bash
    curl -X POST \
      http://localhost:3000/api-domain/transfer \
      -H 'Content-Type: application/json' \
      -H 'Authorization: Bearer <your-jwt-here>' \
      -d '{ "amount": 100, "vendor": "vendorA", "txhash": "0x123..." }'
    ```

3.  **Expected Response:**

    If the request is successful, you should receive a `201 Created` response with the transfer data in the response body:

    ```json
    {
      "statusCode": 201,
      "message": "Transfer request received.",
      "data": {
        "amount": 100,
        "vendor": "vendorA",
        "txhash": "0x123..."
      }
    }
    ```

### Cleanup

To stop and remove the containers, run the following command:

```bash
docker-compose down
```

## Support

Whole software is owned and licensed only.

It can grow thanks to the development team and support.
