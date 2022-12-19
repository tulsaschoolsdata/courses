import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { schools } from '/lib/models'
import { schoolShape } from '/lib/prop-types'
import SchoolCard from '/components/schoolCard'
import Box from '@mui/material/Box'
import { useMediaQuery } from '@mui/material'

export default function Schools({ schools }) {
  const largeScreen = useMediaQuery('(min-width:600px)')
  return (
    <>
      <Typography variant="h4" color="inherit" sx={{ pb: 2 }}>
        Schools
      </Typography>

      <>
        {schools.map((school) => (
          <Box
            key={school.school_number}
            xs={12}
            sm={6}
            sx={{
              p: 1,
              display: 'inline-block',
              width: largeScreen ? '50%' : '100%',
            }}
          >
            <SchoolCard school={school} />
          </Box>
        ))}
      </>
    </>
  )
}

Schools.propTypes = {
  schools: PropTypes.arrayOf(schoolShape),
}

export async function getStaticProps() {
  return {
    props: {
      schools,
    },
  }
}
