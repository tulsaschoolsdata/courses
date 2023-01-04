import React from 'react'
import PropTypes from 'prop-types'
import { schools } from '/lib/models'
import { schoolShape } from '/lib/prop-types'
import SchoolCard from '/components/schoolCard'
import Grid from '@mui/material/Grid'
import Head from 'next/head'
import HeaderWithRecordCount from '/components/HeaderWithRecordCount'

export default function Schools({ schools }) {
  const MetaTags = () => (
    <Head>
      <title>All Tulsa Public Schools Offering a Course Catalog</title>
      <meta
        name="description"
        content="A listing of Tulsa Public Schools with a link to courses that are offered"
      />
    </Head>
  )

  return (
    <>
      <MetaTags />
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
