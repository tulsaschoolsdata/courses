import Layout from '../components/layout'

export default function CourseCatalog({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
