import React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Pagination from '@mui/material/Pagination'
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid'

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

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  )
}

export default function DataGridTable({ getRowId, rows, columns, pageSize }) {
  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        getRowId={getRowId}
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[pageSize]}
        disableSelectionOnClick
        components={{
          Toolbar: CustomToolbar,
          Pagination: CustomPagination,
        }}
      />
    </Box>
  )
}

DataGridTable.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array,
  pageSize: PropTypes.number,
}

export async function getStaticProps() {
  return {
    props: {
      getRowId,
      rows,
      columns,
      pageSize,
    },
  }
}
