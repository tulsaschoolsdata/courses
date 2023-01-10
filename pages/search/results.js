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
import { courses as allCourses, schoolsGroupByCategory } from '/lib/models'
import { courseShape } from '/lib/prop-types'
import HeaderWithRecordCount from '/components/HeaderWithRecordCount'
import Head from 'next/head'
import {
  useQueryParams,
  ArrayParam,
  StringParam,
  withDefault,
} from 'use-query-params'

export default function SearchResults() {
  const largeScreen = useMediaQuery('(min-width:600px)')
  const schools = Object.entries(schoolsGroupByCategory)

  const [filteredCourses, setFilteredCourses] = useState([])
  const [filtersOpen, setFiltersOpen] = useState(false)

  const [filters, setFilters] = useQueryParams({
    schools: withDefault(ArrayParam, []),
    search: withDefault(StringParam, ''),
    creditType: withDefault(StringParam, ''),
  })

  const handleChange = (attribute, val) => {
    const newFilters = { ...filters, [attribute]: val }
    setFilters(newFilters)
  }

  // const clearFilters = () => {
  //   setFilters({
  //     creditType: '',
  //     schools: [],
  //     search: '',
  //   })
  // }

  const hasFilters =
    filters.search !== '' ||
    filters.creditType !== '' ||
    filters.schools.length > 0

  let searchResults = hasFilters ? allCourses : []

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
      keys: ['name', 'description'],
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

      {filtersOpen && (
        <Drawer
          hideBackdrop
          open={filtersOpen}
          sx={{
            'flexShrink': 0,
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: largeScreen ? '45%' : '100%',
            },
          }}
          variant="persistent"
          anchor="right"
        >
          <Filters
            filters={filters}
            handleChange={handleChange}
            setFiltersOpen={setFiltersOpen}
            schools={schools}
          />
        </Drawer>
      )}
    </>
  )
}

// SearchResults.propTypes = {
//   courses: PropTypes.arrayOf(courseShape),
// }

export async function getStaticProps() {
  return {
    props: {},
  }
}
