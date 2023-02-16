import { React, useEffect, useState } from 'react'
import Fuse from 'fuse.js'
import { courses as allCourses } from '/lib/models'
import HeaderWithRecordCount from '/components/HeaderWithRecordCount'
import Head from 'next/head'
import { useRouter } from 'next/router'
import InfiniteScrollCourses from '/components/InfiniteScrollCourses'
import { isNull, isArray, isString } from 'lodash'

export default function SearchResults({ courses }) {
  const [searchResults, setSearchResults] = useState([])

  const router = useRouter()
  const queryParams = router.query

  useEffect(() => {
    const filtersSearch =
      isString(queryParams.search) && queryParams.search.length > 0
        ? queryParams.search
        : null

    const filtersCreditType =
      isString(queryParams.creditType) && queryParams.creditType.length > 0
        ? queryParams.creditType
        : null

    const filtersSchools =
      isArray(queryParams.schools) ||
      (isString(queryParams.schools) && queryParams.schools.length > 0)
        ? queryParams.schools
        : null

    const filtersCourseNumbers =
      isArray(queryParams.courseNumbers) ||
      (isString(queryParams.courseNumbers) &&
        queryParams.courseNumbers.length > 0)
        ? queryParams.courseNumbers
        : null

    let output = []

    const hasFilters =
      [
        filtersSearch,
        filtersSchools,
        filtersCreditType,
        filtersCourseNumbers,
      ].filter((n) => n).length > 0

    if (hasFilters) {
      output = [...courses]
    }

    if (!isNull(filtersCourseNumbers)) {
      output = output.filter((course) =>
        filtersCourseNumbers.includes(course.course_number)
      )
    }

    if (!isNull(filtersCreditType)) {
      output = output.filter((course) =>
        course.credit_types.includes(filtersCreditType)
      )
    }

    if (!isNull(filtersSchools)) {
      output = output.filter(
        (course) =>
          course.school_numbers.filter((id) => filtersSchools.includes(id))
            .length > 0
      )
    }

    if (!isNull(filtersSearch)) {
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

    const results = output
    setSearchResults(results)
  }, [queryParams, courses])

  const MetaTags = () => (
    <Head>
      <title>Search Results for Courses Offered by Tulsa Public Schools</title>
      <meta
        name="description"
        content="Custom search results for courses offered by Tulsa Public Schools"
      />
    </Head>
  )

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
