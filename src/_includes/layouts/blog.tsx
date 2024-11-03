export const layout = "layouts/root.tsx"

export default (data: Lume.Data, _helpers: Lume.Helpers) => {
  const date = data.date
  const locale = data.lang === "ja" ? "ja-JP" : "en-US"

  return (
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
      prose-pre:bg-vsc-back
      prose-pre:text-vsc-front
      prose-headings:font-normal
      px-4
      visited:prose-a:text-purple-700
    ">
      <h1>{data.title}</h1>
      <time
        dateTime={`${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()}`}
        className="text-gray-500"
      >
        {date.toLocaleDateString(locale, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>
      {data.children}
    </article>
  )
}
