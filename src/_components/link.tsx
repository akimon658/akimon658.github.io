interface LinkData extends Lume.Data {
  href: string
}

export default ({ children, href }: LinkData) => {
  const isExternal = href.startsWith("http")
  let classes = "hover:underline text-blue-600 visited:text-purple-700"
  if (isExternal) {
    classes += " after:content-open-in-new"
  }

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={classes}
    >
      {children}
    </a>
  )
}
