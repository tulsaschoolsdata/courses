import React, { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Link from 'next/link'
import Popover from '@mui/material/Popover'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import { truncate } from 'lodash'
import Box from '@mui/material/Box'

export default function schoolCard({ school }) {
  const { school_number, name, school_category_name } = school

  const [anchorEl, setAnchorEl] = useState(null)

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const isTruncatedTitle = name.length > 30

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
        {school_category_name && (
          <Chip label={school_category_name} sx={{ marginBottom: 1 }} />
        )}

        <Box>
          <Button component={Link} href={`/schools/${school_number}`}>
            View Courses
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

schoolCard.propTypes = {
  school: PropTypes.object.isRequired,
}
