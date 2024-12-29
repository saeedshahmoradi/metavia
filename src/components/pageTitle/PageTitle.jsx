import { memo } from "react"

const PageTitle = memo(({ title, className='', style={} }) => {
  return (
    <p className={`h2 fw-bold ${className}`} style={style}>{title}</p>
  )
});

export default PageTitle;