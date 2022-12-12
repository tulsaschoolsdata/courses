import React from 'react'
import PropTypes from 'prop-types'
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
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { courses } from '/lib/models'
import SortableTable from '/components/sortable-table'

function CustomPagination() {
  const apiRef = useGridApiContext()
  const page = useGridSelector(apiRef, gridPageSelector)
  const pageCount = useGridSelector(apiRef, gridPageCountSelector)

  return (
    <Pagination
      color="primary"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  )
}

export default function Courses({ courses }) {
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
    { field: 'course_department_name', headerName: 'Department', width: 130 },
    { field: 'course_name', headerName: 'Course Name', width: 230 },
    { field: 'course_credit_type', headerName: 'Credit Type', width: 130 },
    {
      field: 'courses_credit_hours',
      type: 'number',
      headerName: 'Credit Hours',
    },
  ]

  return (
    <>
      <Typography variant="h1" color="inherit" noWrap>
        Courses Data Grid
      </Typography>

      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          getRowId={(row) => row.course_number}
          rows={courses}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          components={{
            Toolbar: GridToolbar,
            Pagination: CustomPagination,
          }}
        />
      </Box>
      <SortableTable columns={columns} rows={courses}/>
    </>
  )
}

Courses.propTypes = {
  courses: PropTypes.arrayOf(courseShape),
  departments: PropTypes.arrayOf(PropTypes.string.isRequired),
}

export async function getStaticProps() {
  return {
    props: {
      courses,
    },
  }
}
