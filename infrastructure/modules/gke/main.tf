
resource "google_container_cluster" "primary" {
  name     = "${var.cluster_name}-cluster"
  location = var.gcp_region

  network    = var.vpc_name
  subnetwork = var.subnet_name

  initial_node_count = 1

  node_config {
    machine_type = "n1-standard-1"
    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform"
    ]
  }
}
