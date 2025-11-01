import React, { Fragment } from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsLetterItemBox from '../components/NewsLetterItemBox'

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
