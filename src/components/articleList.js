import * as React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'

export default function ArticleList() {

    const data = useStaticQuery(graphql`
    query {
      allMdx(sort: {fields: frontmatter___date, order: DESC}) {
        nodes {
          frontmatter {
            date(formatString: "MMMM D, YYYY")
            title
          }
          id
          slug
        }
      }
    }
    `)

    return (
        data.allMdx.nodes.map(node => (
            <article key={node.id}>
                <Link to={"articles/"+ node.slug}>
                    <h3>{node.frontmatter.title}</h3>
                </Link>
                <p>Posted: {node.frontmatter.date}</p>
            </article>
        ))
    )
}
