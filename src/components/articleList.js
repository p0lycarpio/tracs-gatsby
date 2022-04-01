import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { LocalizedLink } from "gatsby-theme-i18n"

export default function ArticleList({ lang }) {
  const data = useStaticQuery(graphql`
    query {
      allMdx(
        filter: { fileAbsolutePath: { regex: "/articles/" } }
        sort: { fields: frontmatter___date, order: DESC }
        limit: 5
      ) {
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
          excerpt
        }
      }
    }
  `)

  const filtered = data.allMdx.nodes.filter(node => {
    return node.fields.locale.includes(lang)
  })

  return filtered.map(node => (
    <article key={node.id}>
      <h3>
        <LocalizedLink to={node.frontmatter.slug}>{node.frontmatter.title}</LocalizedLink>
      </h3>
      <p>{node.frontmatter.date}</p>
      <small>{node.excerpt}</small>
    </article>
  ))
}
