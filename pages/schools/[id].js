import React from 'react'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { startCase } from 'lodash'
import { useRouter } from 'next/router'
import catalog from '/data/catalog.json'
import { isArray } from 'lodash'
import Head from 'next/head'
import { truncate } from 'lodash'
import { schools } from '/lib/models'
import { schoolShape } from '/lib/prop-types'

export default function School({ school }) {
  const router = useRouter()
  const {
    school_name,
    school_id,
  } = school

  const renderSection = (title, attr) => {
    const displayedVal = isArray(attr) ? attr.join(', ') : attr

    if (attr) {
      return (
        <React.Fragment>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {startCase(title)}
          </Typography>
          <Typography variant="subtitle1">{displayedVal}</Typography>
        </React.Fragment>
      )
    }
  }

  return (
    <React.Fragment>
      <Head>
        <title>{`${school.school_name} - Tulsa Public Schools`}</title>
        <meta
          name="description"
          content={truncate(school.school_name, { length: 155 })}
        />
        <link rel="icon" href="/images/tps-logo-color.svg" />
      </Head>
      <Stack spacing={1}>
        <Grid item xs={2}>
          <Button variant="contained" onClick={() => router.back()}>
            Go Back
          </Button>
        </Grid>
        {renderSection('name', school_name)}
        {renderSection('school_id', school_id)}
      </Stack>
    </React.Fragment>
  )
}

export async function getStaticPaths() {
  const schoolIds = schools.map((s) => s.school_id)

  const paths = schoolIds.map((id) => ({
    params: { id: `${id}` },
  }))

  return {
    paths: paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const school = schools.find((s) => s.school_id === params.id)

  return {
    props: {
      school,
    },
  }
}

School.propTypes = {
  school: schoolShape,
}
