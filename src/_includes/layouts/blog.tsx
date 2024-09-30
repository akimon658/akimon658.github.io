export const layout = "layouts/root.tsx"

export default ({ title, children }: Lume.Data, _helpers: Lume.Helpers) => (
  <article className="
    mx-auto
    prose
    prose-code:after:content-none
    prose-code:before:content-none
    prose-code:font-normal
    prose-headings:font-normal
    px-4
  ">
    <h1>{title}</h1>
    {children}
  </article>
)
