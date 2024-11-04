terraform {
  required_providers {
    cloudflare = {
      source = "cloudflare/cloudflare"
    }	
  }
}

variable "cloudflare_api_token" {
  type = string
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}
