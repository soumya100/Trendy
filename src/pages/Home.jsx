import React, { Fragment } from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'

const Home = () => {
  return (
    <Fragment>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
    </Fragment>
  )
}

export default Home
