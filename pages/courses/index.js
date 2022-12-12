import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { courseShape } from '/lib/prop-types'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { courses } from '/lib/models'
import DataGridTable from '../../components/datagrid-table'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import GridViewIcon from '@mui/icons-material/GridView'
import TableChartIcon from '@mui/icons-material/TableChart'

export default function Courses({ courses }) {
  const [view, setView] = useState('table')

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
      <Grid container justifyContent={'space-between'} flexDirection={'row'}>
        <Grid item xs={9}>
          <Typography variant="h4" color="inherit" sx={{ pb: 2 }}>
            Courses
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Tabs value={view} onChange={(_e, val) => setView(val)} sx={{ cursor: 'pointer' }}>
            <Tab label={<><TableChartIcon /> Table</>} value={'table'} />
            <Tab label={<><GridViewIcon /> Grid</>} value={'grid'} />
          </Tabs>
        </Grid>
      </Grid>
      {view === 'table' ? (
        <DataGridTable
          getRowId={(row) => row.course_number}
          rows={courses}
          columns={columns}
          pageSize={10}
        />
      ) : (
        "Grid view of courses goes here."
      )}
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
