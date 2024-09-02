interface ListData extends Lume.Data {
  query: string
  sort: string
}

export default ({ comp, search, query, sort }: ListData) => {
  const posts = search.pages(query, sort)

  return (
    <ul>
      {posts.map((post) => (
        <li>
          <comp.Link href={post.externalUrl ? post.externalUrl : post.url}>
            {post.title}
          </comp.Link>
        </li>
      ))}
    </ul>
  )
}
