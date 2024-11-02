import lume from "lume/mod.ts"
import highlight from "lume/plugins/code_highlight.ts"
import jsx from "lume/plugins/jsx.ts"
import mdx from "lume/plugins/mdx.ts"
import metas from "lume/plugins/metas.ts"
import multilanguage from "lume/plugins/multilanguage.ts"
import postcss from "lume/plugins/postcss.ts"
import redirects from "lume/plugins/redirects.ts"
import robots from "lume/plugins/robots.ts"
import sitemap from "lume/plugins/sitemap.ts"
import tailwindcss from "lume/plugins/tailwindcss.ts"
import transformImages from "lume/plugins/transform_images.ts"
import mila from "markdown-it-link-attributes"
import rehypeExternalLinks from "rehype-external-links"
import typography from "@tailwindcss/typography"

const site = lume({
  dest: "./public",
  src: "./src",
  location: new URL("https://akimo.dev"),
}, {
  markdown: {
    plugins: [
      [
        mila,
        {
          matcher: (href: string) => href.startsWith("http"),
          attrs: {
            class: "after:content-open-in-new",
            rel: "noopener noreferrer",
            target: "_blank",
          },
        },
      ],
    ],
  },
})

site.copy("icon")

site.use(highlight({
  theme: {
    name: "atom-one-dark",
    path: "/code_highlight.css",
  },
}))
site.copy("/code_highlight.css")
site.use(jsx())
site.use(mdx({
  rehypePlugins: [
    [
      rehypeExternalLinks,
      {
        properties: {
          class: "after:content-open-in-new",
        },
        rel: ["noopener", "noreferrer"],
        target: "_blank",
      },
    ],
  ],
}))
site.use(metas())
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
site.use(robots({
  rules: [
    {
      userAgent: "*",
      disallow: "/external/",
    },
  ],
}))
site.use(transformImages({
  extensions: [".jpg", ".jpeg", ".png", ".webp", ".gif"],
}))

site.use(multilanguage({
  defaultLanguage: "ja",
  languages: ["ja", "en"],
}))
site.use(sitemap({
  query: "externalUrl=undefined",
}))

export default site
