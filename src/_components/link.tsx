interface LinkData extends Lume.Data {
  href: string
}

export default ({ children, href }: LinkData) => {
  const isExternal = href.startsWith("http")

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={isExternal ? "after:content-open-in-new" : undefined}
    >
      {children}
    </a>
  )
}
