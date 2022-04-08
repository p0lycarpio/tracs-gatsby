import * as React from "react"
import Layout from "../components/layout"
import { useStaticQuery, graphql } from "gatsby"
import { useLocalization } from "gatsby-theme-i18n"
import { useTranslation } from "react-i18next"
import ArticleItem from "../components/articleItem"
import { filterArticlesByLocale, sortArticles } from "../util/functions.js"

const Articles = () => {
  const { locale } = useLocalization()
  const { t } = useTranslation("index")

  const data = useStaticQuery(graphql`
    query {
      allMdx(sort: { fields: frontmatter___title, order: ASC }, filter: { fileAbsolutePath: { regex: "/articles/" } }) {
        group(field: frontmatter___slug) {
          nodes {
            frontmatter {
              date(formatString: "MMMM D, YYYY")
              title
              slug
              author
            }
            fields {
              locale
            }
            id
            slug
            excerpt
          }
        }
      }
    }
  `)

  const filtered = filterArticlesByLocale(data.allMdx.group, locale)
  console.log(filtered)
  const sorted = sortArticles(filtered, "abc")

  return (
    <main>
      <Layout pageTitle="Articles" page={"/articles"}>
        <h1>{t("articles_title")}</h1>
        {sorted.map(node => (
          <ArticleItem article={node} key={node.id}></ArticleItem>
        ))}
      </Layout>
    </main>
  )
}

export default Articles
