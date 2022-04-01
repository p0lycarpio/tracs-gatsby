import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { container, heading } from "./layout.module.scss"
import Nav from "./nav/nav.js"
import { MdxLink } from "gatsby-theme-i18n"

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

  const components = {
    a: MdxLink,
  }

  return (
    <div className={container}>
      <title>{pageTitle ? pageTitle + " - " + data.site.siteMetadata.title : data.site.siteMetadata.title}</title>
      <span className={heading}>{data.site.siteMetadata.title}</span>
      <Nav></Nav>
      <main components={components}>{children}</main>
    </div>
  )
}

export default Layout
