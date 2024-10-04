import lume from "lume/mod.ts"
import highlight from "lume/plugins/code_highlight.ts"
import jsx from "lume/plugins/jsx.ts"
import mdx from "lume/plugins/mdx.ts"
import multilanguage from "lume/plugins/multilanguage.ts"
import postcss from "lume/plugins/postcss.ts"
import redirects from "lume/plugins/redirects.ts"
import sitemap from "lume/plugins/sitemap.ts"
import tailwindcss from "lume/plugins/tailwindcss.ts"
import typography from "@tailwindcss/typography"

const site = lume({
  dest: "./public",
  src: "./src",
})

site.copy("icon")
site.copy("img")

site.use(highlight({
  theme: {
    name: "atom-one-dark",
    path: "/code_highlight.css",
  },
}))
site.copy("/code_highlight.css")
site.use(jsx())
site.use(mdx())
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
          "open-in-new": "url('/icon/open_in_new_16dp_2563EB.svg')",
          "open-in-new-gray": "url('/icon/open_in_new_16dp_6B7280.svg')",
        },
        typography: (theme: (s: string) => string) => ({
          DEFAULT: {
            css: {
              "code:not(pre > code)": {
                backgroundColor: theme("colors.gray.100"),
                borderRadius: "0.25rem",
                margin: "0.125rem",
                padding: "0.125rem 0.25rem",
              },
            },
          },
        }),
      },
    },
  },
}))
site.use(postcss())

site.use(multilanguage({
  defaultLanguage: "ja",
  languages: ["ja", "en"],
}))
site.use(sitemap({
  query: "externalUrl=undefined",
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
