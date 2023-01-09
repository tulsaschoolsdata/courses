import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Head from 'next/head'
import { truncate } from 'lodash'
import { schools, courses as allCourses } from '/lib/models'
import { schoolShape } from '/lib/prop-types'
import CourseCard from '/components/courseCard'
import { schoolFindById } from '/lib/models'
import HeaderWithRecordCount from '/components/HeaderWithRecordCount'
import FilterListIcon from '@mui/icons-material/FilterList'
import Fab from '@mui/material/Fab'
import Filters from '/lib/filters'
import Drawer from '@mui/material/Drawer'
import { useMediaQuery } from '@mui/material'
import Fuse from 'fuse.js'

export default function School({ school, courses }) {
  const largeScreen = useMediaQuery('(min-width:600px)')
  const [filters, setFilters] = useState({
    creditType: '',
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

  const filterCount =
    (filters.search != '' ? 1 : 0) +
    filters.schools.length +
    (filters.creditType ? 1 : 0)

  return (
    <>
      <Head>
        <title>{`${school.name} Courses - Tulsa Public Schools`}</title>
        <meta
          name="description"
          content={truncate(
            `Course Catalog for ${school.name} in Tulsa, Oklahoma`,
            { length: 155 }
          )}
        />
      </Head>

      <Typography component="h1" variant="h3" sx={{ pb: 4 }}>
        {school.name}
      </Typography>

      <HeaderWithRecordCount title="Courses" records={courses} />

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
            filters={filters}
            handleChange={handleChange}
            setFiltersOpen={setFiltersOpen}
            hideSchools={true}
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

export async function getStaticPaths() {
  const schoolIds = schools.map((s) => s.school_number)

  const paths = schoolIds.map((id) => ({
    params: { id: `${id}` },
  }))

  return {
    paths: paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const school = schoolFindById(params.id)
  const course_ids = school.course_numbers
  const courses = allCourses.filter((c) => course_ids.includes(c.course_number))

  return {
    props: {
      school,
      courses,
    },
  }
}

School.propTypes = {
  school: schoolShape,
}
