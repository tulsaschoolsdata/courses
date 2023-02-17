import { isNull, toInteger, sortBy, isEmpty } from 'lodash'
import data from '/data/courses.json'
import instructionLevels from '/data/instruction_levels.json'
import Fuse from 'fuse.js'
import { coerceIntoArray, coerceIntoString } from '/lib/utils'

export const courses = sortBy(
  Object.values(data)
    .filter(
      (course) =>
        !isNull(course.alt_course_number) &&
        toInteger(course.course_number) >= 20000 &&
        !course.credit_types.includes('STOREDGRADEDEL')
    )
    .map((course) => ({
      ...course,
      instruction_level_name: instructionLevels[course.instruction_level]?.name,
    })),
  'name'
)

const filterByCourseNumbers = (courseNumbers, courses) => {
  if (!isEmpty(courseNumbers)) {
    return courses.filter((course) =>
      courseNumbers.includes(course.course_number)
    )
  } else {
    return courses
  }
}

const filterByCreditType = (creditType, courses) => {
  if (!isEmpty(creditType)) {
    return courses.filter((course) => course.credit_types.includes(creditType))
  } else {
    return courses
  }
}

const filterBySchoolId = (schoolId, courses) => {
  if (!isEmpty(schoolId)) {
    return courses.filter(
      (course) =>
        course.school_numbers.filter((id) => schoolId.includes(id)).length > 0
    )
  } else {
    return courses
  }
}

const filterBySearchTerm = (searchTerm, courses) => {
  if (!isEmpty(searchTerm)) {
    const options = {
      keys: [
        { name: 'name', weight: 75 },
        { name: 'description', weight: 5 },
      ],
      useExtendedSearch: true,
      threshold: 0.2,
    }
    const fuse = new Fuse(courses, options)
    const fuseResults = fuse.search(searchTerm)
    return fuseResults.map((result) => result.item)
  } else {
    return courses
  }
}

export const searchByQueryParams = (queryParams, courses) => {
  const courseNumbersStringToArray = (courseNumbers) =>
    courseNumbers?.split(/\s+|,|\|/).filter((val) => val.match(/\d+/))

  const searchTerm = coerceIntoString(queryParams.search)
  const creditType = coerceIntoString(queryParams.creditType)
  const schools = coerceIntoArray(queryParams.schools)
  const courseNumbers = coerceIntoArray(
    courseNumbersStringToArray(queryParams.courseNumbers)
  )

  const hasFilters =
    [searchTerm, schools, creditType, courseNumbers].filter((n) => n.length > 0)
      .length > 0

  let searchResults = hasFilters ? courses : []

  searchResults = filterByCourseNumbers(courseNumbers, searchResults)
  searchResults = filterByCreditType(creditType, searchResults)
  searchResults = filterBySchoolId(schools, searchResults)
  searchResults = filterBySearchTerm(searchTerm, searchResults)

  return searchResults
}
