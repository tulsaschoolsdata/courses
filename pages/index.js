import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import Link from '@mui/material/Link'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import SchoolIcon from '@mui/icons-material/School'

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

export default function Courses({ categories, courses, departments }) {
  const [filters, setFilters] = useState({
    category: '',
    department: ''
  })

  const handleOption = (attribute, val) => {
    const newFilters = {...filters, [attribute]: val}
    setFilters(newFilters)
    localStorage.setItem('courseCatalogFilters', JSON.stringify(newFilters))
  }

  const clearFilters = () => {
    setFilters({
      category: '',
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
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 2,
            pb: 2
          }}
        />
        <Container maxWidth="md">
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
                  <InputLabel>Select a school category</InputLabel>
                  <Select label="Select a school category" value={filters.category} onChange={option => handleOption('category', option.target.value)}>
                    {categories.map(category => (
                      <MenuItem key={category} value={category}>{category}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button onClick={() => clearFilters()}>Clear Filters</Button>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={8}>
            {courses.map((course) => (
              <Grid item key={course.number}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    image={course.url}
                    alt="random"
                    height={50}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {course.name}
                    </Typography>
                    <Typography>
                      {course.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
            </Grid>
          </Grid>
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

Courses.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string.isRequired),
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired
    })
  ),
  departments: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired
    })
  )
}

export async function getStaticProps() {
  const categories = ['Early Childhood', 'Elementary', 'Middle', 'High']

  const courses = [...Array(10).keys()].map(n => (
    {
      name: `Course ${n}`,
      description: `Course ${n} description goes here.`,
      number: n,
      url: 'https://source.unsplash.com/random'
    }
  ))

  const departments = [...Array(4).keys()].map(n => (
    {
      name: `Department ${n}`,
      description: `Department ${n} description goes here.`,
      number: n,
    }
  ))

  return {
    props: {
      categories,
      courses,
      departments
    }
  }
}
