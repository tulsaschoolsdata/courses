import data from '/data/school_categories'

export const schoolCategories = data

export function categoryCodeToName(code) {
  schoolCategories[code]?.name
}
