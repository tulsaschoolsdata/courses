import { isNull, toInteger, sortBy } from 'lodash'
import data from '/data/courses.json'
import instructionLevels from '/data/instruction_levels.json'

export const courses = sortBy(
  Object.values(data).filter(
    (course) =>
      !isNull(course.alt_course_number) &&
      toInteger(course.course_number) >= 13000 &&
      !course.credit_types.includes('STOREDGRADEDEL')
  ).map((course) => ({
    ...course,
    instruction_level_name: instructionLevels[course.instruction_level]?.name
  })),
  'name'
)
