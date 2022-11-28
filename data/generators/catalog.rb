#!/usr/bin/env ruby
# frozen_string_literal: true

require "rubygems"
require "bundler/setup"
require_relative "lib/power_school"

Bundler.require(:default)
Dotenv.load(*Dir["#{__dir__}/.env*"])

class CourseCatalog
  OUTPUT_FILE = "#{__dir__}/../catalog.json"

  def powerschool_records
    page_size = 500
    page_count = (PowerSchool.powerquery(
      path: "course.catalog",
      page: 1,
      pagesize: 1,
      count: true
    ).count / page_size.to_f).ceil

    (1..page_count).map do |page|
      PowerSchool.powerquery(path: "course.catalog",
        page: page, pagesize: page_size).records
    end
  end

  def data
    schools = {}
    school_categories = {}

    courses = {}
    course_departments = {}
    course_credit_types = {}

    powerschool_records.each do |record|
      # Note the "school_id" is actually the school *number*.
      school_key = record["school_id"]
      course_key = record["course_number"]

      schools[school_key] ||= {
        school_id: record["school_id"],
        school_name: record["school_name"]
      }

      courses[course_key] ||= {
        course_number: record["course_number"],
        courses_dcid: record["courses_dcid"].to_i,
        course_name: record["course_name"],
        alt_course_number: record["alt_course_number"],
        course_description: record["course_description"]&.delete("\r"),
        courses_credit_hours: record["courses_credit_hours"]&.to_f,
        pre_req_note: record["pre_req_note"]
      }

      schools[school_key][:course_ids] ||= []
      schools[school_key][:course_ids] << course_key

      school_categories[record["school_category"]] ||= school_categories.length + 1
      schools[school_key][:school_category] ||= school_categories[record["school_category"]]

      courses[course_key][:school_ids] ||= []
      courses[course_key][:school_ids] << school_key

      course_department = record["course_department"]
      course_departments[course_department] ||= course_departments.length + 1
      courses[course_key][:course_department] ||= course_departments[course_department]

      course_credit_type = record["course_credit_type"]&.upcase&.split(",")&.to_set
      course_credit_types[course_credit_type] ||= course_credit_types.length + 1
      courses[course_key][:course_credit_type] ||= course_credit_types[course_credit_type]
    end

    {schools: schools,
     school_categories: school_categories.invert,
     courses: courses,
     course_departments: course_departments.invert,
     course_credit_types: course_credit_types.invert}
  end

  def to_json
    File.write OUTPUT_FILE, data.to_json, mode: "w"
  end
end

catalog = CourseCatalog.new
catalog.data.to_json
