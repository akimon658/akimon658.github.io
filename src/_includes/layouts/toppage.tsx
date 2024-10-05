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
        <img src="/img/icon.png" className="md:mr-14" />
        <div className="
          md:mt-0
          mt-8
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
              <img src="/icon/x_black.png" className="h-6" />
            </comp.Link>
            <comp.Link
              href="https://github.com/akimon658"
              title="GitHub"
              className="mr-4"
            >
              <img src="/icon/github_black.svg" className="h-6" />
            </comp.Link>
            <comp.Link
              href="https://atcoder.jp/users/akimon658"
              title="AtCoder"
              className="" // To avoid open_in_new icon to be displayed
            >
              <img src="/icon/atcoder_black.png" className="h-6" />
            </comp.Link>
          </div>
        </div>
      </div>
      <h2 className="
        mt-8
        text-2xl
        text-center
      ">
        {data.article}
      </h2>
      <comp.List
        query="
          category=blog
          lang=ja
          layout=layouts/blog.tsx
        "
        sort="date=desc"
      />
    </>
  )
}
