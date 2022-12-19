import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import { schools } from '/lib/models'
import { schoolShape } from '/lib/prop-types'
import SchoolCard from '/components/schoolCard'
import { useMediaQuery } from '@mui/material'
import Grid from '@mui/material/Grid'

export default function Schools({ schools }) {
  return (
    <>
      <Typography variant="h4" color="inherit" sx={{ pb: 2 }}>
        Schools
      </Typography>

      <Grid container spacing={2}>
        {schools.map((school) => (
          <Grid key={school.school_number} item xs={12} sm={6}>
            <SchoolCard school={school} />
          </Grid>
        ))}
      </Grid>
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
