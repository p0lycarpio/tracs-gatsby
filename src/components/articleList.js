import * as React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

export default function ArticleList() {
  const data = useStaticQuery(graphql`
    query {
      allMdx(
        filter: { fileAbsolutePath: { regex: "/articles/" } }
        sort: { fields: frontmatter___date, order: DESC }
        limit: 5
      ) {
        nodes {
          frontmatter {
            date(formatString: "MMMM D, YYYY")
            title
          }
          id
          slug
          excerpt
        }
      }
    }
  `)

  return data.allMdx.nodes.map(node => (
    <article key={node.id}>
      <h3>
        <Link to={"articles/" + node.slug}>{node.frontmatter.title}</Link>
      </h3>
      <p>{node.frontmatter.date}</p>
      <small>{node.excerpt}</small>
    </article>
  ))
}
