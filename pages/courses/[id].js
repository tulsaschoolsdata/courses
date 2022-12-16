import React from 'react'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { courseShape } from '../../lib/prop-types'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { startCase } from 'lodash'
import { useRouter } from 'next/router'
import { isArray } from 'lodash'
import Head from 'next/head'
import { truncate } from 'lodash'
import { courses, schoolsWhereCourseNumber } from '/lib/models'

export default function Course({ course, schools }) {
  const router = useRouter()
  const {
    courses_credit_hours,
    credit_types,
    name,
    course_number,
    description,
    pre_req_note,
    department,
  } = course

  const renderSection = (title, attr) => {
    const displayedVal = isArray(attr) ? attr.join(', ') : attr

    if (attr) {
      return (
        <React.Fragment>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {startCase(title)}
          </Typography>
          <Typography variant="subtitle1">{displayedVal}</Typography>
        </React.Fragment>
      )
    }
  }

  return (
    <React.Fragment>
      <Head>
        <title>{`${name} - Tulsa Public Schools`}</title>
        <meta
          name="description"
          content={truncate(course.course_description, { length: 155 })}
        />
        <link rel="icon" href="/images/tps-logo-color.svg" />
      </Head>
      <Stack spacing={1}>
        <Grid item xs={2}>
          <Button variant="contained" onClick={() => router.back()}>
            Go Back
          </Button>
        </Grid>
        {renderSection('course name', name)}
        {renderSection('description', description)}
        {renderSection('prerequisites', pre_req_note)}
        {renderSection('credit_types', credit_types)}
        {renderSection('course_number', course_number)}
        {renderSection('credit_hours', courses_credit_hours)}
        {renderSection('department', department)}
        {renderSection(
          'schools',
          schools.map((school) => school.name)
        )}
      </Stack>
    </React.Fragment>
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
