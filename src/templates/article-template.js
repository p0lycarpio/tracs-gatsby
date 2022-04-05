import * as React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "../components/layout"
import { article } from "./article.module.scss"
import { graphql } from "gatsby"
import { useTranslation } from "react-i18next"

const ArticleTemplate = ({ data }) => {
  const { t } = useTranslation("index")

  if (data.mdx) {
    return (
      <main>
        <Layout article={data.mdx.slug} pageTitle={data.mdx.frontmatter.title}>
          <h1>{data.mdx.frontmatter.title}</h1>
          <p>{data.mdx.frontmatter.date}</p>
          <p>{data.mdx.frontmatter.author}</p>
          <div className={article}>
            <MDXRenderer>{data.mdx.body}</MDXRenderer>
          </div>
        </Layout>
      </main>
    )
  } else {
    return (
      <main>
        <Layout>
          <h1>{t("article404")}</h1>
          <div className={article}>{t("article404msg")}</div>
        </Layout>
      </main>
    )
  }
}

export default ArticleTemplate

export const query = graphql`
  query ($locale: String!, $slug: String!) {
    mdx(fields: { locale: { eq: $locale } }, frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        slug
        title
      }
      body
      slug
    }
  }
`
