import { isString } from 'lodash'

export function coerceIntoString(param) {
  return isString(param) && param.length > 0 ? param : ''
}

export function coerceIntoArray(param) {
  return (isString(param) ? [param] : param) || []
}
