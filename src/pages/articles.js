import * as React from "react"
import Layout from "../components/layout"
import { useStaticQuery, graphql } from "gatsby"
import { useLocalization } from "gatsby-theme-i18n"
import { useTranslation } from "react-i18next"
import ArticleItem from "../components/articleItem"

const Articles = () => {
  const { locale } = useLocalization()
  const { t } = useTranslation("index")

  const data = useStaticQuery(graphql`
    query {
      allMdx(sort: { fields: frontmatter___title, order: ASC }, filter: { fileAbsolutePath: { regex: "/articles/" } }) {
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
  `)

  const filtered = data.allMdx.nodes.filter(node => {
    return node.fields.locale.includes(locale)
  })

  return (
    <main>
      <Layout pageTitle="Articles" page={"/articles"}>
        <h1>{t("articles_title")}</h1>
        {filtered.map(node => (
          <ArticleItem article={node} key={node.id}></ArticleItem>
        ))}
      </Layout>
    </main>
  )
}

export default Articles
