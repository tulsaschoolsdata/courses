import { React, useState } from 'react'
import PropTypes from 'prop-types'
import Grid from '@mui/material/Grid'
import CourseCard from '/components/courseCard'
import { courseShape } from '/lib/prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Fab } from '@mui/material'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp'

export default function InfiniteScrollCourses({ courses }) {
  const perPage = 100
  const [coursesSlice, setCourses] = useState(courses.slice(0, perPage))
  const [scrollPosition, setScrollPosition] = useState(perPage)
  const [hasMore, setHasMore] = useState(true)

  const fetchData = () => {
    const increaseTotalSlice = scrollPosition + perPage
    if (increaseTotalSlice >= courses.length) {
      setHasMore(false)
    } else {
      setScrollPosition(increaseTotalSlice)
    }
    setCourses(() => courses.slice(0, increaseTotalSlice))
  }

  const totalCoursesLessThanPerPage = perPage >= courses.length ? true : false

  const CoursesGrid = () => (
    <Grid container spacing={2}>
      {coursesSlice.map((course) => (
        <Grid key={course.course_number} item xs={12} sm={6}>
          <CourseCard course={course} />
        </Grid>
      ))}
    </Grid>
  )

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    })
  }

  const FabScrollToTop = () => (
    <Fab variant="extended" color="primary" onClick={scrollToTop}>
      <ArrowCircleUpIcon sx={{ mr: 1 }} /> Scroll To Top
    </Fab>
  )

  const Scroller = () => (
    <InfiniteScroll
      dataLength={coursesSlice.length}
      next={fetchData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <FabScrollToTop />
        </p>
      }
    >
      <CoursesGrid />
    </InfiniteScroll>
  )

  return totalCoursesLessThanPerPage ? <CoursesGrid /> : <Scroller />
}

InfiniteScrollCourses.propTypes = {
  courses: PropTypes.arrayOf(courseShape).isRequired,
}
