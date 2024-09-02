export const title = "記事一覧"
export const layout = "layouts/root.tsx"

export default ({ comp }: Lume.Data) => (
  <comp.List query="layout=layouts/blog.tsx lang=ja" sort="date=desc" />
)
