import React from 'react'
import Grid from '@mui/material/Grid'
import CourseCard from '/components/courseCard'
import Fuse from 'fuse.js'
import { courses as allCourses } from '/lib/models'
import HeaderWithRecordCount from '/components/HeaderWithRecordCount'
import Head from 'next/head'
import {
  useQueryParams,
  ArrayParam,
  StringParam,
  withDefault,
} from 'use-query-params'

export default function SearchResults({courses}) {
  const [filters, _] = useQueryParams({
    schools: withDefault(ArrayParam, []),
    search: withDefault(StringParam, ''),
    creditType: withDefault(StringParam, ''),
  })

  const hasFilters =
    filters.search !== '' ||
    filters.creditType !== '' ||
    filters.schools.length > 0

  let searchResults = hasFilters ? courses : []

  if (filters.creditType != '') {
    searchResults = searchResults.filter((course) =>
      course.credit_types.includes(filters.creditType)
    )
  }

  if (filters.schools?.length > 0) {
    searchResults = searchResults.filter(
      (course) =>
        course.school_numbers.filter((id) => filters.schools.includes(id))
          .length > 0
    )
  }

  if (filters.search != '') {
    const options = {
      keys: [
        { name: 'name', weight: 75 },
        { name: 'description', weight: 5 },
      ],
      useExtendedSearch: true,
      threshold: 0.2,
    }
    const fuse = new Fuse(searchResults, options)
    const fuseResults = fuse.search(filters.search)
    searchResults = fuseResults.map((result) => result.item)
  }

  const results = searchResults

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
      <HeaderWithRecordCount title="Search" records={results.length} />

      <Grid container spacing={2}>
        {results.map((course) => (
          <Grid key={course.course_number} item xs={12} sm={6}>
            <CourseCard course={course} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}

export async function getStaticProps() {
  const courses = allCourses

  return {
    props: {
      courses,
    },
  }
}
