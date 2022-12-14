import React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { schools } from '/lib/models'
import { schoolShape } from '/lib/prop-types'
import DataGridTable from '/components/datagrid-table'

export default function Schools({ schools }) {
  const columns = [
    {
      field: 'school_number',
      renderCell: (cellValues) => {
        return (
          <Link href={`/schools/${cellValues.row.school_number}`}>
            {cellValues.row.school_number}
          </Link>
        )
      },
      headerName: 'id',
      width: 70,
    },
    { field: 'school_category_name', headerName: 'Category', width: 60 },
    { field: 'name', headerName: 'School', width: 430 },
  ]

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <Typography variant="h4" color="inherit" sx={{ pb: 2 }}>
        Schools
      </Typography>

      <DataGridTable
        getRowId={(row) => row.school_number}
        rows={schools}
        columns={columns}
        pageSize={100}
      />
    </Box>
  )
}

Schools.propTypes = {
  schools: PropTypes.arrayOf(schoolShape),
}

export async function getStaticProps() {
  return {
    props: {
      schools,
    },
  }
}
