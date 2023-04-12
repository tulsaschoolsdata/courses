import { React } from 'react'
import PropTypes from 'prop-types'
import { courses } from '/lib/models'
import { courseShape } from '/lib/prop-types'
import HeaderWithRecordCount from '/components/HeaderWithRecordCount'
import Head from 'next/head'
import InfiniteScrollCourses from '/components/InfiniteScrollCourses'
import Typography from '@mui/material/Typography'

export default function Courses({ allCourses, lastUpdated }) {
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
      {lastUpdated && (
        <Typography
          variant="subtitle1"
          align="right"
          sx={{ color: '#4f4d4d', width: '100%' }}
        >
          {`Last Updated: ${lastUpdated}`}
        </Typography>
      )}
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
  const lastUpdated = process.env.REACT_APP_LAST_UPDATED

  return {
    props: {
      allCourses,
      lastUpdated,
    },
  }
}
