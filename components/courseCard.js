import React, { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Link from 'next/link'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import { truncate } from 'lodash'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { courseShape } from '/lib/prop-types'

export default function CourseCard({ course }) {
  const { description, name, course_number } = course

  const [anchorEl, setAnchorEl] = useState(null)

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const isTruncatedTitle = name.length > 30

  return (
    <Card sx={{ minHeight: 200 }}>
      <CardContent>
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="space-around"
          alignItems="stretch"
        >
          <Grid item xs={12}>
            <Typography
              variant="h6"
              onMouseEnter={isTruncatedTitle ? handlePopoverOpen : null}
              onMouseLeave={isTruncatedTitle ? handlePopoverClose : null}
            >
              {truncate(name, { length: 30 })}

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
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography>
              {description
                ? truncate(description, {
                    length: 100,
                  })
                : 'No description available.'}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Button
              sx={{ width: '100%' }}
              component={Link}
              href={`/courses/${course_number}`}
              variant="outlined"
            >
              View Course Information
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

CourseCard.propTypes = {
  course: courseShape,
}
