import React, { Fragment } from "react"
import { graphql } from "gatsby"

import ArticleTemplate from "../../templates/article-template"
import ThemeTemplate from "../../templates/theme-template"

const MdxPage = ({
  data,
  data: {
    mdx: {
      frontmatter: { type },
    },
  },
}) => {
  const templates = {
    articles: <ArticleTemplate data={data} />,
    themes: <ThemeTemplate data={data} />,
  }

  return <Fragment>{templates[type] ? templates[type] : null}</Fragment>
}

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        type
        author
        theme
        description
        image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      body
    }
  }
`

export default MdxPage
