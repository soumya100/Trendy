import { Fragment } from "react"
import Hero from "../components/home/Hero"
import LatestCollection from "../components/home/LatestCollection"
import BestSeller from "../components/home/BestSeller"
import OurPolicy from "../components/home/OurPolicy"
import NewsLetterItemBox from "../components/home/NewsLetterItemBox"


const Home = () => {
  return (
    <Fragment>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsLetterItemBox />
    </Fragment>
  )
}

export default Home
