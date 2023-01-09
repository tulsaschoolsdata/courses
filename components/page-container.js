import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import PropTypes from 'prop-types'

export default function PageContainer({ children }) {
  return (
    <Container
      maxWidth="md"
      sx={{
        pt: '6em',
      }}
    >
      {children}
    </Container>
  )
}

PageContainer.propTypes = {
  children: PropTypes.any,
}
