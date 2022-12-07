import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
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
import { schools } from '/lib/models'
import { schoolShape } from '/lib/prop-types'

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

  // school_id: PropTypes.string.isRequired,
  // school_name: PropTypes.string.isRequired,
	// course_ids: PropTypes.array.isRequired,
  // school_category: PropTypes.number.isRequired

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
    { field: 'school_name', headerName: 'School', width: 130 },
    { field: 'school_category_name', headerName: 'Type', width: 130 },
  ]

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <Typography variant="h1" color="inherit" noWrap>
        Schools
      </Typography>

      <DataGrid
        getRowId={(row) => row.school_id}
        rows={schools}
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
  )
}

Schools.propTypes = {
  schools: PropTypes.arrayOf(schoolShape),
}

export async function getStaticProps() {
  debugger;
  return {
    props: {
      schools: schools,
    },
  }
}
