import React from 'react'
import { courseShape } from '../../lib/prop-types'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Head from 'next/head'
import { truncate } from 'lodash'
import { courses, schoolsWhereCourseNumber } from '/lib/models'
import SchoolCard from '/components/schoolCard'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import Alert from '@mui/material/Alert'

export default function Course({ course, schools }) {
  const {
    credit_hours,
    credit_types,
    name,
    course_number,
    description,
    pre_req_note,
    department,
  } = course

  const creditTypeChips = (creditTypes) => {
    return (
      <>
        {creditTypes.map((creditType) => (
          <Grid item key={creditType}>
            <Chip label={`Credit Type: ${creditType}`} />
          </Grid>
        ))}
      </>
    )
  }

  const renderPreReqNote = (pre_req_note) => {
    return (
      pre_req_note && (
        <Alert severity="warning">Prerequisite Note: {pre_req_note}</Alert>
      )
    )
  }

  const renderChips = () => {
    return (
      <Grid container spacing={1} sx={{ pb: 2 }}>
        <Grid item>
          <Chip label={`Course #: ${course_number}`} />
        </Grid>
        {creditTypeChips(credit_types)}
        <Grid item>
          <Chip label={`Department: ${department}`} />
        </Grid>
        <Grid item>
          <Chip label={`Credit Hours: ${credit_hours}`} />
        </Grid>
      </Grid>
    )
  }

  const renderSchoolCards = (schools) => {
    return (
      <Grid container spacing={2}>
        {schools.map((school) => (
          <Grid key={school.school_number} item xs={12} sm={6}>
            <SchoolCard school={school} />
          </Grid>
        ))}
      </Grid>
    )
  }

  return (
    <>
      <Head>
        <title>{`${name} - Tulsa Public Schools`}</title>
        <meta
          name="description"
          content={truncate(description, { length: 155 })}
        />
        <link rel="icon" href="/images/tps-logo-color.svg" />
      </Head>

      <Stack spacing={2}>
        <Typography component="h1" variant="h4">
          {name}
        </Typography>

        {renderChips()}
        {renderPreReqNote()}

        <Typography variant="body">{description}</Typography>

        <Typography
          component="div"
          variant="h6"
          sx={{ fontWeight: 'bold', pt: 4 }}
        >
          Schools
        </Typography>

        {renderSchoolCards(schools)}
      </Stack>
    </>
  )
}

export async function getStaticPaths() {
  const courseNumbers = courses.map((c) => c.course_number)

  const paths = courseNumbers.map((courseNumber) => ({
    params: { id: `${courseNumber}` },
  }))

  return {
    paths: paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const course = courses.find((c) => c.course_number === params.id)
  const schools = schoolsWhereCourseNumber(course.course_number)

  return {
    props: {
      course,
      schools,
    },
  }
}

Course.propTypes = {
  course: courseShape,
}
