# SOC 2 Alignment

SOC 2 is a compliance framework that specifies how organizations should manage customer data. It is based on five Trust Services Criteria: **Security, Availability, Processing Integrity, Confidentiality, and Privacy**. This project has been designed with a strong focus on the **Security** and **Availability** criteria, which are foundational for building a trustworthy financial service.

## Security

The Security principle refers to the protection of system resources against unauthorized access.

*   **Infrastructure as Code (IaC):** All infrastructure is defined in Terraform and stored in version control. This enables peer reviews for all infrastructure changes, creates a detailed audit trail, and reduces the risk of manual configuration errors that could lead to security vulnerabilities.
*   **IAM (Identity and Access Management):** Access to the cloud environment is controlled through IAM roles. The CI/CD pipeline leverages **Workload Identity Federation** to provide secure, keyless authentication from GitHub Actions to GCP. This eliminates the need for long-lived service account keys, reducing the risk of credential leakage. A dedicated service account is impersonated with permissions restricted by the principle of least privilege, ensuring the pipeline can only access the resources it absolutely needs.
*   **Network Security:** The application is deployed within a dedicated Virtual Private Cloud (VPC) with specific firewall rules. This isolates the application and restricts network traffic to only what is necessary, protecting against unauthorized access and network-based attacks.
*   **Encryption:**
    *   **In Transit:** All data transmitted between the client and the API, as well as between the API and external vendors, is encrypted using TLS/SSL.
    *   **At Rest:** All data stored in cloud services, such as databases and storage buckets, is encrypted at rest by default by the cloud provider.
*   **Change Management & Access Control:** The CI/CD pipeline enforces a strict change management process. All code and infrastructure changes are reviewed via pull requests. Production deployments require manual approval from designated reviewers, creating a clear audit trail and preventing unauthorized changes.

## Availability

The Availability principle refers to the accessibility of the system as stipulated by a contract or service level agreement (SLA).

*   **High Availability:** The use of Google Kubernetes Engine (GKE) ensures that the application is highly available. GKE automatically manages the health of the application by restarting failed containers and distributing traffic across multiple replicas, which minimizes downtime.
*   **Reliable Deployments:** The automated application pipeline uses `kubectl` to perform rolling updates to the GKE cluster. This is a standard, reliable method that ensures deployments are consistent and minimize downtime. This separation from infrastructure management reduces the complexity of each deployment, lowering the risk of human error that could cause an outage.
*   **Disaster Recovery:** Because the entire infrastructure is defined as code, it can be quickly and reliably redeployed in the event of a regional outage or other disaster. This dramatically improves the Recovery Time Objective (RTO) and ensures that the service can be restored quickly.

## Audit Logging

*   **Cloud Provider Logs:** GCP provides detailed audit logs for all API calls and system events. This allows for the tracking of all changes to the infrastructure and the detection of any unauthorized activity.
*   **Application Logging:** The application uses a structured logging service to record important events, such as API requests, errors, and business transactions. These logs can be forwarded to a centralized logging solution (e.g., Google Cloud Logging) for analysis and monitoring.

## Incident Response

*   **Monitoring and Alerting:** The application and infrastructure are monitored using cloud-native tools (e.g., Google Cloud Monitoring). Alerts are configured to automatically notify the on-call team in the event of a security incident, performance degradation, or outage.
*   **Incident Response Plan:** A formal incident response plan would be in place to ensure that all incidents are handled in a consistent and timely manner. This would include steps for identifying, containing, eradicating, and recovering from incidents, as well as a post-mortem process for continuous improvement.
timely manner. This would include steps for identifying, containing, eradicating, and recovering from incidents, as well as a post-mortem process for continuous improvement.
