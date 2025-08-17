import React from 'react'
import { FaCircleNotch } from 'react-icons/fa'

const Loading: React.FC = () => {
  return (
    <div className='d-flex justify-content-center align-items-center min-h-600 w-full'>
      <FaCircleNotch className='animate-spin s-30x30' />
    </div>
  )
}

export default Loading
