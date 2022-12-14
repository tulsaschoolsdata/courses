import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import DataGridTable from '../../components/datagrid-table'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import GridViewIcon from '@mui/icons-material/GridView'
import TableChartIcon from '@mui/icons-material/TableChart'
import Box from '@mui/material/Box'
import CourseCard from '/components/card'
import Drawer from '@mui/material/Drawer'
import Fab from '@mui/material/Fab'
import FilterListIcon from '@mui/icons-material/FilterList'
import Filters from '/lib/filters'
import Fuse from 'fuse.js'
import { useMediaQuery } from '@mui/material'
import { courses, departments, schoolsGroupByCategory } from '/lib/models'
import { courseShape } from '/lib/prop-types'
import Box from '@mui/material/Box'
import Pagination from '@mui/material/Pagination'
import {
  DataGrid,
  GridToolbar,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid'
import Link from 'next/link'

export default function Courses({ courses, departments, schools }) {
  const largeScreen = useMediaQuery('(min-width:600px)')
  const [tabOpen, setTabOpen] = useState('table')
  const [filters, setFilters] = useState({
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
      departments: [],
      schools: [],
      search: '',
    })
    localStorage.removeItem('courseCatalogFilters')
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
    { field: 'department', headerName: 'Department', width: 130 },
    { field: 'name', headerName: 'Course Name', width: 230 },
    {
      field: 'course_credit_type_name',
      headerName: 'Credit Type',
      width: 200,
      renderCell: (cellValues) => {
        if (cellValues.row.course_credit_type_name) {
          return cellValues.row.course_credit_type_name.map(
            (creditTypeName) => (
              <Chip
                key={creditTypeName}
                label={creditTypeName}
                sx={{ mr: 0.5 }}
              />
            )
          )
        } else {
          return null
        }
      },
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
  }, [filters, courses])

  return (
    <>
      <Grid container justifyContent={'space-between'} flexDirection={'row'}>
        <Grid item xs={9}>
          <Typography variant="h4" color="inherit" sx={{ pb: 2 }}>
            Courses
          </Typography>
        </Grid>
        <Grid item xs={3}>
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
      {tabOpen === 'table' ? (
        <DataGridTable
          getRowId={(row) => row.course_number}
          rows={filteredCourses}
          columns={columns}
          pageSize={10}
        />
      ) : (
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
            filters.schools.length}
          )
        </Fab>
      )}
      </Box>
    </>
  )
}

Courses.propTypes = {
  courses: PropTypes.arrayOf(courseShape),
  departments: PropTypes.arrayOf(PropTypes.string.isRequired),
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
