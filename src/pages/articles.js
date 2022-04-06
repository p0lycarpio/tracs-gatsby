import * as React from "react"
import Layout from "../components/layout"
import { useStaticQuery, graphql } from "gatsby"
import { useLocalization } from "gatsby-theme-i18n"
import { LocalizedLink } from "gatsby-theme-i18n"
import { useTranslation } from "react-i18next"

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
          <article key={node.id}>
            <h3>
              <LocalizedLink to={node.frontmatter.slug}>{node.frontmatter.title}</LocalizedLink>
            </h3>
            <p>{node.frontmatter.author + ", " + node.frontmatter.date}</p>
            <small>{node.excerpt}</small>
          </article>
        ))}
      </Layout>
    </main>
  )
}

export default Articles
