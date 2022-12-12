import catalog from '/data/catalog.json'
import { groupBy, sortBy } from 'lodash'

const categories = catalog['school_categories']

export const schools = sortBy(
  Object.values(catalog['schools']).map((school) => ({
    ...school,
    school_category_name: categories[school['school_category']],
  })),
  'school_name'
)

// export const schools = [];

export const schoolsGroupByCategory = groupBy(schools, 'school_category_name')
