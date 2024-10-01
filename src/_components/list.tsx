interface ListData extends Lume.Data {
  query: string
  sort: string
}

export default ({ comp, search, query, sort }: ListData) => {
  const posts = search.pages(query, sort)

  return (
    <div className="
      gap-12
      grid
      grid-cols-[repeat(3,max-content)]
      justify-center
    ">
      {posts.map((post) => (
        <comp.Card
          href={post.externalUrl ? post.externalUrl : post.url}
          title={post.title}
        />
      ))}
    </div>
  )
}
