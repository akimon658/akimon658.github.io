export const title = "記事一覧"
export const layout = "layouts/root.tsx"

export default ({ search }: Lume.Data) => {
  const posts = search.pages("layout=layouts/blog.tsx")

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
