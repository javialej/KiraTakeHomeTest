
variable "cluster_name" {
  description = "The name for the GKE cluster."
  type        = string
}

variable "gcp_region" {
  description = "The GCP region to deploy to."
  type        = string
}

variable "vpc_name" {
  description = "The name of the VPC network."
  type        = string
}

variable "subnet_name" {
  description = "The name of the primary subnetwork."
  type        = string
}
