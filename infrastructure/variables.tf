variable "gcp_project_id" {
  description = "The GCP project ID to deploy to."
  type        = string
}

variable "gcp_region" {
  description = "The GCP region to deploy to."
  type        = string
  default     = "us-central1"
}

variable "project_name" {
  description = "The name of the project."
  type        = string
  default     = "kira-take-home-test"
}

variable "cluster_name" {
  description = "The name for the GKE cluster."
  type        = string
  default     = "kira-take-home-test"
}

variable "image_tag" {
  description = "The tag for the Docker image."
  type        = string
  default     = "latest"
}

variable "db_host" {
  description = "The database host."
  type        = string
}

variable "db_port" {
  description = "The database port."
  type        = string
}

variable "db_username" {
  description = "The database username."
  type        = string
}

variable "db_password" {
  description = "The database password."
  type        = string
  sensitive   = true
}

variable "db_name" {
  description = "The database name."
  type        = string
}

variable "service_name" {
  description = "The service name."
  type        = string
}

variable "collection_name" {
  description = "The collection name."
  type        = string
}