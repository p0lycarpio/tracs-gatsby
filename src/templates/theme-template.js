import * as React from "react"
import Layout from "../components/layout"
import { GatsbyImage } from "gatsby-plugin-image"
import { MDXRenderer } from "gatsby-plugin-mdx"

const ThemeTemplate = ({ data }) => {
  return (
    <main>
      <Layout pageTitle={data.mdx.frontmatter.title}>
        <h1>{data.mdx.frontmatter.title}</h1>
        <GatsbyImage
          image={data.mdx.frontmatter.image.childImageSharp.gatsbyImageData}
          alt={data.mdx.frontmatter.description.title}
        />
        <MDXRenderer>{data.mdx.body}</MDXRenderer>
        <hr></hr>
      </Layout>
    </main>
  )
}

export default ThemeTemplate
