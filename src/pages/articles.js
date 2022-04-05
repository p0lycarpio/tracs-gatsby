import * as React from "react"
import Layout from "../components/layout"
import { useStaticQuery, graphql } from "gatsby"
import { useLocalization } from "gatsby-theme-i18n"
import { LocalizedLink } from "gatsby-theme-i18n"

const Articles = () => {
  const { locale } = useLocalization()

  const data = useStaticQuery(graphql`
    query {
      allMdx(sort: { fields: frontmatter___title, order: ASC }, filter: { fileAbsolutePath: { regex: "/articles/" } }) {
        nodes {
          frontmatter {
            date(formatString: "MMMM D, YYYY")
            title
            slug
          }
          fields {
            locale
          }
          id
          slug
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
        <h1>Articles de A à Z</h1>

        {filtered.map(node => (
          <article key={node.id}>
            <LocalizedLink to={node.frontmatter.slug}>
              <h3>{node.frontmatter.title}</h3>
            </LocalizedLink>
            <p>Posted: {node.frontmatter.date}</p>
          </article>
        ))}
      </Layout>
    </main>
  )
}

export default Articles
