resource "google_artifact_registry_repository" "repository" {
  provider      = google-beta
  project       = var.gcp_project_id
  location      = var.gcp_region
  repository_id = "${var.project_name}-repo"
  description   = "Docker repository for ${var.project_name}"
  format        = "DOCKER"
}
