import { memo } from "react"

const PageTitle = memo(({ title, className='', style={} }) => {
  return (
    <h1 className={`h2 fw-bold ${className}`} style={style}>{title}</h1>
  )
});

export default PageTitle;