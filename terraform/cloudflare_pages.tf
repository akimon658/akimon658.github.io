resource "cloudflare_pages_project" "deployment_config" {
  account_id = var.cloudflare_account_id
  name = "akimon658"
  production_branch = "main"

  source {
    type = "github"
    config {
      owner = "akimon658"
      repo_name = "akimon658.github.io"
      production_branch = "main"
      pr_comments_enabled = true
      deployments_enabled = true
      production_deployment_enabled = true
      preview_branch_excludes = ["main"]
    }
  }
}
