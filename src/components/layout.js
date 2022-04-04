import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { container } from "./layout.module.scss"
import { MdxLink } from "gatsby-theme-i18n"
import Header from "./header"
import { Helmet } from "react-helmet"
import { MDXProvider } from "@mdx-js/react"

const Layout = ({ pageTitle, children, article, page }) => {
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
    <React.Fragment>
      <div className={container}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{pageTitle ? pageTitle + " - " + data.site.siteMetadata.title : data.site.siteMetadata.title}</title>
        </Helmet>
        <Header article={article} page={page} site={data.site.siteMetadata.title} />
        <MDXProvider components={components}>{children}</MDXProvider>
      </div>
    </React.Fragment>
  )
}

export default Layout
