import catalog from '/data/catalog.json'
import { sortBy } from 'lodash'

const courseDepartments = catalog['course_departments']

export const departments = sortBy(Object.values(courseDepartments))
