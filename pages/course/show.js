import React from 'react'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import PropTypes from 'prop-types'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { startCase } from 'lodash'

export default function Course({ course, onHide }) {
  const {
    course_name,
    description,
    prerequisites,
    credit_types,
    state_course_number,
    tps_course_number,
    credit_hours,
    course_notes,
    grade_levels,
    department,
  } = course
  return (
    <Stack spacing={1}>
      <Grid item xs={2}>
        <Button variant="contained" onClick={() => onHide()}>
          Go Back
        </Button>
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
        {startCase('grade_levels')}
      </Typography>
      <Typography variant="subtitle1">{grade_levels}</Typography>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {startCase('department')}
      </Typography>
      <Typography variant="subtitle1">{department}</Typography>
    </Stack>
  )
}

Course.propTypes = {
  course: PropTypes.object.isRequired,
  onHide: PropTypes.func.isRequired,
}
