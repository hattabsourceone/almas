import React from 'react'
import { IoSearch } from 'react-icons/io5'

const NotFound: React.FC = () => {
  return (
    <div className='my-10 w-100 flex flex-col items-center'>
      <div className='text-center'>
        <IoSearch className='w-xs sub-color' />
      </div>
      <h4 className='text-lg font-semibold text-center sub-color mt-4'>Page not found</h4>
      <h1 className='text-lg font-semibold text-center sub-color'>404</h1>
    </div>
  )
}

export default NotFound
