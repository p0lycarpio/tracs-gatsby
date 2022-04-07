import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useLocalization } from "gatsby-theme-i18n"
import ArticleItem from "./articleItem"

export default function ArticleList() {
  const { locale } = useLocalization()

  const data = useStaticQuery(graphql`
    query {
      allMdx(filter: { fileAbsolutePath: { regex: "/articles/" } }, sort: { fields: frontmatter___date, order: DESC }) {
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

  return filtered.slice(0, 5).map(node => <ArticleItem article={node}></ArticleItem>)
}
