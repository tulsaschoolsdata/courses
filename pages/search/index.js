import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import ListSubheader from '@mui/material/ListSubheader'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import {
  creditTypes,
  schoolsWhereCategoryCode,
  schoolFindById,
} from '/lib/models'
import { useRouter } from 'next/router'
import { coerceIntoArray, coerceIntoString } from '/lib/utils'

export default function Search() {
  const [showSchoolSelector, setShowSchoolSelector] = useState(false)
  const [showCreditTypeSelector, setShowCreditTypeSelector] = useState(false)
  const router = useRouter()
  const queryParams = router.query

  const defaultFilters = {
    schools: [],
    search: '',
    creditType: '',
    courseNumbers: '',
  }

  const [filters, setFilters] = useState(defaultFilters)

  const schoolCategories = {
    73700: 'Early Childhood',
    35200: 'Elementary',
    35201: 'Middle',
    35202: 'Junior',
    35203: 'High',
    null: 'Not Specified',
  }

  const handleChange = (attribute, val) => {
    const newFilters = { ...filters, [attribute]: val }
    setFilters(newFilters)
    const route = {
      pathname: '/search',
      query: newFilters,
    }
    router.push(route)
  }

  const isChecked = (filterType, val) => {
    return filters[filterType]?.includes(val)
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

  const handleSchoolChangeAndClose = (schoolId) => {
    handleSchoolChange(schoolId)
    setShowSchoolSelector(false)
  }

  const handleCreditTypeChangeAndClose = (creditType) => {
    handleChange('creditType', creditType)
  }

  const clearFilters = () => {
    setFilters(defaultFilters)
    const route = {
      pathname: '/search',
      query: defaultFilters,
    }
    router.replace(route)
  }

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
            onClick={(_) => handleSchoolChangeAndClose(school.school_number)}
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

  const submitForm = (event) => {
    event.preventDefault()
    const route = {
      pathname: '/search/results',
      query: {
        search: filters.search,
        creditType: filters.creditType,
        schools: filters.schools,
        courseNumbers: filters.courseNumbers,
      },
    }
    router.push(route)
  }

  useEffect(() => {
    setFilters({
      schools: coerceIntoArray(queryParams.schools),
      search: coerceIntoString(queryParams.search),
      creditType: coerceIntoString(queryParams.creditType),
      courseNumbers: coerceIntoString(queryParams.courseNumbers),
    })
  }, [queryParams])

  return (
    <form onSubmit={submitForm}>
      <Stack spacing={2} sx={{ p: 2, pt: 2 }} data-test="searchForm">
        <Typography variant="h6">Search</Typography>
        <TextField
          id="search"
          label="Course name or description"
          variant="outlined"
          value={filters.search}
          onChange={(val) => handleChange('search', val.target.value)}
        />
        {
          <FormControl fullWidth>
            <InputLabel>Select school(s)</InputLabel>
            <Select
              sx={{ maxHeight: 500, position: 'relative' }}
              multiple
              open={showSchoolSelector}
              onOpen={() => setShowSchoolSelector(true)}
              onClose={() => setShowSchoolSelector(false)}
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
              <Grid
                container
                component={ListSubheader}
                justifyContent="flex-end"
              >
                <Button
                  variant="outlined"
                  onClick={() => {
                    handleChange('schools', [])
                  }}
                  sx={{ mr: 1 }}
                >
                  Clear
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    setShowSchoolSelector(false)
                  }}
                >
                  Close
                </Button>
              </Grid>
              {Object.entries(schoolCategories)
                .filter((category) => ['Middle', 'High'].includes(category[1]))
                .map((category) => renderMenuOptionsForCategory(category))}
            </Select>
          </FormControl>
        }
        <FormControl fullWidth>
          <InputLabel>Select credit type</InputLabel>
          <Select
            sx={{ maxHeight: 500 }}
            open={showCreditTypeSelector}
            onOpen={() => setShowCreditTypeSelector(true)}
            onClose={() => setShowCreditTypeSelector(false)}
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
            <Grid container component={ListSubheader} justifyContent="flex-end">
              <Button
                variant="outlined"
                onClick={() => {
                  handleChange('creditType', '')
                }}
                sx={{ mr: 1 }}
              >
                Clear
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setShowCreditTypeSelector(false)
                }}
              >
                Close
              </Button>
            </Grid>
            {creditTypes.map((creditType) => (
              <MenuItem
                key={creditType[0]}
                value={creditType[0]}
                onClick={(_) => handleCreditTypeChangeAndClose(creditType[0])}
              >
                {creditType[1].name} ({creditType[0]})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <TextField
            rows={4}
            multiline
            label="Course number(s)"
            aria-label="A list of course number(s)"
            placeholder=""
            value={filters.courseNumbers}
            style={{ width: '100%' }}
            onChange={(val) => handleChange('courseNumbers', val.target.value)}
          />
        </FormControl>
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Submit
        </Button>
        <Button variant="outlined" onClick={() => clearFilters()}>
          Clear Filters
        </Button>
      </Stack>
    </form>
  )
}
