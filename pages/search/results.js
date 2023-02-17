import { React, useEffect, useState } from 'react'
import Fuse from 'fuse.js'
import { courses as allCourses } from '/lib/models'
import HeaderWithRecordCount from '/components/HeaderWithRecordCount'
import Head from 'next/head'
import { useRouter } from 'next/router'
import InfiniteScrollCourses from '/components/InfiniteScrollCourses'
import { isEmpty } from 'lodash'
import { coerceIntoArray, coerceIntoString } from '/lib/utils'

const MetaTags = () => (
  <Head>
    <title>Search Results for Courses Offered by Tulsa Public Schools</title>
    <meta
      name="description"
      content="Custom search results for courses offered by Tulsa Public Schools"
    />
  </Head>
)

const courseNumbersToArray = (courseNumbers) =>
  courseNumbers?.split(/\s+|,|\|/).filter((val) => val.match(/\d+/))

const queryParamsToFilters = (queryParams, courses) => {
  const filtersSearch = coerceIntoString(queryParams.search)
  const filtersCreditType = coerceIntoString(queryParams.creditType)
  const filtersSchools = coerceIntoArray(queryParams.schools)
  const filtersCourseNumbers = coerceIntoArray(
    courseNumbersToArray(queryParams.courseNumbers)
  )

  let output = []

  const hasFilters =
    [
      filtersSearch,
      filtersSchools,
      filtersCreditType,
      filtersCourseNumbers,
    ].filter((n) => n.length > 0).length > 0

  if (hasFilters) {
    output = courses
  }

  if (!isEmpty(filtersCourseNumbers)) {
    output = output.filter((course) =>
      filtersCourseNumbers.includes(course.course_number)
    )
  }

  if (!isEmpty(filtersCreditType)) {
    output = output.filter((course) =>
      course.credit_types.includes(filtersCreditType)
    )
  }

  if (!isEmpty(filtersSchools)) {
    output = output.filter(
      (course) =>
        course.school_numbers.filter((id) => filtersSchools.includes(id))
          .length > 0
    )
  }

  if (!isEmpty(filtersSearch)) {
    const options = {
      keys: [
        { name: 'name', weight: 75 },
        { name: 'description', weight: 5 },
      ],
      useExtendedSearch: true,
      threshold: 0.2,
    }
    const fuse = new Fuse(output, options)
    const fuseResults = fuse.search(filtersSearch)
    output = fuseResults.map((result) => result.item)
  }

  return output
}

export default function SearchResults({ courses }) {
  const [searchResults, setSearchResults] = useState([])

  const router = useRouter()
  const queryParams = router.query

  useEffect(() => {
    setSearchResults(queryParamsToFilters(queryParams, courses))
  }, [queryParams, courses])

  return (
    <>
      <MetaTags />
      <HeaderWithRecordCount
        title="Search Results"
        records={searchResults.length}
      />
      <div data-test="searchResults">
        {searchResults.length > 0 ? (
          <InfiniteScrollCourses courses={searchResults} />
        ) : (
          <></>
        )}
      </div>
    </>
  )
}

export async function getStaticProps() {
  const courses = allCourses

  return {
    props: {
      courses,
    },
  }
}
