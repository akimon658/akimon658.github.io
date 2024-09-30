export const layout = "layouts/root.tsx"

export default ({ title, children }: Lume.Data, _helpers: Lume.Helpers) => (
  <article className="prose mx-auto">
    <h1>{title}</h1>
    {children}
  </article>
)
