terraform {
  backend "s3" {
    bucket = "terraform-state"
    key = "terraform.tfstate"
    region = "auto"
    skip_credentials_validation = true
    skip_metadata_api_check = true
    skip_region_validation = true
    skip_requesting_account_id = true
    skip_s3_checksum = true
    use_path_style = true
    endpoints = {
      s3 = "https://831106c4d239c1e8968fbfb28a1c9c05.r2.cloudflarestorage.com"
    }
  }
  required_providers {
    cloudflare = {
      source = "cloudflare/cloudflare"
    }	
  }
}

variable "cloudflare_account_id" {
  type = string
  default = "831106c4d239c1e8968fbfb28a1c9c05"
}

variable "cloudflare_api_token" {
  type = string
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}
