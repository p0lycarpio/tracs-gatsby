import * as React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "../components/layout"
import { article } from "./article.module.scss"

const ArticleTemplate = ({
  data: {
    mdx: {
      frontmatter: { title, type, date, author },
      body,
    },
  },
}) => {
  return (
    <main>
      <Layout pageTitle={title}>
        <h1>{title}</h1>
        <p>{date}</p>
        <p>{author}</p>
        <div className={article}>
          <MDXRenderer>{body}</MDXRenderer>
        </div>
      </Layout>
    </main>
  )
}

export default ArticleTemplate
