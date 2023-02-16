import React from 'react'
import Link from 'next/link'

// https://mui.com/material-ui/guides/routing/#component-prop
const NextLinkBehavior = React.forwardRef((props, ref) => (
  <Link ref={ref} {...props} {...props.nextlink} role={undefined} />
))

NextLinkBehavior.displayName = 'NextLinkBehavior'
export default NextLinkBehavior
