import data from '/data/credit_types'
import { omit, sortBy } from 'lodash'

export const creditTypes = (include_course_numbers = false) => {
  if (include_course_numbers) {
    return sortBy(Object.entries(data))
  } else {
    return sortBy(Object.entries(data)).map((creditType) =>
      omit(creditType, ['course_numbers'])
    )
  }
}
