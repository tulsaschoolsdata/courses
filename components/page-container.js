import React from 'react'
import Container from '@mui/material/Container'
import PropTypes from 'prop-types'

export default function PageContainer({ children }) {
  return (
      <main>
        <Container
          maxWidth="md"
          sx={{
            bgcolor: 'background.paper',
            pt: '6em',
            pb: 2
          }}
        >
          {children}
        </Container>
      </main>
  )
}

PageContainer.propTypes = {
  children: PropTypes.any
}
