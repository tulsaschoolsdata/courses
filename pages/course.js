import React from 'react'
import PropTypes from 'prop-types'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { startCase } from 'lodash'
export default function Course({ course, onHide }) {
  return (
    <Stack spacing={1}>
      <Grid item xs={2}><Button variant="contained" onClick={() => onHide()}>Go Back</Button></Grid>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{startCase('course_name')}</Typography>
      <Typography variant="subtitle1">{course.course_name}</Typography>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{startCase('description')}</Typography>
      <Typography variant="subtitle1">{course.description}</Typography>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{startCase('prerequisites')}</Typography>
      <Typography variant="subtitle1">{course.prerequisites}</Typography>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{startCase('credit_types')}</Typography>
      <Typography variant="subtitle1">{course.credit_types}</Typography>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{startCase('state_course_number')}</Typography>
      <Typography variant="subtitle1">{course.state_course_number}</Typography>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{startCase('tps_course_number')}</Typography>
      <Typography variant="subtitle1">{course.tps_course_number}</Typography>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{startCase('credit_hours')}</Typography>
      <Typography variant="subtitle1">{course.credit_hours}</Typography>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{startCase('course_notes')}</Typography>
      <Typography variant="subtitle1">{course.course_notes}</Typography>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{startCase('grade_levels')}</Typography>
      <Typography variant="subtitle1">{course.grade_levels}</Typography>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{startCase('department')}</Typography>
      <Typography variant="subtitle1">{course.department}</Typography>
    </Stack>
  )
}

Course.propTypes = {
  course: PropTypes.object.isRequired,
  onHide: PropTypes.func.isRequired
}
