import * as React from "react"
import { graphql } from "gatsby"
import { useTranslation } from "react-i18next"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "../components/layout"

const BlogTemplate = ({ data, pageContext }) => {
  const { t } = useTranslation("index")
  return (
    <Layout>
      <span>DEBUG i18n</span>
      <h1>_ {t("context")}</h1>
      <pre>{JSON.stringify(pageContext, null, 2)}</pre>
      <h1>_ {t("data")}</h1>
      <div>
        {data.mdx ? <MDXRenderer>{data.mdx.body}</MDXRenderer> : <div>This page hasn't been translated yet</div>}
      </div>
    </Layout>
  )
}

export default BlogTemplate

export const query = graphql`
  query ($locale: String!, $slug: String!) {
    mdx(fields: { locale: { eq: $locale } }, frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        slug
        title
      }
      body
    }
  }
`
