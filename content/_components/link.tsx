import styled from "@emotion/styled"

const A = styled.a(
  (props) => {
    if (props.target === "_blank") {
      return {
        ":after": {
          content: "url('/icon/open_in_new_16dp_434343.svg')",
        },
      }
    }
  },
)

interface LinkData extends Lume.Data {
  href: string
}

export default ({ children, href }: LinkData) => {
  const isExternal = href.startsWith("http")

  return (
    <A
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      {children}
    </A>
  )
}
