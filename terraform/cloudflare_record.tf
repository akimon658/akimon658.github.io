resource "cloudflare_record" "pages_domain" {
  content = "akimon658.pages.dev"
  name    = "akimo.dev"
  proxied = true
  ttl     = 1
  type    = "CNAME"
  zone_id = "39789e3a9e22c3a798baae245274330e"
}

resource "cloudflare_record" "terraform_managed_resource_2bc5568896dac5340e9121dacae14598" {
  content = "akimo.dev"
  name    = "www"
  proxied = true
  ttl     = 1
  type    = "CNAME"
  zone_id = "39789e3a9e22c3a798baae245274330e"
}

resource "cloudflare_record" "terraform_managed_resource_a639226e6e030c6b56787dffc348b994" {
  content = "google-site-verification=NZm4LJP7C09-hxzsLIPCw7BTOr5Q0xAigmD4FRoBpKg"
  name    = "akimo.dev"
  proxied = false
  ttl     = 3600
  type    = "TXT"
  zone_id = "39789e3a9e22c3a798baae245274330e"
}
