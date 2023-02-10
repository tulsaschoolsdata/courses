import { React, useState } from 'react'
import PropTypes from 'prop-types'
import Grid from '@mui/material/Grid'
import CourseCard from '/components/courseCard'
import { courses } from '/lib/models'
import { courseShape } from '/lib/prop-types'
import HeaderWithRecordCount from '/components/HeaderWithRecordCount'
import Head from 'next/head'
import InfiniteScroll from 'react-infinite-scroll-component'

export default function Courses({ allCourses }) {
  const MetaTags = () => (
    <Head>
      <title>Courses offered by Tulsa Public Schools</title>
      <meta
        name="description"
        content="A listing of courses offered by Tulsa Public Schools"
      />
    </Head>
  )

  const perPage = 100
  const [courses, setCourses] = useState(allCourses.slice(0, perPage))
  const [scrollPosition, setScrollPosition] = useState(perPage)
  const [hasMore, setHasMore] = useState(true)

  const fetchData = () => {
    const increaseTotalSlice = scrollPosition + perPage
    if (increaseTotalSlice > allCourses.length) {
      setHasMore(false)
    } else {
      setScrollPosition(increaseTotalSlice)
    }
    setCourses(allCourses.slice(0, increaseTotalSlice))
  }

  return (
    <>
      <MetaTags />
      <HeaderWithRecordCount title="Courses" records={allCourses.length} />

      <InfiniteScroll
        dataLength={courses.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <Grid container spacing={2} data-test="allCourses">
          {courses.map((course) => (
            <Grid key={course.course_number} item xs={12} sm={6}>
              <CourseCard course={course} />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </>
  )
}

Courses.propTypes = {
  courses: PropTypes.arrayOf(courseShape),
}

export async function getStaticProps() {
  const allCourses = courses

  return {
    props: {
      allCourses,
    },
  }
}
