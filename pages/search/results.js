import { React, useEffect, useState } from 'react'
import Fuse from 'fuse.js'
import { courses as allCourses } from '/lib/models'
import HeaderWithRecordCount from '/components/HeaderWithRecordCount'
import Head from 'next/head'
import {
  useQueryParams,
  StringParam,
  ArrayParam,
  withDefault,
} from 'use-query-params'
import { useRouter } from 'next/router'
import InfiniteScrollCourses from '/components/InfiniteScrollCourses'

export default function SearchResults({ courses }) {
  const [queryParams, _] = useQueryParams({
    schools: withDefault(ArrayParam, []),
    search: withDefault(StringParam, ''),
    creditType: withDefault(StringParam, ''),
    courseNumbers: withDefault(ArrayParam, []),
  })

  const [searchResults, setSearchResults] = useState([])
  const filters = queryParams

  const router = useRouter()
  const query = router.query

  useEffect(() => {
    const hasFilters =
      filters.search !== '' ||
      filters.creditType !== '' ||
      filters.schools.length > 0 ||
      filters.courseNumbers.length > 0

    let output = []

    if (hasFilters) {
      output = courses
    }

    if (filters.courseNumbers?.length > 0) {
      output = output.filter((course) =>
        filters.courseNumbers.includes(course.course_number)
      )
    }

    if (filters.creditType != '') {
      output = output.filter((course) =>
        course.credit_types.includes(filters.creditType)
      )
    }

    if (filters.schools?.length > 0) {
      output = output.filter(
        (course) =>
          course.school_numbers.filter((id) => filters.schools.includes(id))
            .length > 0
      )
    }

    if (filters.search != '') {
      const options = {
        keys: [
          { name: 'name', weight: 75 },
          { name: 'description', weight: 5 },
        ],
        useExtendedSearch: true,
        threshold: 0.2,
      }
      const fuse = new Fuse(output, options)
      const fuseResults = fuse.search(filters.search)
      output = fuseResults.map((result) => result.item)
    }
    setSearchResults(output)
  }, [query, courses]) // cannot include filters or queryParams in dependency array; infinite errors

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
      <HeaderWithRecordCount
        title="Search Results"
        records={searchResults.length}
      />
      {searchResults.length > 0 ? (
        <InfiniteScrollCourses courses={searchResults} TestId="searchResults" />
      ) : (
        <></>
      )}
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
