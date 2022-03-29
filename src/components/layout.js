import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { container, heading } from './layout.module.scss'
import Nav from './nav/nav.js'

const Layout = ({ pageTitle, children }) => {
    const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className={container}>
      <title>{pageTitle}</title>
      <span className={heading}>{data.site.siteMetadata.title}</span>
      <Nav></Nav>
      <main>
        {children}
      </main>
    </div>
  )
}


export default Layout