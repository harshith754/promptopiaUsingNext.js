import Feed from '@components/Feed'

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center"> AI-powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Promptopia is an open-scorce AI prompting tool for mordern world to discover, create and share creative prompts
      </p>
      <Feed />
    </section>
  )
}

export default Home
