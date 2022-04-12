import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useLocalization } from "gatsby-theme-i18n"
import ArticleItem from "./articleItem"
import { filterOnlyArticlesByLocale } from "../util/functions.js"

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
            draft
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

  const filtered = filterOnlyArticlesByLocale(data.allMdx.nodes, locale)

  return filtered.slice(0, 5).map(node => <ArticleItem article={node} key={node.id}></ArticleItem>)
}
