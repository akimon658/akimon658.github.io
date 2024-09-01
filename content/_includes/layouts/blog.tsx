import styled from "@emotion/styled"

export const layout = "layouts/root.tsx"

const Article = styled.article({
  margin: "0 auto",
  maxWidth: "50rem",
})

export default ({ title, children }: Lume.Data, _helpers: Lume.Helpers) => (
  <Article>
    <h1>{title}</h1>
    {children}
  </Article>
)
