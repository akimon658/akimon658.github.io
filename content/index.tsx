export const title = "akimon658.github.io"
export const layout = "layouts/page.tsx"

export default (data: Lume.Data, _helpers: Lume.Helpers) => (
  <>
    <h1>{data.title}</h1>
    <p>工事中</p>
    <a href="/blog/">ブログ</a>
  </>
)
