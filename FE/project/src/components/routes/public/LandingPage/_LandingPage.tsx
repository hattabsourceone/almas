import React, { useEffect } from 'react'
import Carousel from './Carousel'
import VideoDescription from './VideoDescription'
import LandingCards from './LandingCards'
import DiamondCharacteristics from './DiamondCharacteristics'
import LandingAboutUs from './LandingAboutUs'
import LandingProducts from './LandingProducts'
import Collections from './Collections'
import BigImage from './BigImage'
import Contact from '@shared/Contact/Contact'
import background from '@assets/LandingPage/bg-landingPage.png'

const LandingPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Almas Online Dubai | Diamond Engagement Rings Dubai'
  }, [])
  return (
    <div
      className='fixed-img'
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className='relative z-2'>
        <Carousel />
        <VideoDescription />
        <LandingCards />
        <DiamondCharacteristics />
        <LandingAboutUs />
        <LandingProducts
          title='A GLIMPSE OF OUR JEWELLERY COLLECTION'
          description='whatever your taste is, Almas-online always has something for you. Each Jewellery in our collection creates a special mood.'
        />
        <Collections />
        <BigImage />
        <Contact />
      </div>
    </div>
  )
}

export default LandingPage
