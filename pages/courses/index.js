import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
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
import { isNull } from 'lodash'

export default function Courses({ courses, departments, schools }) {
  const largeScreen = useMediaQuery('(min-width:600px)')
  const [filters, setFilters] = useState({
    creditType: null,
    departments: [],
    is_core: null,
    is_vocational: null,
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
      creditType: null,
      departments: [],
      is_core: null,
      is_vocational: null,
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

    if (!isNull(filters.is_core)) {
      output = output.filter((course) => course.is_core === filters.is_core)
    }

    if (filters.creditType) {
      output = output.filter((course) =>
        course.credit_types.includes(filters.creditType)
      )
    }

    if (filters.departments?.length > 0) {
      output = output.filter((course) =>
        filters.departments.includes(course.course_department_name)
      )
    }

    if (filters.schools?.length > 0) {
      output = output.filter(
        (course) =>
          course.school_numbers.filter((id) => filters.schools.includes(id))
            .length > 0
      )
    }

    if (filters.search) {
      const options = {
        keys: ['name', 'department', 'description'],
      }
      const fuse = new Fuse(output, options)
      const searchResults = fuse.search(filters.search)
      output = searchResults.map((result) => result.item)
    }

    if (!isNull(filters.is_vocational)) {
      output = output.filter(
        (course) => course.is_vocational === filters.is_vocational
      )
    }

    setFilteredCourses(output)
  }, [filters, courses])

  return (
    <>
      <Typography variant="h4" color="inherit" sx={{ pb: 2 }}>
        {`${filteredCourses.length} Courses`}
      </Typography>

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
          Filters (
          {(filters.search ? 1 : 0) +
            filters.departments.length +
            filters.schools.length +
            (filters.creditType ? 1 : 0)}
          )
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
