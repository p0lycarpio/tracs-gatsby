import * as React from "react"
import Layout from "../../components/layout"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { MDXRenderer } from "gatsby-plugin-mdx"

const Theme = ({ data }) => {
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
        {/*         {data.allMdx.nodes.map(node => (
          <article key={node.id}>
            <h3>
              <Link to={"articles/" + node.slug}>{node.frontmatter.title}</Link>
            </h3>
            <p>{node.frontmatter.date}</p>
            <small>{node.excerpt}</small>
          </article>
        ))} */}
      </Layout>
    </main>
  )
}

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        image {
          childImageSharp {
            gatsbyImageData
          }
        }
        description
      }
      body
    }
  }
`
//TODO

/* allMdx(filter: { frontmatter: { theme: { in: $id } } }) {
      nodes {
        frontmatter {
          title
          image {
            childImageSharp {
              gatsbyImageData
            }
          }
          slug
        }
      }
    } */

export default Theme
