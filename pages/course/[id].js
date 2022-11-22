import React from 'react'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { courseShape } from '../../lib/prop-types'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { startCase } from 'lodash'
import { useRouter } from 'next/router'
import data from '../../courses.json'

export default function Course({ course }) {
  const router = useRouter()
  const {
    credit_hours,
    credit_type,
    name,
    number,
    description,
    pre_requisites,
    department
  } = course

  const renderSection = (title, attr) => {
    if (attr) {
      return (
        <React.Fragment>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {startCase(title)}
          </Typography>
          <Typography variant="subtitle1">{attr}</Typography>
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
      {renderSection('name', name)}
      {renderSection('description', description)}
      {renderSection('prerequisites', pre_requisites)}
      {renderSection('credit_types', credit_type)}
      {renderSection('course_number', number)}
      {renderSection('credit_hours', credit_hours)}
      {renderSection('department', department)}
    </Stack>
  )
}

const courses = Object.values(data['courses'])

export async function getStaticPaths() {
  const courseNumbers = courses.map(c => c.number)

  const paths = courseNumbers.map(courseNumber => (
    { params: { id: `${courseNumber}` } }
  ))

  return {
    paths: paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const course = courses.find(c => c.number === params.id)
  
  return {
    props: {
      course,
    },
  }
}

Course.propTypes = {
  course: courseShape,
}
