import schoolCategories from '/data/school_categories'
import schoolsJson from '/data/schools'
import { groupBy, sortBy } from 'lodash'

export const schools = sortBy(
  Object.values(schoolsJson).map((school) => ({
    ...school,
    school_category_name: schoolCategories[school['category']]?.name || null,
  })),
  'name'
)

export const schoolsGroupByCategory = groupBy(schools, 'school_category_name')

export const schoolsWhereCategoryCode = (categoryCode) => {
  return schools.filter((school) => school.category == categoryCode)
}

export const schoolFindById = (schoolId) => {
  return schools.find((s) => s.school_number == schoolId)
}
