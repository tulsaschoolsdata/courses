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
        <Typography gutterBottom variant="h6">
          {truncate(name, { length: 30 })}
        </Typography>
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
