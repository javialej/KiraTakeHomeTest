terraform {
  backend "gcs" {
    bucket  = "kiratakehometest-tfstate"
    prefix  = "terraform/state"
  }
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
  }
}

provider "google" {
  project = var.gcp_project_id
  region  = var.gcp_region
}

module "networking" {
  source       = "./modules/networking"
  project_name = var.project_name
  gcp_region   = var.gcp_region
}

module "gke" {
  source       = "./modules/gke"
  cluster_name = var.cluster_name
  gcp_region   = var.gcp_region
  vpc_name     = module.networking.vpc_name
  subnet_name  = module.networking.subnet_name
}

module "artifact-registry" {
  source         = "./modules/artifact-registry"
  gcp_project_id = var.gcp_project_id
  gcp_region     = var.gcp_region
  project_name   = var.project_name
}

resource "google_compute_global_address" "static_ip" {
  name = "kira-take-home-test-static-ip"
}