export default ({ title, children }: Lume.Data, _helpers: Lume.Helpers) => (
  <html>
    <head>
      <title>{title}</title>
    </head>
    <body>
      <main>{children}</main>
    </body>
  </html>
)
