import React from 'react'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Divider from '@mui/material/Divider'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import { truncate } from 'lodash'

export default function CourseCard({ course, setShowCourse }) {
  return (
    <Card
      sx={{ height: 250, display: 'flex', flexDirection: 'column' }}
    >
      <CardMedia
        component="img"
        image="https://source.unsplash.com/random"
        alt="random"
        height={50}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {course.course_name}
        </Typography>
        <Typography>
          {truncate(course.description, {
            length: 75
          })}
          <Divider />
          <Button onClick={() => setShowCourse(course)}>Read More</Button>
        </Typography>
      </CardContent>
    </Card>
  )
}

CourseCard.propTypes = {
  course: PropTypes.object.isRequired,
  setShowCourse: PropTypes.func.isRequired
}
