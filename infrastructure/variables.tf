
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
