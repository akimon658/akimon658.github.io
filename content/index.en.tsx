export const title = "akimon658.github.io"
export const layout = "layouts/root.tsx"
export const url = "/en/"

export default (data: Lume.Data, _helpers: Lume.Helpers) => (
  <>
    <h1>{data.title}</h1>
    <p>Under construction</p>
    <ul>
      <li>
        <a href="/blog/">Blog</a>
      </li>
      <li>
        <a href="/privacy-policy/">Privacy Policy</a>
      </li>
    </ul>
  </>
)
