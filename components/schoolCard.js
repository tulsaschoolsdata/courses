import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Link from 'next/link'
import Typography from '@mui/material/Typography'
import { truncate } from 'lodash'
import Grid from '@mui/material/Grid'
import { schoolShape } from '/lib/prop-types'

export default function SchoolCard({ school }) {
  const { school_number, name, school_category_name } = school

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
            <Typography gutterBottom variant="h6">
              {truncate(name, { length: 28 })}
            </Typography>
          </Grid>

          {school_category_name && (
            <Grid item xs={12}>
              <Chip label={school_category_name} sx={{ marginBottom: 1 }} />
            </Grid>
          )}

          <Grid item xs={12}>
            <Button
              component={Link}
              href={`/schools/${school_number}`}
              variant="outlined"
              sx={{ width: '100%' }}
            >
              View Courses
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

SchoolCard.propTypes = {
  school: schoolShape,
}
