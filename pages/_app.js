import Layout from '../components/layout'
import Head from 'next/head'
import React from 'react'

export default function CourseCatalog({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Layout>
        <Head>
          <title>Course Catalog - Tulsa Public Schools</title>
          <meta name="description" content="Course Catalog for Tulsa Public Schools" />
          <link
            rel="icon"
            href="/images/tps-logo-color.svg"
            type="image/svg+xml"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </React.Fragment>
  )
}
