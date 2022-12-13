import PropTypes from 'prop-types'

export const courseShape = PropTypes.shape({
  course_number: PropTypes.string.isRequired,
  courses_dcid: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  alt_course_number: PropTypes.string,
  description: PropTypes.string,
  credit_hours: PropTypes.number.isRequired,
  pre_req_note: PropTypes.string,
  school_numbers: PropTypes.array.isRequired,
  department: PropTypes.string,
  credit_types: PropTypes.array.isRequired
})

export const schoolShape = PropTypes.shape({
  school_number: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  course_ids: PropTypes.array.isRequired,
  school_category: PropTypes.number.isRequired
})
