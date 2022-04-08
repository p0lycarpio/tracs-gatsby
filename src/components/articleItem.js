import * as React from "react"
import { LocalizedLink } from "gatsby-theme-i18n"

const articleStyle = {
  marginBottom: "2em",
}

const ArticleItem = ({ article }) => {
  return (
    <div style={articleStyle}>
      <h3>
        <LocalizedLink to={article.frontmatter.slug} language={article.frontmatter.lang}>
          {article.frontmatter.title}
        </LocalizedLink>
      </h3>
      <p>{article.frontmatter.author + ", " + article.frontmatter.date}</p>
      <small>{article.excerpt}</small>
    </div>
  )
}

export default ArticleItem
