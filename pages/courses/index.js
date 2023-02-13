import { React } from 'react'
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

  return (
    <>
      <MetaTags />
      <HeaderWithRecordCount title="Courses" records={allCourses.length} />
      <div data-test="allCourses">
        <InfiniteScrollCourses courses={allCourses} />
      </div>
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
