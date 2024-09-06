export const title = "Article list"
export const layout = "layouts/root.tsx"
export const lang = "en"
export const url = "/blog/"

export default ({ comp }: Lume.Data) => (
  <comp.List query="layout=layouts/blog.tsx lang=en" sort="date=desc" />
)
