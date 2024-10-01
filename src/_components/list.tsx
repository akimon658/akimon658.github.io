interface ListData extends Lume.Data {
  query: string
  sort: string
}

export default ({ comp, search, query, sort }: ListData) => {
  const posts = search.pages(query, sort)

  return (
    <div className="
      gap-6
      grid
      grid-cols-[repeat(3,max-content)]
      justify-center
      my-8
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
