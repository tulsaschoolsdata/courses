import React, { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Link from 'next/link'
import Popover from '@mui/material/Popover'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import { truncate } from 'lodash'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

export default function CourseCard({ course }) {
  const { department, description, name, course_number } = course

  const [anchorEl, setAnchorEl] = useState(null)

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const isTruncatedTitle = name.length > 30

  const creditTypeChips = () => {
    const creditTypes = course.credit_types
    return (
      <>
        {creditTypes.map((creditType) => (
          <Grid item key={creditType}>
            <Chip label={`Credit Type: ${creditType}`} />
          </Grid>
        ))}
      </>
    )
  }

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
          {truncate(name, { length: 30 })}
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
            <Typography sx={{ p: 1 }}>{name}</Typography>
          </Popover>
        )}

        <Grid container spacing={0.5} sx={{ height: 100 }}>
          <Grid item>
            {department && <Chip label={`Department: ${department}`} />}
          </Grid>
          {creditTypeChips()}
        </Grid>

        <Typography sx={{ mt: 3, mb: 3 }}>
          {description
            ? truncate(description, {
                length: 100,
              })
            : 'No description available.'}
        </Typography>
        <Button component={Link} href={`/courses/${course_number}`}>
          View Course Information
        </Button>
      </CardContent>
    </Card>
  )
}

CourseCard.propTypes = {
  course: PropTypes.object.isRequired,
}
