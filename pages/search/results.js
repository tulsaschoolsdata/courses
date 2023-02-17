import { React, useEffect, useState } from 'react'
import HeaderWithRecordCount from '/components/HeaderWithRecordCount'
import Head from 'next/head'
import { useRouter } from 'next/router'
import InfiniteScrollCourses from '/components/InfiniteScrollCourses'
import {
  courses as allCourses,
  searchByQueryParams,
} from '/lib/models'

const MetaTags = () => (
  <Head>
    <title>Search Results for Courses Offered by Tulsa Public Schools</title>
    <meta
      name="description"
      content="Custom search results for courses offered by Tulsa Public Schools"
    />
  </Head>
)


export default function SearchResults({ courses }) {
  const [searchResults, setSearchResults] = useState([])

  const router = useRouter()
  const queryParams = router.query

  useEffect(() => {
    const results = searchByQueryParams(queryParams, courses)
    setSearchResults(results)
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
