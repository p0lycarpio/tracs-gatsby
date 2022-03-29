import * as React from "react"
import Layout from "../../components/layout"
import { useStaticQuery, graphql, Link } from 'gatsby'


const Articles = () => {

  const data = useStaticQuery(graphql`
  query {
    allMdx(sort: {fields: frontmatter___title, order: ASC}) {
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

  return(
  <main>
  <Layout pageTitle="Articles">
    <h1>Articles de A à Z</h1>
    
    {data.allMdx.nodes.map(node => (
            <article key={node.id}>
                <Link to={node.slug}>
                    <h3>{node.frontmatter.title}</h3>
                </Link>
                <p>Posted: {node.frontmatter.date}</p>
            </article>
        ))
    }
  </Layout>
</main>
  )
}

export default Articles