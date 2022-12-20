import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import DataGridTable from '../../components/datagrid-table'
import Grid from '@mui/material/Grid'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import GridViewIcon from '@mui/icons-material/GridView'
import TableChartIcon from '@mui/icons-material/TableChart'
import CourseCard from '/components/courseCard'
import Drawer from '@mui/material/Drawer'
import Fab from '@mui/material/Fab'
import FilterListIcon from '@mui/icons-material/FilterList'
import Filters from '/lib/filters'
import Fuse from 'fuse.js'
import { useMediaQuery } from '@mui/material'
import { courses, departments, schoolsGroupByCategory } from '/lib/models'
import { courseShape } from '/lib/prop-types'
import { isArray } from 'lodash'

export default function Courses({ courses, departments, schools }) {
  const largeScreen = useMediaQuery('(min-width:600px)')
  const [tabOpen, setTabOpen] = useState('table')
  const [filters, setFilters] = useState({
    creditType: null,
    departments: [],
    schools: [],
    search: '',
  })

  const handleTabChange = (val) => {
    localStorage.setItem('preferredView', val)
    setTabOpen(val)
  }

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
      schools: [],
      search: '',
    })
    localStorage.removeItem('courseCatalogFilters')
  }

  const creditTypesToString = (credit_types) => {
    if (isArray(credit_types) && credit_types.length > 0) {
      return credit_types.join(',')
    } else {
      return ''
    }
  }

  const columns = [
    {
      field: 'course_number',
      renderCell: (cellValues) => {
        return (
          <Link href={`/courses/${cellValues.row.course_number}`}>
            {cellValues.row.course_number}
          </Link>
        )
      },
      type: 'number',
      headerName: 'Course #',
      width: 70,
    },
    { field: 'name', headerName: 'Course Name', width: 230 },
    {
      field: 'credit_types',
      headerName: 'Credit Type',
      valueGetter: (params) => creditTypesToString(params.row.credit_types),
      width: 200,
    },
    {
      field: 'credit_hours',
      type: 'number',
      headerName: 'Credit Hours',
    },
  ]

  useEffect(() => {
    const existingFilters = localStorage.getItem('courseCatalogFilters')
    if (existingFilters) {
      setFilters(JSON.parse(existingFilters))
    }

    const preferredView = localStorage.getItem('preferredView')
    if (preferredView) {
      setTabOpen(preferredView)
    }
  }, [])

  useEffect(() => {
    let output = courses

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

    setFilteredCourses(output)
  }, [filters, courses])

  return (
    <>
      <Grid container justifyContent={'space-between'} flexDirection={'row'}>
        <Grid item xs={12} md={9}>
          <Typography variant="h4" color="inherit" sx={{ pb: 2 }}>
            Courses
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Tabs
            value={tabOpen}
            onChange={(_e, val) => handleTabChange(val)}
            sx={{ cursor: 'pointer' }}
          >
            <Tab
              label={
                <>
                  <TableChartIcon /> Table
                </>
              }
              value={'table'}
            />
            <Tab
              label={
                <>
                  <GridViewIcon /> Grid
                </>
              }
              value={'grid'}
            />
          </Tabs>
        </Grid>
      </Grid>
      {tabOpen === 'DataGrid' ? (
        <DataGridTable
          getRowId={(row) => row.course_number}
          rows={filteredCourses}
          columns={columns}
          pageSize={20}
        />
      ) : (
        <>
          <Grid container spacing={2}>
            {filteredCourses.map((course) => (
              <Grid key={course.course_number} item xs={12} sm={6}>
                <CourseCard course={course} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
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
