import React from 'react'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import PropTypes from 'prop-types'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { startCase } from 'lodash'

export default function Course({ course }) {
  const {
    course_name,
    description,
    prerequisites,
    credit_types,
    state_course_number,
    tps_course_number,
    credit_hours,
    course_notes,
    school_name,
    department,
  } = course
  return (
    <Stack spacing={1}>
      <Grid item xs={2}>
        <Button variant="contained">Go Back</Button>
      </Grid>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {startCase('course_name')}
      </Typography>
      <Typography variant="subtitle1">{course_name}</Typography>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {startCase('description')}
      </Typography>
      <Typography variant="subtitle1">{description}</Typography>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {startCase('prerequisites')}
      </Typography>
      <Typography variant="subtitle1">{prerequisites}</Typography>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {startCase('credit_types')}
      </Typography>
      <Typography variant="subtitle1">{credit_types}</Typography>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {startCase('state_course_number')}
      </Typography>
      <Typography variant="subtitle1">{state_course_number}</Typography>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {startCase('tps_course_number')}
      </Typography>
      <Typography variant="subtitle1">{tps_course_number}</Typography>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {startCase('credit_hours')}
      </Typography>
      <Typography variant="subtitle1">{credit_hours}</Typography>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {startCase('course_notes')}
      </Typography>
      <Typography variant="subtitle1">{course_notes}</Typography>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {startCase('department')}
      </Typography>
      <Typography variant="subtitle1">{department}</Typography>
    </Stack>
  )
}

const courses = [...Array(10).keys()].map((n) => ({
  course_name: `Course ${n}`,
  prerequisites: `Course ${n - 1} must be taken before this course.`,
  credit_types: 'ELEC;WFC',
  state_course_number: `${n}`,
  tps_course_number: `${n}${String.fromCharCode(
    65 + Math.floor(Math.random() * 2)
  )}`,
  credit_hours: '0.5',
  description: `Course ${n} description goes here. Course ${n} description goes here. Course ${n} description goes here. Course ${n} description goes here.`,
  course_notes: `Course ${n} notes go here.`,
  school_name: `School ${n}`,
  department: ['Math', 'Reading', 'History', 'Science', 'Art', 'PE', 'Music'][
    Math.floor(Math.random() * 6)
  ],
}))

export async function getStaticPaths() {
  const paths = [
    ...new Set(courses.map((course) => `/course/${course.tps_course_number}`)),
  ]
  return {
    paths: paths,
    fallback: false,
  }
}

export async function getStaticProps() {
  // TODO: We need a uuid for each course to make this work
  // so we can do courses[course_id]
  const course = courses[0]

  return {
    props: {
      course,
    },
  }
}

Course.propTypes = {
  course: PropTypes.object.isRequired,
}
