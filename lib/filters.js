import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import ListSubheader from '@mui/material/ListSubheader'
import MenuItem from '@mui/material/MenuItem'
import PropTypes from 'prop-types'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import {
  creditTypes,
  schoolsWhereCategoryCode,
  schoolFindById,
} from '/lib/models'

export default function Filters({
  clearFilters,
  filters,
  handleChange,
  setFiltersOpen,
  hideSchools = false,
}) {
  const [search, setSearch] = useState('')
  const [timer, setTimer] = useState(null)

  const schoolCategories = {
    73700: 'Early Childhood',
    35200: 'Elementary',
    35201: 'Middle',
    35202: 'Junior',
    35203: 'High',
    null: 'Not Specified',
  }

  const isChecked = (filterType, val) => {
    return filters[filterType].includes(val)
  }

  const debouncedSearch = (val) => {
    setSearch(val)
    clearTimeout(timer)

    setTimer(
      setTimeout(() => {
        handleChange('search', val)
      }, 500),
    )
  }

  const handleSchoolChange = (schoolId) => {
    let output = []
    const currentSchoolIds = filters.schools

    // manually managing selected schoolIds in School Selector due to <div> intercepting onChange event.
    // <div> required to list grouped school category and options
    if (currentSchoolIds.includes(schoolId)) {
      output = currentSchoolIds.filter((id) => id !== schoolId)
    } else {
      output = currentSchoolIds.concat(schoolId)
    }

    handleChange('schools', output)
  }

  useEffect(() => {
    if (filters.search) {
      setSearch(filters.search)
    } else {
      setSearch('')
    }
  }, [filters.search])

  const renderMenuOptionsForCategory = (category) => {
    const categoryCode = category[0]
    const categoryName = category[1]
    const schools = schoolsWhereCategoryCode(categoryCode)

    return (
      <div key={categoryName}>
        <ListSubheader key={categoryName}>{categoryName}</ListSubheader>
        {schools.map((school) => (
          <MenuItem
            key={school.name}
            value={school.school_number}
            onClick={(_) => handleSchoolChange(school.school_number)}
          >
            <Checkbox checked={isChecked('schools', school.school_number)} />
            {school.name}
          </MenuItem>
        ))}
      </div>
    )
  }

  const getLabel = (selected) => {
    const match = creditTypes.find((type) => type[0] === selected)
    return match[1].code
  }

  return (
    <Stack spacing={2} sx={{ p: 2, paddingTop: '6em' }}>
      <Typography variant="h6">Filters</Typography>
      <TextField
        id="search"
        label="Search for a name or description"
        variant="outlined"
        value={search}
        onChange={(val) => debouncedSearch(val.target.value)}
      />
      {!hideSchools && (
        <FormControl fullWidth>
          <InputLabel>Select school(s)</InputLabel>
          <Select
            sx={{ maxHeight: 500 }}
            multiple
            label="Select school(s)"
            value={filters.schools}
            renderValue={(selected) =>
              selected.map((schoolId) => (
                <Chip
                  key={schoolId}
                  sx={{ marginRight: 0.5 }}
                  label={schoolFindById(schoolId).name}
                />
              ))
            }
          >
            {Object.entries(schoolCategories)
              .filter((category) => ['Middle', 'High'].includes(category[1]))
              .map((category) => renderMenuOptionsForCategory(category))}
          </Select>
        </FormControl>
      )}
      <FormControl fullWidth>
        <InputLabel>Select credit type</InputLabel>
        <Select
          sx={{ maxHeight: 500 }}
          label="Select credit type"
          value={filters.creditType}
          renderValue={(selected) => (
            <Chip
              key={selected}
              sx={{ marginRight: 0.5 }}
              label={getLabel(selected)}
            />
          )}
        >
          {creditTypes.map((creditType) => (
            <MenuItem
              key={creditType[0]}
              value={creditType[0]}
              onClick={(_) => handleChange('creditType', creditType[0])}
            >
              {creditType[1].name} ({creditType[0]})
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setFiltersOpen(false)}
      >
        Done
      </Button>
      <Button variant="outlined" onClick={() => clearFilters()}>
        Clear Filters
      </Button>
    </Stack>
  )
}

Filters.propTypes = {
  clearFilters: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  setFiltersOpen: PropTypes.func.isRequired,
  schools: PropTypes.array,
  hideSchools: PropTypes.bool,
}
