import lume from "lume/mod.ts"
import jsx from "lume/plugins/jsx_preact.ts"
import multilanguage from "lume/plugins/multilanguage.ts"
import redirects from "lume/plugins/redirects.ts"

const site = lume({
  dest: "./public",
  src: "./content",
})

site.copy("img")

site.use(jsx())
site.use(redirects())
site.use(multilanguage({
  defaultLanguage: "ja",
  languages: ["ja", "en"],
}))

export default site
