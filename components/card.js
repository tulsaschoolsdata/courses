import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { truncate } from 'lodash'

export default function CourseCard({ course }) {
  const {
    alt_number,
    description,
    name
  } = course

  return (
    <Card sx={{ height: 300, display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        image="https://source.unsplash.com/random?Education"
        alt="random"
        height={50}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
        <Typography>
          {truncate(description, {
            length: 100,
          })}
        </Typography>
        <Link href={`/course/${alt_number}`}>Read More</Link>
      </CardContent>
    </Card>
  )
}

CourseCard.propTypes = {
  course: PropTypes.object.isRequired,
}
