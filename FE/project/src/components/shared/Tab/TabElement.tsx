import React from 'react'

export type PropsTabElement = {
  question: string
  response: React.ReactNode
  id: number
}

const TabElement: React.FC<PropsTabElement> = ({ question, response, id }) => {
  return (
    <div className='accordion-item my-4'>
      <h2 className='accordion-header' id={`flush-heading-${id}`}>
        <button
          className='accordion-button-style collapsed'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target={`#flush-collapse-${id}`}
          aria-expanded='false'
          aria-controls={`flush-collapse-${id}`}
        >
          {question}
        </button>
      </h2>
      <div
        id={`flush-collapse-${id}`}
        className='accordion-collapse collapse'
        aria-labelledby={`flush-heading-${id}`}
      >
        <div className='accordion-body text-justify m-0 px-1'>{response}</div>
      </div>
    </div>
  )
}

export default TabElement
