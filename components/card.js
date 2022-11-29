import React, { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Link from 'next/link'
import Popover from '@mui/material/Popover'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import { truncate } from 'lodash'

export default function CourseCard({ course }) {
  const {
    course_department_name,
    course_description,
    course_name,
    course_number,
  } = course

  const [anchorEl, setAnchorEl] = useState(null)

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const isTruncatedTitle = course_name.length > 30

  return (
    <Card
      sx={{
        minHeight: 200,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          gutterBottom
          variant="h6"
          onMouseEnter={isTruncatedTitle ? handlePopoverOpen : null}
          onMouseLeave={isTruncatedTitle ? handlePopoverClose : null}
        >
          {truncate(course_name, { length: 30 })}
        </Typography>
        {isTruncatedTitle && (
          <Popover
            disableScrollLock
            sx={{
              pointerEvents: 'none',
              width: '100%',
            }}
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            disableRestoreFocus
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <Typography sx={{ p: 1 }}>{course_name}</Typography>
          </Popover>
        )}
        {course_department_name && (
          <Chip label={course_department_name} sx={{ marginBottom: 1 }} />
        )}
        <Typography>
          {course_description
            ? truncate(course_description, {
                length: 100,
              })
            : 'No description available.'}
        </Typography>
        <Link sx={{ position: 'fixed' }} href={`/course/${course_number}`}>
          Read More
        </Link>
      </CardContent>
    </Card>
  )
}

CourseCard.propTypes = {
  course: PropTypes.object.isRequired,
}
