import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Course from './course/show'
import CourseCard from './course/card'
import createTheme from '@mui/material/styles/CreateTheme'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import Link from '@mui/material/Link'
import MenuItem from '@mui/material/MenuItem'
import PropTypes from 'prop-types'
import SchoolIcon from '@mui/icons-material/School'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

function LearnMore() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      <Link
        color="inherit"
        href="https://www.tulsaschools.org/about"
        target="_blank"
      >Click here</Link> to learn more about TPS.
    </Typography>
  )
}

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link
        color="inherit"
        href="https://courses.tulsaschools.org/"
        target="_blank"
      >
        Tulsa Public Schools
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const theme = createTheme()

export default function Courses({ gradeLevels, courses, departments }) {
  const [filters, setFilters] = useState({
    gradeLevel: '',
    department: ''
  })
  const [filteredCourses, setFilteredCourses] = useState(courses)
  const [showCourse, setShowCourse] = useState(null)

  const handleOption = (attribute, val) => {
    const newFilters = {...filters, [attribute]: val}
    setFilters(newFilters)
    localStorage.setItem('courseCatalogFilters', JSON.stringify(newFilters))
  }

  const clearFilters = () => {
    setFilters({
      gradeLevel: '',
      department: ''
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

    if (filters.department) {
      output = output.filter(course => course.department === filters.department)
    }

    if (filters.gradeLevel) { // does not work on Kindergarten because of 0.
      output = output.filter(course => course.grade_levels.includes(filters.gradeLevel))
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
      <main>
        <Container
          maxWidth="md"
          sx={{
            bgcolor: 'background.paper',
            pt: 2,
            pb: 2
          }}
        >
          {showCourse ? (
            <Course
              course={showCourse}
              onHide={hideCourse}
            />
          ) : (
            <Grid container spacing={2} direction="row">
              <Grid item xs={12} sm={4}>
                <Stack spacing={1}>
                  <Typography variant="">Filters</Typography>
                  <FormControl fullWidth>
                    <InputLabel>Select a department</InputLabel>
                    <Select label="Select a department" value={filters.department} onChange={option => handleOption('department', option.target.value)}>
                      {departments.map(department => (
                        <MenuItem key={department.name} value={department.name}>{department.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>Select a grade level</InputLabel>
                    <Select label="Select a grade level" value={filters.gradeLevel} onChange={option => handleOption('gradeLevel', option.target.value)}>
                      {gradeLevels.map(gradeLevel => (
                        <MenuItem key={gradeLevel.label} value={gradeLevel.value}>{gradeLevel.label}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button onClick={() => clearFilters()}>Clear Filters</Button>
                </Stack>
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
        </Container>
      </main>

      <Box sx={{ bgcolor: 'background.paper', pt: 16, pb: 1 }} component="footer">
        <Divider />
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
        >
          <LearnMore />
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
        >
          <Copyright />
        </Typography>
      </Box>
    </ThemeProvider>
  )
}

// NOTE: Many of the following proptypes are guesses - will change based on source data.
Courses.propTypes = {
  gradeLevels: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    })
  ),
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      course_name: PropTypes.string.isRequired,
      prerequisites: PropTypes.string.isRequired,
      credit_types: PropTypes.string.isRequired,
      state_course_number: PropTypes.string.isRequired,
      tps_course_number: PropTypes.string.isRequired,
      credit_hours: PropTypes.string.isRequired,
      // advisory: PropTypes.string.isRequired, unclear on this one
      description: PropTypes.string.isRequired,
      course_notes: PropTypes.string.isRequired,
      grade_levels: PropTypes.arrayOf(PropTypes.number.isRequired),
      department: PropTypes.string.isRequired
    })
  ),
  departments: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    })
  )
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
      // advisory: PropTypes.string.isRequired, unclear on this one
      description: `Course ${n} description goes here. Course ${n} description goes here. Course ${n} description goes here. Course ${n} description goes here.`,
      course_notes: `Course ${n} notes go here.`,
      grade_levels: [Math.floor(Math.random() * 12)],
      department: ['Math', 'Reading', 'History', 'Science', 'Art', 'PE', 'Music'][Math.floor(Math.random() * 6)]
    }
  ))

  const departments = ['Math', 'Reading', 'History', 'Science', 'Art', 'PE', 'Music'].map(d => (
    {
      name: d,
      description: 'Description goes here.'
    }
  ))

  const gradeLevels = [
    { label: "pre-k (3)", value: -2 },
    { label: "pre-k", value: -1 },
    { label: "k", value: 0 },
    { label: "1st", value: 1 },
    { label: "2nd", value: 2 },
    { label: "3rd", value: 3 },
    { label: "4th", value: 4 },
    { label: "5th", value: 5 },
    { label: "6th", value: 6 },
    { label: "7th", value: 7 },
    { label: "8th", value: 8 },
    { label: "9th", value: 9 },
    { label: "10th", value: 10 },
    { label: "11th", value: 11 },
    { label: "12th", value: 12 }
  ]

  return {
    props: {
      courses,
      departments,
      gradeLevels
    }
  }
}
