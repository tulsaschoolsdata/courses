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
      field: 'school_id',
      renderCell: (cellValues) => {
        return (
          <Link href={`/schools/${cellValues.row.school_id}`}>
            {cellValues.row.school_id}
          </Link>
        )
      },
      headerName: 'id',
      width: 70,
    },
    { field: 'school_category_name', headerName: 'Type', width: 60 },
    { field: 'school_name', headerName: 'School', width: 430 },
  ]

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <Typography variant="h1" color="inherit" noWrap>
        Schools
      </Typography>

      <DataGridTable
        getRowId={(row) => row.school_id}
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
