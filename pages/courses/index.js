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
import { courses, departments, schoolsGroupByCategory } from '/lib/models'
import { courseShape } from '/lib/prop-types'
import HeaderWithRecordCount from '/components/HeaderWithRecordCount'
import Head from 'next/head'

export default function Courses({ courses, departments, schools }) {
  const largeScreen = useMediaQuery('(min-width:600px)')
  const [filters, setFilters] = useState({
    creditType: '',
    departments: [],
    schools: [],
    search: '',
  })

  const [filteredCourses, setFilteredCourses] = useState(courses)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const handleChange = (attribute, val) => {
    const newFilters = { ...filters, [attribute]: val }
    setFilters(newFilters)
    localStorage.setItem('courseCatalogFilters', JSON.stringify(newFilters))
  }

  const clearFilters = () => {
    setFilters({
      creditType: '',
      departments: [],
      schools: [],
      search: '',
    })
    localStorage.removeItem('courseCatalogFilters')
  }

  useEffect(() => {
    const existingFilters = localStorage.getItem('courseCatalogFilters')
    if (existingFilters) {
      setFilters(JSON.parse(existingFilters))
    }
  }, [])

  useEffect(() => {
    let output = courses

    if (filters.creditType != '') {
      output = output.filter((course) =>
        course.credit_types.includes(filters.creditType)
      )
    }

    if (filters.schools?.length > 0) {
      output = output.filter(
        (course) =>
          course.school_numbers.filter((id) => filters.schools.includes(id))
            .length > 0
      )
    }

    if (filters.search != '') {
      const options = {
        keys: ['name', 'department', 'description'],
      }
      const fuse = new Fuse(output, options)
      const searchResults = fuse.search(filters.search)
      output = searchResults.map((result) => result.item)
    }

    setFilteredCourses(output)
  }, [filters, courses])

  const MetaTags = () => (
    <Head>
      <title>Courses offered by Tulsa Public Schools</title>
      <meta
        name="description"
        content="A listing of courses offered by Tulsa Public Schools"
      />
    </Head>
  )

  const filterCount =
    (filters.search != '' ? 1 : 0) +
    filters.schools.length +
    (filters.creditType ? 1 : 0)

  return (
    <>
      <MetaTags />
      <HeaderWithRecordCount title="Courses" records={filteredCourses} />

      <Grid container spacing={2}>
        {filteredCourses.map((course) => (
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
            clearFilters={clearFilters}
            departments={departments}
            filters={filters}
            handleChange={handleChange}
            setFiltersOpen={setFiltersOpen}
            schools={schools}
          />
        </Drawer>
      )}

      {!filtersOpen && (
        <Fab
          sx={{ position: 'fixed', bottom: '2%', right: '2%' }}
          onClick={() => setFiltersOpen(true)}
          variant="extended"
          color="warning"
        >
          <FilterListIcon />
          Filters ({filterCount})
        </Fab>
      )}
    </>
  )
}

Courses.propTypes = {
  courses: PropTypes.arrayOf(courseShape),
  departments: PropTypes.arrayOf(PropTypes.string),
  schools: PropTypes.array.isRequired,
}

export async function getStaticProps() {
  const schools = Object.entries(schoolsGroupByCategory)

  return {
    props: {
      courses,
      departments,
      schools,
    },
  }
}
