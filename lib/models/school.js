import schoolCategories from '/data/school_categories'
import schoolsJson from '/data/schools'
import { groupBy, sortBy } from 'lodash'

export const schools = sortBy(
  Object.values(schoolsJson).map((school) => ({
    ...school,
    school_category_name: schoolCategories[school['category']]?.name || null,
  })).filter(school => school.school_category_name !== null),
  'name'
)

export const schoolsGroupByCategory = groupBy(schools, 'category')

export const schoolsWhereCategoryCode = (categoryCode) => {
  const categories = schoolCategories || {}
  const category = categories[categoryCode]
  const school_numbers = category ? category['school_numbers'] : []

  return schools.filter((school) =>
    school_numbers.includes(school.school_number)
  )
}

export const schoolFindById = (schoolId) => {
  return schools.find((s) => s.school_number == schoolId)
}
