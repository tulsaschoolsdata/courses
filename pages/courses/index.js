import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Grid from '@mui/material/Grid'
import CourseCard from '/components/courseCard'
import Drawer from '@mui/material/Drawer'
import Fab from '@mui/material/Fab'
import FilterListIcon from '@mui/icons-material/FilterList'
import Filters from '/lib/filters'
import Fuse from 'fuse.js'
import { useMediaQuery } from '@mui/material'
import { courses, schoolsGroupByCategory } from '/lib/models'
import { courseShape } from '/lib/prop-types'
import HeaderWithRecordCount from '/components/HeaderWithRecordCount'
import Head from 'next/head'
import {
  useQueryParams,
  ArrayParam,
  StringParam,
  withDefault,
} from 'use-query-params'

export default function Courses({ courses, schools }) {
  const largeScreen = useMediaQuery('(min-width:600px)')

  const MetaTags = () => (
    <Head>
      <title>Courses offered by Tulsa Public Schools</title>
      <meta
        name="description"
        content="A listing of courses offered by Tulsa Public Schools"
      />
    </Head>
  )

  return (
    <>
      <MetaTags />
      <HeaderWithRecordCount title="Courses" records={courses.length} />

      <Grid container spacing={2}>
        {courses.map((course) => (
          <Grid key={course.course_number} item xs={12} sm={6}>
            <CourseCard course={course} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

Courses.propTypes = {
  courses: PropTypes.arrayOf(courseShape),
  schools: PropTypes.array.isRequired,
}

export async function getStaticProps() {
  const schools = Object.entries(schoolsGroupByCategory)

  return {
    props: {
      courses,
      schools,
    },
  }
}
