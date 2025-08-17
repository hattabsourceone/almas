import React from 'react'

export type Props = {
  children: React.ReactNode

  x: string
  p: string
}

const Bubbel: React.FC<Props> = ({ children, x, p }) => {
  return (
    <div
      className={`w-full d-flex justify-content-center justify-content-lg-${p}`}
    >
      <div className={`translate0 translate${x}`}>
        <div className=' w-lg bg-blue rounded-full text-white'>{children}</div>
      </div>
    </div>
  )
}

export default Bubbel
