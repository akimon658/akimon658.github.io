export const title = "記事一覧"
export const layout = "layouts/root.tsx"

export default ({ comp }: Lume.Data) => (
  <>
    <h1 className="
      mt-8
      text-2xl
      text-center
    ">
      {title}
    </h1>
    <comp.List
      query="
        category=blog
        lang=ja
        layout=layouts/blog.tsx
      " // Specify the layout to exclude this page from the list
      sort="date=desc"
    />
  </>
)
