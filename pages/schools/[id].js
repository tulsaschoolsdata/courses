import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Head from 'next/head'
import { truncate } from 'lodash'
import { schools, courses as allCourses } from '/lib/models'
import { schoolShape } from '/lib/prop-types'
import CourseCard from '/components/courseCard'
import { schoolFindById } from '/lib/models'
import HeaderWithRecordCount from '/components/HeaderWithRecordCount'

export default function School({ school, courses }) {
  return (
    <>
      <Head>
        <title>{`${school.name} Courses - Tulsa Public Schools`}</title>
        <meta
          name="description"
          content={truncate(`Course Catalog for ${school.name} in Tulsa, Oklahoma`, { length: 155 })}
        />
      </Head>

      <Typography component="h1" variant="h3" sx={{ pb: 4 }}>
        {school.name}
      </Typography>

      <HeaderWithRecordCount title="Courses" records={courses} />

      <Grid container spacing={2}>
        {courses.map((course) => (
          <Grid key={course.course_number} item xs={12} sm={6}>
            <CourseCard course={course} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export async function getStaticPaths() {
  const schoolIds = schools.map((s) => s.school_number)

  const paths = schoolIds.map((id) => ({
    params: { id: `${id}` },
  }))

  return {
    paths: paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const school = schoolFindById(params.id)
  const course_ids = school.course_numbers
  const courses = allCourses.filter((c) => course_ids.includes(c.course_number))

  return {
    props: {
      school,
      courses,
    },
  }
}

School.propTypes = {
  school: schoolShape,
}
