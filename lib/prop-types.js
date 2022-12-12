import PropTypes from 'prop-types'

export const courseShape = PropTypes.shape({
  course_number: PropTypes.string.isRequired,
  courses_dcid: PropTypes.number.isRequired,
  course_name: PropTypes.string.isRequired,
  alt_course_number: PropTypes.string,
  course_description: PropTypes.string,
  courses_credit_hours: PropTypes.number.isRequired,
  pre_req_note: PropTypes.string,
  school_ids: PropTypes.array.isRequired,
  course_department: PropTypes.number.isRequired,
  course_credit_type: PropTypes.number.isRequired,
})

export const schoolShape = PropTypes.shape({
  school_id: PropTypes.string.isRequired,
  school_name: PropTypes.string.isRequired,
  course_ids: PropTypes.array.isRequired,
  school_category: PropTypes.number.isRequired,
})
