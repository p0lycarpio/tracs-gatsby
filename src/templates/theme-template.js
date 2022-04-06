import * as React from "react"
import Layout from "../components/layout"
import { GatsbyImage } from "gatsby-plugin-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { graphql } from "gatsby"
import { useTranslation } from "react-i18next"

const ThemeTemplate = ({ data }) => {
  const { t } = useTranslation("index")

  if (data.mdx) {
    return (
      <main>
        <Layout pageTitle={data.mdx.frontmatter.title}>
          <h1>{data.mdx.frontmatter.title}</h1>
          <GatsbyImage
            image={data.mdx.frontmatter.image.childImageSharp.gatsbyImageData}
            alt={data.mdx.frontmatter.title}
          />
          <MDXRenderer>{data.mdx.body}</MDXRenderer>
          <hr></hr>
        </Layout>
      </main>
    )
  } else {
    return (
      <main>
        <Layout>
          <h1>{t("article404")}</h1>
          <div>{t("article404msg")}</div>
        </Layout>
      </main>
    )
  }
}

export default ThemeTemplate

export const query = graphql`
  query ($locale: String!, $slug: String!) {
    mdx(fields: { locale: { eq: $locale } }, frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        slug
        title
        image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      body
      slug
    }
  }
`
