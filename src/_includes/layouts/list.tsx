export const layout = "layouts/root.tsx"

export default (data: Lume.Data) => (
  <>
    <h1 className="
      mt-8
      text-2xl
      text-center
    ">
      {data.article_list}
    </h1>
    <data.comp.List
      query={`
        category=blog
        lang=${data.lang}
        layout=layouts/blog.tsx
      `} // Specify the layout to exclude this page from the list
      sort="date=desc"
    />
  </>
)
