interface CardData extends Lume.Data {
  href: string
  title: string
}

export default ({ comp, href, title }: CardData) => {
  const isExternal = href.startsWith("http")
  const url = new URL(href, "https://akimo.dev")

  return (
    <comp.Link
      href={href}
      className="
        bg-gray-50
        border-2
        border-gray-100
        flex
        flex-col
        h-36
        hover:bg-gray-100
        justify-between
        p-4
        rounded-lg
        w-80
      "
    >
      <div>
        {title}
      </div>
      {isExternal && (
        <div className="
          after:content-open-in-new-gray
          justify-self-end
          text-gray-500
          text-right
        ">
          {url.hostname}
        </div>
      )}
    </comp.Link>
  )
}
