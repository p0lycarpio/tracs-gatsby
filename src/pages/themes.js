import * as React from "react"
import Layout from "../components/layout"
import ThemeItem from "../components/themeItem"
import { useStaticQuery, graphql } from "gatsby"

const Themes = () => {
  const data = useStaticQuery(graphql`
    query {
      allMdx(filter: { fileAbsolutePath: { regex: "/themes/" } }) {
        nodes {
          frontmatter {
            title
            image {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          id
          slug
        }
      }
    }
  `)

  return (
    <main>
      <Layout pageTitle="Thèmes">
        <h1>Thèmes</h1>
        {data.allMdx.nodes.map((data, index) => (
          <div key={`content_item_${index}`}>
            <ThemeItem theme={data}></ThemeItem>
          </div>
        ))}
      </Layout>
    </main>
  )
}

export default Themes
