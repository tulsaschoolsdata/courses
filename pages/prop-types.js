import PropTypes from 'prop-types'

export const courseShape = PropTypes.shape({
  course_name: PropTypes.string.isRequired,
  prerequisites: PropTypes.string.isRequired,
  credit_types: PropTypes.string.isRequired,
  state_course_number: PropTypes.string.isRequired,
  tps_course_number: PropTypes.string.isRequired,
  credit_hours: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  course_notes: PropTypes.string.isRequired,
  grade_levels: PropTypes.arrayOf(PropTypes.number.isRequired),
  department: PropTypes.string.isRequired
})

export const departmentShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
})

export const gradeLevelShape = PropTypes.shape({
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
})
