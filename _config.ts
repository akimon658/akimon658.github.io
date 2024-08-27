import lume from "lume/mod.ts"
import jsx from "lume/plugins/jsx_preact.ts"
import redirects from "lume/plugins/redirects.ts"

const site = lume({
  dest: "./public",
  src: "./content",
})

site.use(jsx())
site.use(redirects())

export default site
