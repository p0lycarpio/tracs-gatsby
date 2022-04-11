import * as React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { LocalizedLink, useLocalization } from "gatsby-theme-i18n"

const lngStyles = {
  marginRight: 8,
}

export default function Lang({ slug, page }) {
  const { config } = useLocalization()

  const data = useStaticQuery(
    graphql`
      query {
        allFile(filter: { sourceInstanceName: { eq: "articles" } }) {
          edges {
            node {
              id
              name
              absolutePath
              relativeDirectory
              childMdx {
                id
                frontmatter {
                  slug
                }
                fields {
                  locale
                }
              }
            }
          }
        }
      }
    `
  )

  if (slug) {
    const filtered = data.allFile.edges.filter(node => {
      let slugged = slug.split("/")
      return node.node.relativeDirectory.includes(slugged[0])
    })

    return filtered.map(node => (
      <span key={node.node.id} style={lngStyles}>
        <Link to={"/" + node.node.childMdx.fields.locale + node.node.childMdx.frontmatter.slug}>
          {node.node.childMdx.fields.locale.toUpperCase()}
        </Link>
      </span>
    ))
  } else if (page) {
    return (
      <div>
        {config.map(element => {
          return (
            <span key={element.hrefLang} style={lngStyles}>
              <LocalizedLink to={page} language={element.code}>
                {element.code.toUpperCase()}
              </LocalizedLink>
            </span>
          )
        })}
      </div>
    )
  } else {
    return null
  }
}
