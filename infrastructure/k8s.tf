provider "kubernetes" {
  host                   = "https://${module.gke.cluster_endpoint}"
  token                  = data.google_client_config.default.access_token
  cluster_ca_certificate = base64decode(module.gke.cluster_ca_certificate)
}

data "google_client_config" "default" {}

resource "kubernetes_secret" "app_secrets" {
  metadata {
    name = "app-secrets"
  }

  data = {
    DB_HOST         = var.db_host
    DB_PORT         = var.db_port
    DB_USERNAME     = var.db_username
    DB_PASSWORD     = var.db_password
    DB_NAME         = var.db_name
    SERVICE_NAME    = var.service_name
    COLLECTION_NAME = var.collection_name
  }
}

resource "kubernetes_deployment" "app" {
  metadata {
    name = "${var.project_name}-deployment"
  }

  spec {
    replicas = 2

    selector {
      match_labels = {
        app = var.project_name
      }
    }

    template {
      metadata {
        labels = {
          app = var.project_name
        }
      }

      spec {
        container {
          image = "gcr.io/${var.gcp_project_id}/${var.project_name}:${var.image_tag}"
          name  = var.project_name

          port {
            container_port = 3000
          }

          env_from {
            secret_ref {
              name = kubernetes_secret.app_secrets.metadata.0.name
            }
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "app_service" {
  metadata {
    name = "${var.project_name}-service"
  }

  spec {
    selector = {
      app = kubernetes_deployment.app.spec.0.template.0.metadata.0.labels.app
    }

    port {
      port        = 80
      target_port = 3000
    }

    type = "LoadBalancer"
  }
}