import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import CourseCard from '/components/card'
import catalog from '/data/catalog.json'
import Drawer from '@mui/material/Drawer'
import Fab from '@mui/material/Fab'
import FilterListIcon from '@mui/icons-material/FilterList'
import Filters from '/lib/filters'
import Fuse from 'fuse.js'
import PropTypes from 'prop-types'
import { courseShape, schoolShape } from '/lib/prop-types'
import { groupBy, sortBy } from 'lodash'
import { useMediaQuery } from '@mui/material'
import { schoolsGroupByCategory } from '/lib/models/school'
import { courses } from '/lib/models/course'
import { departments } from '/lib/models/department'

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
        filters.departments.includes(course.course_department_name)
      )
    }

    if (filters.schools?.length > 0) {
      output = output.filter(
        (course) =>
          course.school_ids.filter((id) => filters.schools.includes(id))
            .length > 0
      )
    }

    if (filters.search) {
      const options = {
        keys: ['course_name', 'course_department_name', 'course_description'],
      }
      const fuse = new Fuse(output, options)
      const searchResults = fuse.search(filters.search)
      output = searchResults.map((result) => result.item)
    }

    setFilteredCourses(output)
  }, [filters])

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
  departments: PropTypes.arrayOf(PropTypes.string.isRequired),
  schools: PropTypes.array.isRequired,
}

export async function getStaticProps() {
  const creditTypes = catalog['course_credit_types']
  const categories = catalog['school_categories']
  const schools = Object.entries(schoolsGroupByCategory)
  debugger;

  return {
    props: {
      courses,
      departments,
      schools,
    },
  }
}

