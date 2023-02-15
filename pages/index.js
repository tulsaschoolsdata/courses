import React from 'react'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Link from 'next/link'

export default function HomePage({}) {
  return (
      <Stack>
        <Typography component="h1" variant="h3" sx={{ pb: 4 }}>
          Course Catalog
        </Typography>
        <Typography variant="body">
          The Course of Study (COS) is a document that identifies the District’s
          standards-based courses that meet or exceed the state and the district
          graduation requirements. It reflects the body of courses available to
          all high schools, as well as courses that are unique to individual
          sites. During the fall semester of each year, schools have an
          opportunity to propose new courses for inclusion in the subsequent
          Course of Study. The Course of Study, in addition to defining
          individual course offerings, sets the grade levels at which the
          courses should be taught as well as enrollment pre-requisites.
          Year-long courses are offered for 1 full Carnegie unit of credit, and
          semester courses are offered for ½ Carnegie unit. Credit requirements
          are defined by the state and district graduation requirements.
          Suggested sequences also appear so that students may differentiate and
          deepen their learning experiences through enrollment in advanced
          courses that, in many cases, may lead to the award of college credit
          upon successful completion of one or more external examinations.
        </Typography>

        <Button
          href={'/courses'}
          component={Link}
          variant="contained"
          sx={{ mt: 2, textDecoration: 'none' }}
        >
          Get Started
        </Button>
      </Stack>
  )
}

HomePage.propTypes = {}

export async function getStaticProps() {
  return {
    props: {},
  }
}
