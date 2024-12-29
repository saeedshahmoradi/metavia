import React from 'react'

export default function SectionTitle({ title, className = '', style = {} }) {
  return (
    <p className={`h3 fw-bold ${className}`} style={style}>
      {title}
    </p>
  )
}
