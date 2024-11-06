interface ListData extends Lume.Data {
  limit?: number
  query: string
  sort: string
}

export default (
  { comp, lang, search, limit, query, sort, see_more }: ListData,
) => {
  const posts = search.pages(query, sort)
  if (!limit || limit > posts.length) {
    limit = posts.length
  }
  const omitted = posts.length > limit
  const pathPrefix = lang && lang !== "ja" ? "/" + lang : ""

  return (
    <div className="
      gap-6
      grid
      grid-cols-[repeat(1,max-content)]
      justify-center
      lg:grid-cols-[repeat(3,max-content)]
      md:grid-cols-[repeat(2,max-content)]
      my-8
    ">
      {posts.slice(0, limit).map((post) => (
        <comp.Card
          key={post.url}
          href={post.externalUrl ? post.externalUrl : post.url}
          title={post.title}
          lang={post.lang}
          date={post.date}
          compact
        />
      ))}
      {omitted &&
        (
          <comp.CardContainer
            href={pathPrefix + "/blog/"}
            className={`
              flex
              items-center
              justify-center
            `}
            compact
          >
            <div>{see_more}</div>
          </comp.CardContainer>
        )}
    </div>
  )
}
