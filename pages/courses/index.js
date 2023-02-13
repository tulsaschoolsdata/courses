import { React, useState } from 'react'
import PropTypes from 'prop-types'
import { courses } from '/lib/models'
import { courseShape } from '/lib/prop-types'
import HeaderWithRecordCount from '/components/HeaderWithRecordCount'
import Head from 'next/head'
import InfiniteScrollCourses from '/components/InfiniteScrollCourses'


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
    if (increaseTotalSlice >= allCourses.length) {
      setHasMore(false)
    } else {
      setScrollPosition(increaseTotalSlice)
    }
    setCourses(() => allCourses.slice(0, increaseTotalSlice))
  }

  return (
    <>
      <MetaTags />
      <HeaderWithRecordCount title="Courses" records={allCourses.length} />
      <InfiniteScrollCourses courses={allCourses} TestId="allCourses" />
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
