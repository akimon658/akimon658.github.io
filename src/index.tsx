export const title = "akimon658.github.io"
export const layout = "layouts/root.tsx"

export default (data: Lume.Data, _helpers: Lume.Helpers) => (
  <>
    <h1>{data.title}</h1>
    <p>工事中</p>
    <ul>
      <li>
        <a href="/blog/">ブログ</a>
      </li>
      <li>
        <a href="/privacy-policy/">プライバシーポリシー</a>
      </li>
    </ul>
  </>
)
