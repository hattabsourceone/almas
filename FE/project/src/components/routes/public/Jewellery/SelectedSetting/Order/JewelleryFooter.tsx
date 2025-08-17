import React from 'react'

type Props = {
  data: any
}
const JewelleryFooter: React.FC<Props> = ({ data }) => {
  return (
    <div>
      <div className='line-top-bottom w-100 grid-1-2-sm'>
        <p className='subtitle'>
          <span className='bold'>Carat:</span> {data?.diamond_size}
        </p>
        <p className='subtitle'>
          <span className='bold'>Shape:</span> {data?.shape?.value_name}
        </p>
        <p className='subtitle'>
          <span className='bold'>Cut:</span> {data?.cut?.value_name || "--"}
        </p>
        <p className='subtitle'>
          <span className='bold'>Color:</span> {data?.color?.value_name}
        </p>
        <p className='subtitle'>
          <span className='bold'>Clarity:</span> {data?.clarity?.value_name}
        </p>
        <p className='subtitle'>
          <span className='bold'>Polish:</span> {data?.polish?.value_name}
        </p>
        <p className='subtitle'>
          <span className='bold'>Symmetry:</span> {data?.symmetry?.value_name}
        </p>
        <p className='subtitle'>
          <span className='bold'>Fluorescence:</span>{' '}
          {data?.fluor_intensity?.value_name}
        </p>
        <p className='subtitle'>
          <span className='bold'>Lab:</span> {data?.lab}
        </p>
        <p className='subtitle'>
          <span className='bold'>Culet:</span> {data?.shape?.value_name}
        </p>
        <p className='subtitle'>
          <span className='bold'>Table :</span> {data?.table}%
        </p>
        <p className='subtitle'>
          <span className='bold'>Depth :</span> {data?.depth}%
        </p>
        <p className='subtitle '>
          <span className='bold'>Dimentions:</span> {data?.meas_depth}*
          {data?.meas_length}*{data?.meas_width}mm
        </p>
      </div>
    </div>
  )
}

export default JewelleryFooter
