import React from 'react'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import PropTypes from 'prop-types'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { startCase } from 'lodash'
import { useRouter } from 'next/router'
import data from './../../courses.json'

export default function Course({ course }) {
  const router = useRouter()
  const {
    ALT_COURSE_NUMBER,
    COURSE_CREDIT_HOURS,
    COURSE_CREDIT_TYPE,
    COURSE_NAME,
    COURSE_NUMBER,
    DESCRIPTION,
    PRE_REQ_NOTE
  } = course
  return (
    <Stack spacing={1}>
      <Grid item xs={2}>
        <Button variant="contained" onClick={() => router.back()}>
          Go Back
        </Button>
      </Grid>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {startCase('course_name')}
      </Typography>
      <Typography variant="subtitle1">{COURSE_NAME}</Typography>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {startCase('description')}
      </Typography>
      <Typography variant="subtitle1">{DESCRIPTION}</Typography>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {startCase('prerequisites')}
      </Typography>
      <Typography variant="subtitle1">{PRE_REQ_NOTE}</Typography>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {startCase('credit_types')}
      </Typography>
      <Typography variant="subtitle1">{COURSE_CREDIT_TYPE}</Typography>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {startCase('state_course_number')}
      </Typography>
      <Typography variant="subtitle1">{ALT_COURSE_NUMBER}</Typography>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {startCase('tps_course_number')}
      </Typography>
      <Typography variant="subtitle1">{COURSE_NUMBER}</Typography>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {startCase('credit_hours')}
      </Typography>
      <Typography variant="subtitle1">{COURSE_CREDIT_HOURS}</Typography>
      {/* <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {startCase('course_notes')}
      </Typography>
      <Typography variant="subtitle1">{course_notes}</Typography>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {startCase('department')}
      </Typography>
      <Typography variant="subtitle1">{department}</Typography> */}
    </Stack>
  )
}

const schools = data['schools']

const courses = data['courses']
// .map(course => ({
//   'ALT_COURSE_NUMBER': course.ALT_COURSE_NUMBER,
//   'BUILDID': course.BUILDID,
//   'CATALOG_ID': course.CATALOG_ID,
//   'CATALOG_NAME': course.CATALOG_NAME,
//   'COURSE_CREDIT_HOURS': course.COURSE_CREDIT_HOURS,
//   'COURSE_CREDIT_TYPE': course.COURSE_CREDIT_TYPE,
//   'COURSE_NAME': course.COURSE_NAME,
//   'COURSE_NUMBER': course.COURSE_NUMBER,
//   'COURSE_SCHEDULED': course.COURSE_SCHEDULED,
//   'DATE_LAST_LOADED': course.DATE_LAST_LOADED,
//   'DESCRIPTION': course.DESCRIPTION,
//   'PRE_REQ_NOTE': course.PRE_REQ_NOTE
// }))

export async function getStaticPaths() {
  // const paths = [
  //   ...new Set(courses.map((course) => `/course/${course.ALT_COURSE_NUMBER}`)),
  // ]

  return {
    paths: [],
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  // TODO: We need a uuid for each course to make this work
  // so we can do courses[params.course_id]
  const course = courses.filter(c => c.ALT_COURSE_NUMBER === params.cid)[0]
  console.log(course)
  console.log(params)
  return {
    props: {
      course,
    },
  }
}

Course.propTypes = {
  course: PropTypes.object.isRequired,
}
