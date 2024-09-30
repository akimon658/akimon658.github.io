import lume from "lume/mod.ts"
import jsx from "lume/plugins/jsx.ts"
import multilanguage from "lume/plugins/multilanguage.ts"
import postcss from "lume/plugins/postcss.ts"
import redirects from "lume/plugins/redirects.ts"
import tailwindcss from "lume/plugins/tailwindcss.ts"
import typography from "@tailwindcss/typography"

const site = lume({
  dest: "./public",
  src: "./src",
})

site.copy("icon")
site.copy("img")

site.use(jsx())
site.use(redirects())

site.use(tailwindcss({
  options: {
    plugins: [typography],
    theme: {
      fontFamily: {
        sans: ["Atkinson Hyperlegible", "sans-serif"],
        mono: ["monospace"],
      },
      extend: {
        content: {
          "open-in-new": "url('/icon/open_in_new_16dp_434343.svg')",
        },
      },
    },
  },
}))
site.use(postcss())

site.use(multilanguage({
  defaultLanguage: "ja",
  languages: ["ja", "en"],
}))

interface Token {
  attrGet: (name: string) => string
}

site.hooks.addMarkdownItRule("link_open", (tokens: Token[], idx: number) => {
  const href = tokens[idx].attrGet("href")
  const isExternal = href.startsWith("http")
  const additionalAttributes = isExternal
    ? `target="_blank" rel="noopener noreferrer" class="after:content-open-in-new"`
    : ""
  return `<a href=${href} ${additionalAttributes}>`
})

export default site
