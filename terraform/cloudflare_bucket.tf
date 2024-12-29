resource "cloudflare_r2_bucket" "terraform_state" {
  account_id = var.cloudflare_account_id
  name = "terraform-state"
}
