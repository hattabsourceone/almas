import React from 'react'
import { FiAlertTriangle } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

type Props = {
  link: string
}

const NoData: React.FC<Props> = ({ link }) => {
  const navigate = useNavigate()
  return (
    <div className='w-100 p-4 my-4 d-flex align-items-center flex-column bg-very-lite2-blue rounded-3'>
      <FiAlertTriangle className='min-w-200 min-h-200 sub-color' />
      <h6 className=' sub-color'>No Data Set Yet</h6>
      <a
        className=' mt-2'
        onClick={(e) => {
          e.preventDefault()
          navigate(link)
        }}
      >
        Update
      </a>
    </div>
  )
}

export default NoData
