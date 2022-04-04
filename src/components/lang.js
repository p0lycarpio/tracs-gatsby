import * as React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { LocalizedLink, useLocalization } from "gatsby-theme-i18n"

export default function Lang({ slug, page }) {
  const { config } = useLocalization()
  console.log(config)

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
      console.log(slugged)
      return node.node.relativeDirectory.includes(slugged[0])
    })

    console.log(filtered)

    return filtered.map(node => (
      <span>
        <Link key={node.node.id} to={"/" + node.node.childMdx.fields.locale + node.node.childMdx.frontmatter.slug}>
          {node.node.childMdx.fields.locale.toUpperCase()}
        </Link>
        {` `}
      </span>
    ))
  } else if (page) {
    console.log(config)
    return (
      <div>
        {config.map(element => {
          return (
            <span>
              <LocalizedLink to={page} language={element.code}>
                {element.code.toUpperCase()}
              </LocalizedLink>
              {` `}
            </span>
          )
        })}
      </div>
    )
  } else {
    return null
  }
}
