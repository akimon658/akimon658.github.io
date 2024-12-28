resource "cloudflare_r2_bucket" "terraform_state" {
  account_id = "831106c4d239c1e8968fbfb28a1c9c05"
  name = "terraform-state"
}
