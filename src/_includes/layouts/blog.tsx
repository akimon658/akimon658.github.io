export const layout = "layouts/root.tsx"

export default (
  { date, title, children }: Lume.Data,
  _helpers: Lume.Helpers,
) => (
  <article className="
    hover:prose-a:underline
    mx-auto
    prose
    prose-a:font-normal
    prose-a:no-underline
    prose-a:text-blue-600
    prose-code:after:content-none
    prose-code:before:content-none
    prose-code:font-normal
    prose-headings:font-normal
    px-4
    visited:prose-a:text-purple-700
  ">
    <h1>{title}</h1>
    <time
      dateTime={`${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`}
      className="text-gray-500"
    >
      {`${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`}
    </time>
    {children}
  </article>
)
