import React from 'react'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import PropTypes from 'prop-types'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

export default function Filters({ clearFilters, departments, filters, gradeLevels, handleChange }) {
  return (
    <Stack spacing={1}>
      <Typography variant="">Filters</Typography>
      <TextField id="search" label="Search" variant="outlined" value={filters.search} onChange={val => handleChange('search', val.target.value)} />
      <FormControl fullWidth>
        <InputLabel>Select a department</InputLabel>
        <Select label="Select a department" value={filters.department} onChange={option => handleChange('department', option.target.value)}>
          {departments.map(department => (
            <MenuItem key={department.name} value={department.name}>{department.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Select a grade level</InputLabel>
        <Select label="Select a grade level" value={filters.gradeLevel} onChange={option => handleChange('gradeLevel', option.target.value)}>
          {gradeLevels.map(gradeLevel => (
            <MenuItem key={gradeLevel.label} value={gradeLevel.value}>{gradeLevel.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button onClick={() => clearFilters()}>Clear Filters</Button>
    </Stack>
  )
}

Filters.propTypes = {
  clearFilters: PropTypes.func.isRequired,
  departments: PropTypes.array.isRequired,
  filters: PropTypes.object.isRequired,
  gradeLevels: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired
}
