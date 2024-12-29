resource "cloudflare_pages_domain" "pages_domain" {
  account_id = var.cloudflare_account_id
  domain = "akimo.dev"
  project_name = "akimon658"
}

resource "cloudflare_pages_project" "deployment_config" {
  account_id = var.cloudflare_account_id
  name = "akimon658"
  production_branch = "main"
}
