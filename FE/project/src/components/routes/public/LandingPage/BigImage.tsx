import React from 'react'
import image from '@assets/LandingPage/cat-ban.jpg'

const BigImage: React.FC = () => {
  return (
    <div className='big-image-container'>
      <img className='big-image' src={image} alt='' />
    </div>
  )
}

export default BigImage
