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
    alt_number,
    credit_hours,
    credit_type,
    name,
    number,
    description,
    pre_requisites,
    department
  } = course
  return (
    <Stack spacing={1}>
      <Grid item xs={2}>
        <Button variant="contained" onClick={() => router.back()}>
          Go Back
        </Button>
      </Grid>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {startCase('name')}
      </Typography>
      <Typography variant="subtitle1">{name}</Typography>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {startCase('description')}
      </Typography>
      <Typography variant="subtitle1">{description}</Typography>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {startCase('prerequisites')}
      </Typography>
      <Typography variant="subtitle1">{pre_requisites}</Typography>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {startCase('credit_types')}
      </Typography>
      <Typography variant="subtitle1">{credit_type}</Typography>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {startCase('state_course_number')}
      </Typography>
      <Typography variant="subtitle1">{alt_number}</Typography>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {startCase('tps_course_number')}
      </Typography>
      <Typography variant="subtitle1">{number}</Typography>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {startCase('credit_hours')}
      </Typography>
      <Typography variant="subtitle1">{credit_hours}</Typography>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {startCase('department')}
      </Typography>
      <Typography variant="subtitle1">{department}</Typography>
    </Stack>
  )
}

const courses = Object.values(data['courses'])

export async function getStaticPaths() {
  const altNumbers = courses.map(c => c.alt_number)

  const paths = altNumbers.map(altNumber => (
    { params: { id: `${altNumber}` }}
  ))

  return {
    paths: paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  // TODO: We need a uuid for each course to make this work
  // so we can do courses[params.course_id]
  const course = courses.filter(c => c.alt_number === params.id)[0]
  
  return {
    props: {
      course,
    },
  }
}

Course.propTypes = {
  course: courseShape,
}
