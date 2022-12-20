import data from './../../data/credit_types.json'
import { omit, sortBy } from 'lodash'

const types = (include_course_numbers = false) => {
  if (include_course_numbers) {
    return sortBy(Object.entries(data))
  } else {
    return sortBy(Object.entries(data)).map((creditType) =>
      omit(creditType, ['course_numbers'])
    )
  }
}

export const creditTypes = types()
export const creditTypesWithCourseNumbers = types(true)
