import React, { useEffect, useState } from 'react'
import CourseCard from '../components/card'
import data from './../courses.json'
import Filters from '../lib/filters'
import Fuse from 'fuse.js'
import Grid from '@mui/material/Grid'
import PropTypes from 'prop-types'
import { courseShape, schoolCourseShape, schoolShape } from '../lib/prop-types'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { sortBy, uniq } from 'lodash'

export default function Courses({ courses, departments, schoolCourses, schools }) {
  const [filters, setFilters] = useState({
    departments: [],
    schools: [],
    search: '',
  })

  const [parent] = useAutoAnimate()
  const [filteredCourses, setFilteredCourses] = useState(courses)

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
      const courseNumbers = schoolCourses.filter(course => filters.schools.includes(course.school_number)).map(course => course.course_number)
      output = output.filter((course) => courseNumbers.includes(course.number))
    }

    if (filters.search) {
      const options = {
        keys: ['name', 'description'],
      }
      const fuse = new Fuse(output, options)
      const searchResults = fuse.search(filters.search)
      output = searchResults.map((result) => result.item)
    }

    setFilteredCourses(output)
  }, [filters])

  return (
    <Grid container spacing={2} direction="row">
      <Grid item xs={12} sm={4}>
        <Filters
          clearFilters={clearFilters}
          departments={departments}
          filters={filters}
          schools={schools}
          handleChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={8} ref={parent}>
        {filteredCourses.map((course) => (
          <Grid
            item
            key={course.number}
            xs={12}
            sm={6}
            sx={{ p: 2, display: 'inline-block' }}
          >
            <CourseCard course={course} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}

Courses.propTypes = {
  courses: PropTypes.arrayOf(courseShape),
  departments: PropTypes.arrayOf(PropTypes.string.isRequired),
  schoolCourses: PropTypes.arrayOf(schoolCourseShape),
  schools: PropTypes.arrayOf(schoolShape)
}

export async function getStaticProps() {
  const courses = Object.values(data['courses'])

  const departments = sortBy(uniq(Object.values(data['courses']).filter(course => course.department !== null).map(course => course.department)))

  const schoolCourses = Object.values(data['school_courses'])

  const schools = sortBy(Object.values(data['schools']), 'name')

  return {
    props: {
      courses,
      departments,
      schoolCourses,
      schools
    },
  }
}

