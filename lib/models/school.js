import schoolCategories from '/data/school_categories'
import schoolsJson from '/data/schools'
import { groupBy, sortBy } from 'lodash'

export const schools = sortBy(
  Object.values(schoolsJson)
    .map((school) => ({
      ...school,
      school_category_name:
        schoolCategories[school['category']]?.name || 'Inactive',
    }))
    .filter((school) => school.school_category_name !== 'Inactive'),
  'name'
)

export const schoolsGroupByCategory = groupBy(schools, 'category')

export const schoolNumbersToNames = (numbers) => {
  return schools
    .filter((school) => numbers.includes(school.school_number))
    .map((school) => school.name)
}

export const schoolsWhereCategoryCode = (categoryCode) => {
  const categories = schoolCategories || {}
  const category = categories[categoryCode]
  const school_numbers = category ? category['school_numbers'] : []

  return schools.filter((school) =>
    school_numbers.includes(school.school_number)
  )
}

export const schoolsWhereCourseNumber = (course_number) => {
  return schools.filter((school) =>
    school.course_numbers.includes(course_number)
  )
}

export const schoolFindById = (schoolId) => {
  return schools.find((s) => s.school_number == schoolId)
}
