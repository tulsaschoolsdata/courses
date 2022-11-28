#!/usr/bin/env ruby
# frozen_string_literal: true

Dotenv.load(*Dir["#{__dir__}/.env*"])
require_relative 'lib/power_school'

class CourseCatalog
  def build
    page_size = 500
    page_count = (PowerSchool.powerquery(
      path: 'course.catalog',
      page: 1,
      pagesize: 1,
      count: true).count / page_size.to_f).ceil

    course_catalog = (1..page_count).map do |page|
      PowerSchool.powerquery(path: 'course.catalog',
        page: page, pagesize: page_size).records
    end

    schools = {}
    school_categories = {}

    courses = {}
    course_departments = {}
    course_credit_types = {}

    course_catalog.each do |record|
      # Note the "school_id" is actually the school *number*.
      #
      school_key = record['school_id']
      course_key = record['course_number']

      schools[school_key] ||= {
        school_id: record['school_id'],
        school_name: record['school_name']
      }

      courses[course_key] ||= {
        course_number: record['course_number'],
        courses_dcid: record['courses_dcid'].to_i,
        course_name: record['course_name'],
        alt_course_number: record['alt_course_number'],
        course_description: record['course_description']&.delete("\r"),
        courses_credit_hours: record['courses_credit_hours']&.to_f,
        pre_req_note: record['pre_req_note']
      }

      schools[school_key][:course_ids] ||= []
      schools[school_key][:course_ids] << course_key

      school_categories[record['school_category']] ||= school_categories.length + 1
      schools[school_key][:school_category] ||= school_categories[record['school_category']]


      courses[course_key][:school_ids] ||= []
      courses[course_key][:school_ids] << school_key

      course_department = record['course_department']
      course_departments[course_department] ||= course_departments.length + 1
      courses[course_key][:course_department] ||= course_departments[course_department]

      course_credit_type = record['course_credit_type']&.upcase&.split(',')&.to_set
      course_credit_types[course_credit_type] ||= course_credit_types.length + 1
      courses[course_key][:course_credit_type] ||= course_credit_types[course_credit_type]
    end

    school_categories = school_categories.invert
    course_departments = course_departments.invert
    course_credit_types = course_credit_types.invert


    @json_build = { schools: schools,
                    school_categories: school_categories,
                    courses: courses,
                    course_departments: course_departments,
                    course_credit_types: course_credit_types }

    def to_json
      File.write "#{__dir__}/../catalog.json", @json_build.to_json, mode: 'w'
    end
  end
end

catalog = CourseCatalog.new
catalog.to_json
