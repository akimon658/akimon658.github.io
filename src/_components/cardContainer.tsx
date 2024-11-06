interface CardContainerData extends Lume.Data {
  className?: string
  compact?: boolean
  href: string
}

export default (
  { children, comp, className, compact, href }: CardContainerData,
) => {
  const width = compact ? "80" : "full"

  return (
    <comp.Link
      href={href}
      className={`
        bg-gray-50
        border-2
        border-gray-100
        dark:bg-gray-900
        dark:border-gray-800
        dark:hover:bg-gray-800
        dark:text-gray-300
        h-36
        hover:bg-gray-100
        not-prose
        p-4
        rounded-lg
        w-${width}
        ${className || ""}
      `}
    >
      {children}
    </comp.Link>
  )
}
