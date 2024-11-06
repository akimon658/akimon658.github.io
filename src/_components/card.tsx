interface CardData extends Lume.Data {
  href: string
  title: string
  compact?: boolean
}

export default ({ comp, href, title, lang, date, compact }: CardData) => {
  const isExternal = href.startsWith("http")
  const url = new URL(href, "https://akimo.dev")
  const locale = lang === "ja" ? "ja-JP" : "en-US"

  return (
    <comp.CardContainer
      href={href}
      className={`
        flex
        flex-col
        justify-between
      `}
      compact={compact}
    >
      <div className="line-clamp-3">
        {title}
      </div>
      <div className="
        flex
        justify-between
        text-gray-500
      ">
        {isExternal && (
          <div className="after:content-open-in-new-gray">
            {url.hostname}
          </div>
        )}
        {date && (
          <div className="ml-auto">
            {date.toLocaleDateString(locale, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        )}
      </div>
    </comp.CardContainer>
  )
}
