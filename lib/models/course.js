import catalog from '/data/catalog.json'

const courseDepartments = catalog['course_departments']
const creditTypes = catalog['course_credit_types']
// const categories = catalog['school_categories']

export const courses = Object.values(catalog['courses']).map((course) => ({
  ...course,
  course_department_name: courseDepartments[course['course_department']],
  course_credit_type_name: creditTypes[course['course_credit_type']],
}))
