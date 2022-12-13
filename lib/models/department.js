import { courses } from '/lib/models'
import { sortBy } from 'lodash'

export const departments = sortBy(courses.map((course) => course.department))
