resource "cloudflare_pages_domain" "pages_domain" {
  account_id = var.cloudflare_account_id
  domain = "akimo.dev"
  project_name = "akimon658"
}

resource "cloudflare_pages_project" "deployment_config" {
  account_id = var.cloudflare_account_id
  name = "akimon658"
  production_branch = "main"

  source {
    type = "github"
    config {
      owner = "akimon658"
      repo_name = "akimo.dev"
      production_branch = "main"
      pr_comments_enabled = true
      deployments_enabled = false
      production_deployment_enabled = false
      preview_branch_excludes = ["main"]
    }
  }
}
