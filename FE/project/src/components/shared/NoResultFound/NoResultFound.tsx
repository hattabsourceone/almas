import React from 'react'
import { VscSearchStop } from 'react-icons/vsc'

const NoResultFound: React.FC = () => {
  return (
    <div className=' d-flex justify-content-center align-items-center col my-10 w-full'>
      <VscSearchStop size={100} />
      <h6 className='p-4'>No Result Found !</h6>
    </div>
  )
}

export default NoResultFound
