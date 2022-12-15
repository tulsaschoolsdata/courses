import { isNull, toInteger } from 'lodash'
import data from '/data/courses.json'

export const courses = Object.values(data).filter(
  (course) =>
    !isNull(course.alt_course_number) &&
    toInteger(course.course_number) >= 13000 &&
    !course.credit_types.includes('STOREDGRADEDEL')
)
