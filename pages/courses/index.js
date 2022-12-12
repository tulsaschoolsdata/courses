import React from 'react'
import PropTypes from 'prop-types'
import { courseShape } from '/lib/prop-types'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { courses } from '/lib/models'
import DataGridTable from '../../components/datagrid-table'
import Chip from '@mui/material/Chip'

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
    {
      field: 'course_credit_type_name',
      headerName: 'Credit Type',
      width: 200,
      renderCell: (cellValues) => {
        if (cellValues.row.course_credit_type_name) {
          return cellValues.row.course_credit_type_name.map(creditTypeName => <Chip label={creditTypeName} sx={{ mr: 0.5 }} />)
        } else {
          return null
        }
      }
    },
    {
      field: 'courses_credit_hours',
      type: 'number',
      headerName: 'Credit Hours',
    },
  ]

  return (
    <>
      <Typography variant="h4" color="inherit" noWrap sx={{ pb: 2 }}>
        Courses
      </Typography>

      <DataGridTable
        getRowId={(row) => row.course_number}
        rows={courses}
        columns={columns}
        pageSize={10}
      />
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
