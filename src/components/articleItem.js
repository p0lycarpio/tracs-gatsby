import * as React from "react"
import { LocalizedLink } from "gatsby-theme-i18n"

const ArticleItem = ({ article }) => {
  return (
    <div key={article.id}>
      <h3>
        <LocalizedLink to={article.frontmatter.slug}>{article.frontmatter.title}</LocalizedLink>
      </h3>
      <p>{article.frontmatter.author + ", " + article.frontmatter.date}</p>
      <small>{article.excerpt}</small>{" "}
    </div>
  )
}

export default ArticleItem
