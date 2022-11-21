import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Divider from '@mui/material/Divider'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

export default function CourseCard({ course }) {
  const {
    ALT_COURSE_NUMBER,
    COURSE_NAME
  } = course

  return (
    <Card sx={{ height: 250, display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        image="https://source.unsplash.com/random?Education"
        alt="random"
        height={50}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {COURSE_NAME}
        </Typography>
        <Divider />
        <Link href={`/course/${ALT_COURSE_NUMBER}`}>Read More</Link>
      </CardContent>
    </Card>
  )
}

CourseCard.propTypes = {
  course: PropTypes.object.isRequired,
}
