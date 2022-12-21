import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import { schools } from '/lib/models'
import { schoolShape } from '/lib/prop-types'
import SchoolCard from '/components/schoolCard'
import Grid from '@mui/material/Grid'
import HeaderWithRecordCount from '/components/HeaderWithRecordCount'

export default function Schools({ schools }) {
  return (
    <>
      <HeaderWithRecordCount title="Schools" records={schools} />

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
