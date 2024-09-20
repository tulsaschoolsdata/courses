import React from 'react'
import Typography from '@mui/material/Typography'
import Head from 'next/head'
import { truncate } from 'lodash'
import { schools, courses as allCourses } from '/lib/models'
import { schoolShape } from '/lib/prop-types'
import { schoolFindById } from '/lib/models'
import HeaderWithRecordCount from '/components/HeaderWithRecordCount'
import InfiniteScrollCourses from '/components/InfiniteScrollCourses'

export default function School({ school, courses, lastUpdated }) {
  return (
    <React.Fragment>
      <Head>
        <title>{`${school.name} Courses - Tulsa Public Schools`}</title>
        <meta
          name="description"
          content={truncate(
            `Course Catalog for ${school.name} in Tulsa, Oklahoma`,
            { length: 155 },
          )}
        />
      </Head>

      <Typography
        component="h1"
        variant="h3"
        sx={{ pb: 4 }}
        data-test="showSchoolName"
      >
        {school.name}
      </Typography>

      <HeaderWithRecordCount title="Courses" records={courses.length} />
      {lastUpdated && (
        <Typography
          variant="subtitle1"
          align="right"
          sx={{ color: '#4f4d4d', width: '100%' }}
        >
          {`Last Updated: ${lastUpdated}`}
        </Typography>
      )}

      <div data-test="showSchoolCourses">
        <InfiniteScrollCourses courses={courses} />
      </div>
    </React.Fragment>
  )
}

export async function getStaticPaths() {
  const schoolIds = schools.map((s) => s.school_number)

  const paths = schoolIds.map((id) => ({
    params: { schools: `${id}` },
  }))

  return {
    paths: paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const school = schoolFindById(params.schools)
  const course_ids = school.course_numbers
  const courses = allCourses.filter((c) => course_ids.includes(c.course_number))
  const lastUpdated = process.env.REACT_APP_LAST_UPDATED || null

  return {
    props: {
      school,
      courses,
      lastUpdated,
    },
  }
}

School.propTypes = {
  school: schoolShape,
}
