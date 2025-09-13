
output "cluster_name" {
  description = "The name of the GKE cluster."
  value       = module.gke.cluster_name
}

output "cluster_endpoint" {
  description = "The endpoint of the GKE cluster."
  value       = module.gke.cluster_endpoint
}

output "load_balancer_ip" {
  description = "The external IP address of the load balancer."
  value       = kubernetes_service.app_service.status[0].load_balancer[0].ingress[0].ip
}
