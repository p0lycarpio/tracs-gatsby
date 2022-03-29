import * as React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Layout from '../../components/layout'
import {article} from './article.module.scss'

const Article = ({ data }) => {
  return (
    <main>
    <Layout pageTitle="Super Cool Blog Posts">
      <h1>{data.mdx.frontmatter.title}</h1>
      <p>{data.mdx.frontmatter.date}</p>
      <div className={article}>
      <MDXRenderer>
        {data.mdx.body}
      </MDXRenderer>
      </div>
    </Layout>
    </main>
  )
}

export const query = graphql`
  query ($id: String) {
    mdx(id: {eq: $id}) {
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
      }
      body
    }
  }
`

export default Article