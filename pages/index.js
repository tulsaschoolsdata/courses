import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Course from './course/show'
import CourseCard from './course/card'
import createTheme from '@mui/material/styles/CreateTheme'
import CssBaseline from '@mui/material/CssBaseline'
import Filters from '../lib/filters'
import Footer from './footer'
import Fuse from 'fuse.js'
import Grid from '@mui/material/Grid'
import PageContainer from './shared/page-container'
import PropTypes from 'prop-types'
import SchoolIcon from '@mui/icons-material/School'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { courseShape, departmentShape } from '../lib/prop-types'

const theme = createTheme()

export default function Courses({ courses, departments, schools }) {
  const [filters, setFilters] = useState({
    departments: [],
    schools: [],
    search: ''
  })
  const [filteredCourses, setFilteredCourses] = useState(courses)
  const [showCourse, setShowCourse] = useState(null)

  const handleChange = (attribute, val) => {
    const newFilters = {...filters, [attribute]: val}
    setFilters(newFilters)
    localStorage.setItem('courseCatalogFilters', JSON.stringify(newFilters))
  }

  const clearFilters = () => {
    setFilters({
      departments: [],
      schools: [],
      search: ''
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

    if (filters.departments.length > 0) {
      output = output.filter(course => filters.departments.includes(course.department))
    }

    if (filters.schools.length > 0) {
      output = output.filter(course => filters.schools.includes(course.school_name))
    }

    if (filters.search) {
      const options = {
        keys: [
          "course_name",
          "description"
        ]
      }
      const fuse = new Fuse(output, options)
      const searchResults = fuse.search(filters.search)
      output = searchResults.map(result => result.item)
    }

    setFilteredCourses(output)
  }, [filters])

  const hideCourse = () => {
    setShowCourse(null)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <SchoolIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Course Catalog - Tulsa Public Schools
          </Typography>
        </Toolbar>
      </AppBar>
      <PageContainer>
        {showCourse ? (
          <Course
            course={showCourse}
            onHide={hideCourse}
          />
        ) : (
          <Grid container spacing={2} direction="row">
            <Grid item xs={12} sm={4}>

              <Filters clearFilters={clearFilters} departments={departments} filters={filters} schools={schools} handleChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={8}>
              {filteredCourses.map((course) => (
                <Grid item key={course.tps_course_number} xs={12} sm={6} sx={{ p: 2, display: 'inline-block' }}>
                  <CourseCard course={course} setShowCourse={setShowCourse} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
      </PageContainer>
      <Footer />
    </ThemeProvider>
  )
}

Courses.propTypes = {
  courses: PropTypes.arrayOf(courseShape),
  departments: PropTypes.arrayOf(departmentShape),
  schools: PropTypes.arrayOf(PropTypes.string.isRequired)
}

export async function getStaticProps() {
  const courses = [...Array(10).keys()].map(n => (
    {
      course_name: `Course ${n}`,
      prerequisites: `Course ${n - 1} must be taken before this course.`,
      credit_types: 'ELEC;WFC',
      state_course_number: `${n}`,
      tps_course_number: `${n}${String.fromCharCode(65+Math.floor(Math.random() * 2))}`,
      credit_hours: '0.5',
      description: `Course ${n} description goes here. Course ${n} description goes here. Course ${n} description goes here. Course ${n} description goes here.`,
      course_notes: `Course ${n} notes go here.`,
      school_name: `School ${n}`,
      department: ['Math', 'Reading', 'History', 'Science', 'Art', 'PE', 'Music'][Math.floor(Math.random() * 6)]
    }
  ))

  const departments = ['Math', 'Reading', 'History', 'Science', 'Art', 'PE', 'Music'].map(d => (
    {
      name: d,
      description: 'Description goes here.'
    }
  ))
  
  const schools = [...new Set(courses.map(course => course.school_name))]

  return {
    props: {
      courses,
      departments,
      schools,
    }
  }
}
