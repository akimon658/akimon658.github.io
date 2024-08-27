export const title = "Article list"
export const layout = "layouts/root.tsx"
export const lang = "en"
export const url = "/blog/"

export default ({ search }: Lume.Data) => {
  const posts = search.pages("layout=layouts/blog.tsx lang=en")

  return (
    <>
      <ul>
        {posts.map((post) => (
          <li>
            <a href={post.url}>{post.title}</a>
          </li>
        ))}
      </ul>
    </>
  )
}
