import React from 'react'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { courseShape } from '../../lib/prop-types'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { startCase } from 'lodash'
import { useRouter } from 'next/router'
import catalog from './../../data/catalog.json'
import { isArray } from 'lodash'

export default function Course({ course }) {
  const router = useRouter()
  const {
    courses_credit_hours,
    course_credit_type_name,
    course_name,
    course_number,
    course_description,
    pre_req_note,
    course_department_name
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
    <Stack spacing={1}>
      <Grid item xs={2}>
        <Button variant="contained" onClick={() => router.back()}>
          Go Back
        </Button>
      </Grid>
      {renderSection('name', course_name)}
      {renderSection('description', course_description)}
      {renderSection('prerequisites', pre_req_note)}
      {renderSection('credit_types', course_credit_type_name)}
      {renderSection('course_number', course_number)}
      {renderSection('credit_hours', courses_credit_hours)}
      {renderSection('department', course_department_name)}
    </Stack>
  )
}

const courseDepartments = catalog['course_departments']
const creditTypes = catalog['course_credit_types']
const courses = Object.values(catalog['courses']).map(course => ({
  ...course,
  course_department_name: courseDepartments[course['course_department']],
  course_credit_type_name: creditTypes[course['course_credit_type']]
}))

export async function getStaticPaths() {
  const courseNumbers = courses.map(c => c.course_number)

  const paths = courseNumbers.map(courseNumber => (
    { params: { id: `${courseNumber}` } }
  ))

  return {
    paths: paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const course = courses.find(c => c.course_number === params.id)
  
  return {
    props: {
      course,
    },
  }
}

Course.propTypes = {
  course: courseShape,
}
