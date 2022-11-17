import React from 'react'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import PropTypes from 'prop-types'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

export default function Filters({ clearFilters, departments, filters, handleChange, schools }) {
  return (
    <Stack spacing={1}>
      <Typography variant="">Filters</Typography>
      <TextField id="search" label="Search" variant="outlined" value={filters.search} onChange={val => handleChange('search', val.target.value)} />
      <FormControl fullWidth>
        <InputLabel>Select department(s)</InputLabel>
        <Select
          multiple
          label="Select department(s)"
          value={filters.departments}
          onChange={option => handleChange('departments', option.target.value)}
          renderValue={(selected) => selected.map(s => <Chip sx={{ marginRight: 0.5 }}label={s} />)}
        >
          {departments.map(department => (
            <MenuItem key={department.name} value={department.name}>{department.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Select school(s)</InputLabel>
        <Select
          multiple
          label="Select school(s)"
          value={filters.schools}
          onChange={option => handleChange('schools', option.target.value)}
          renderValue={(selected) => selected.map(s => <Chip sx={{ marginRight: 0.5 }}label={s} />)}
        >
          {schools.map(school => (
            <MenuItem key={school} value={school}>{school}</MenuItem>
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
  handleChange: PropTypes.func.isRequired,
  schools: PropTypes.array.isRequired,
}
