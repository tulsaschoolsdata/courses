import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import CourseCard from '/components/card'
import Drawer from '@mui/material/Drawer'
import Fab from '@mui/material/Fab'
import FilterListIcon from '@mui/icons-material/FilterList'
import Filters from '/lib/filters'
import Fuse from 'fuse.js'
import PropTypes from 'prop-types'
import { courseShape } from '/lib/prop-types'
import { useMediaQuery } from '@mui/material'
import { courses, departments, schoolsGroupByCategory } from '/lib/models'

export default function Courses({ courses, departments, schools }) {
  const largeScreen = useMediaQuery('(min-width:600px)')
  const [filters, setFilters] = useState({
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

    if (filters.departments?.length > 0) {
      output = output.filter((course) =>
        filters.departments.includes(course.department)
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
        keys: ['course_name', 'department', 'course_description'],
      }
      const fuse = new Fuse(output, options)
      const searchResults = fuse.search(filters.search)
      output = searchResults.map((result) => result.item)
    }

    setFilteredCourses(output)
  }, [filters, courses])

  return (
    <Box>
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
      <Box>
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
              filters.schools.length}
            )
          </Fab>
        )}
        <Box sx={{ marginRight: '0px' }}>
          {filteredCourses.map((course) => (
            <Box
              key={course.course_number}
              xs={12}
              sm={6}
              sx={{
                p: 1,
                display: 'inline-block',
                width: largeScreen ? '50%' : '100%',
              }}
            >
              <CourseCard course={course} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
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
