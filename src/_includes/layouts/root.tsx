export default ({ title, children }: Lume.Data, _helpers: Lume.Helpers) => (
  <html>
    <head>
      <title>{title}</title>
      <link rel="icon" href="/icon/favicon.ico" />
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <header className="flex h-14 items-center mx-auto max-w-5xl">
        <a href="/" className="ml-4 my-auto text-xl">akimon658.github.io</a>
      </header>
      <main>{children}</main>
    </body>
  </html>
)
