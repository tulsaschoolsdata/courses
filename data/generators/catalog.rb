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
    end.flatten
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
    data.to_json
  end

  def to_json_file
    File.write OUTPUT_FILE, to_json, mode: "w"
  end

  def to_fixture
    d = data
    schools = d[:schools]
    new_course_ids = []

    sampled_schools = schools.each_with_object({}) do | (school_id, school),obj |
      sample_of_schools_course_ids = school[:course_ids].sample(5)
      new_course_ids += sample_of_schools_course_ids
      school[:course_ids] = sample_of_schools_course_ids
      obj[school_id] = school
    end

    courses = d[:courses].select do |course_id, course|
      new_course_ids.include?(course_id)
    end

    sampled_courses = courses.map do |course_id, course|
      course[:course_description] = "Test Desc"
      course
    end

    d[:schools] = sampled_schools
    d[:courses] = sampled_courses.each_with_object({}) do | course, obj |
      obj[course[:course_number]] = course
    end

    d
  end
end

catalog = CourseCatalog.new
catalog.to_json_file
puts catalog.to_fixture.to_json
