import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'
import DataGridTable from '../../components/datagrid-table'
import Drawer from '@mui/material/Drawer'
import Fab from '@mui/material/Fab'
import FilterListIcon from '@mui/icons-material/FilterList'
import Filters from '/lib/filters'
import Fuse from 'fuse.js'
import { useMediaQuery } from '@mui/material'
import {
  courses,
  departments,
  schoolsGroupByCategory,
  schoolNumbersToNames,
} from '/lib/models'
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

  const columns = [
    {
      field: 'course_number',
      type: 'number',
      headerName: 'Course #',
      width: 70,
    },
    { field: 'alt_course_number', headerName: 'Alt Course #', width: 70 },
    { field: 'name', headerName: 'Course Name', width: 230 },
    { field: 'instruction_level_name', headerName: 'Level', width: 170 },
    { field: 'department', headerName: 'department', width: 230 },
    {
      field: 'credit_types',
      headerName: 'Credit Type',
      valueGetter: (params) => String(params.row.credit_types),
      width: 200,
    },
    {
      field: 'credit_hours',
      type: 'number',
      headerName: 'Credit Hours',
    },
    { field: 'pre_req_note', headerName: 'Pre Req', width: 230 },
    { field: 'description', headerName: 'Description', width: 230 },
    {
      field: 'schools',
      headerName: 'Schools',
      valueGetter: (params) =>
        String(schoolNumbersToNames(params.row.school_numbers)),
      width: 530,
    },
  ]

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
        Courses
      </Typography>

      <DataGridTable
        getRowId={(row) => row.course_number}
        rows={filteredCourses}
        columns={columns}
        pageSize={20}
      />

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
