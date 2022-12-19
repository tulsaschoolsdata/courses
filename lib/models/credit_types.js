import data from '/data/credit_types'
import { omit, sortBy } from 'lodash'

export const creditTypes = sortBy(Object.entries(data)).map(creditType => omit(creditType, ['course_numbers']))
