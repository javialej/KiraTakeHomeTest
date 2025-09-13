
output "vpc_name" {
  description = "The name of the VPC network."
  value       = google_compute_network.vpc.name
}

output "subnet_name" {
  description = "The name of the primary subnetwork."
  value       = google_compute_subnetwork.primary.name
}

output "vpc_self_link" {
  description = "The self_link of the VPC network."
  value       = google_compute_network.vpc.self_link
}

output "subnet_self_link" {
  description = "The self_link of the primary subnetwork."
  value       = google_compute_subnetwork.primary.self_link
}
