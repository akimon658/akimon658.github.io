export const title = "akimon658.github.io"
export const layout = "layouts/root.tsx"

export default ({ comp }: Lume.Data, _helpers: Lume.Helpers) => (
  <>
    <div className="
      flex
      items-center
      justify-center
      mt-8
    ">
      <img src="/img/icon.png" />
      <div className="
        ml-14
        text-xl
      ">
        <h1 className="
          font-bold
          text-2xl
        ">
          あきも
        </h1>
        <div className="text-gray-500">
          @akimon658
        </div>
        <div className="mt-2">
          東京科学大学 情報理工学院 学士1年
        </div>
        <div className="
          flex
          mt-4
        ">
          <comp.Link href="https://x.com/akimon658" title="X" className="mr-4">
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
      記事
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
