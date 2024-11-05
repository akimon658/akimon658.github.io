export const layout = "layouts/root.tsx"

export default (data: Lume.Data, _helpers: Lume.Helpers) => {
  const comp = data.comp

  return (
    <>
      <div className="
        flex
        flex-col
        items-center
        justify-center
        md:flex-row
        mt-8
      ">
        <img
          src="/img/icon.avif"
          height="200"
          width="200"
          className="md:mr-14"
        />
        <div className="
          max-w-80
          md:mt-0
          mt-8
          sm:max-w-none
          text-xl
        ">
          <h1 className="
            font-bold
            text-2xl
          ">
            {data.author_name}
          </h1>
          <div className="text-gray-500">
            @akimon658
          </div>
          <div className="mt-2">
            {data.author_affiliation}
          </div>
          <div className="
            flex
            mt-4
          ">
            <comp.Link
              href="https://x.com/akimon658"
              title="X"
              className="mr-4"
            >
              <picture className="h-6">
                <source
                  srcSet="/icon/x_white.png"
                  media="(prefers-color-scheme: dark)"
                />
                <img src="/icon/x_black.png" height="24" width="23" />
              </picture>
            </comp.Link>
            <comp.Link
              href="https://github.com/akimon658"
              title="GitHub"
              className="mr-4"
            >
              <picture className="h-6">
                <source
                  srcSet="/icon/github_white.svg"
                  media="(prefers-color-scheme: dark)"
                />
                <img src="/icon/github_black.svg" height="24" width="24.5" />
              </picture>
            </comp.Link>
            <comp.Link
              href="https://atcoder.jp/users/akimon658"
              title="AtCoder"
              className="" // To avoid open_in_new icon to be displayed
            >
              <picture className="h-6">
                <source
                  srcSet="/icon/atcoder_white.png"
                  media="(prefers-color-scheme: dark)"
                />
                <img src="/icon/atcoder_black.png" height="24" width="24.32" />
              </picture>
            </comp.Link>
          </div>
        </div>
      </div>
      <h2 className="
        mt-8
        text-2xl
        text-center
      ">
        {data.articles}
      </h2>
      <comp.List
        query={`
          category=blog
          lang=${data.lang}
          layout=layouts/blog.tsx
        `}
        sort="date=desc"
      />
    </>
  )
}
