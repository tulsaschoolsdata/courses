import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@mui/material/Grid'
import CourseCard from '/components/courseCard'
import { courses as allCourses, schoolsGroupByCategory } from '/lib/models'
import { courseShape } from '/lib/prop-types'
import HeaderWithRecordCount from '/components/HeaderWithRecordCount'
import Head from 'next/head'

export default function Courses({ courses }) {
  const MetaTags = () => (
    <Head>
      <title>Courses offered by Tulsa Public Schools</title>
      <meta
        name="description"
        content="A listing of courses offered by Tulsa Public Schools"
      />
    </Head>
  )

  return (
    <>
      <MetaTags />
      <HeaderWithRecordCount title="Courses" records={courses.length} />

      <Grid container spacing={2} data-test="allCourses">
        {courses.map((course) => (
          <Grid key={course.course_number} item xs={12} sm={6}>
            <CourseCard course={course} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

Courses.propTypes = {
  courses: PropTypes.arrayOf(courseShape),
}

export async function getStaticProps() {
  const schools = Object.entries(schoolsGroupByCategory)
  const courses = allCourses

  return {
    props: {
      courses,
      schools,
    },
  }
}
