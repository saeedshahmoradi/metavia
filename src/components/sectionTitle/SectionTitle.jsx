import React from 'react'

export default function SectionTitle({ title, className = '', style = {} }) {
  return (
    <h2 className={`h3 fw-normal ${className}`} style={style}>
      {title}
    </h2>
  )
}
