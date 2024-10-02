interface LinkData extends Lume.Data {
  className?: string
  href: string
  title?: string
}

export default ({ children, className, href, title }: LinkData) => {
  const isExternal = href.startsWith("http")
  if (className == undefined) {
    className = "hover:underline text-blue-600 visited:text-purple-700"
    if (isExternal) {
      className += " after:content-open-in-new"
    }
  }

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={className}
      title={title}
    >
      {children}
    </a>
  )
}
