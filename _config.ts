import lume from "lume/mod.ts"
import jsx from "lume/plugins/jsx.ts"
import multilanguage from "lume/plugins/multilanguage.ts"
import redirects from "lume/plugins/redirects.ts"

const site = lume({
  dest: "./public",
  src: "./src",
})

site.copy("icon")
site.copy("img")

site.use(jsx())
site.use(redirects())
site.use(multilanguage({
  defaultLanguage: "ja",
  languages: ["ja", "en"],
}))

export default site
