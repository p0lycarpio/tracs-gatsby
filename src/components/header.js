import * as React from "react"
import { heading, flex } from "./layout.module.scss"
import Nav from "./nav/nav.js"
import Lang from "./lang"
import { StaticQuery, graphql } from "gatsby"
import Search from "./search"

const top = {
  marginTop: 16,
}

const Header = ({ article, site, page }) => (
  <StaticQuery
    query={graphql`
      query SearchIndexQuery {
        siteSearchIndex {
          index
        }
      }
    `}
    render={data => (
      <div>
        <div>
          <div className={flex}>
            <span className={heading}>{site}</span>
            <Search searchIndex={data.siteSearchIndex.index} />
            <span style={top}>{article ? <Lang slug={article}></Lang> : <Lang page={page}></Lang>}</span>
          </div>
          <Nav />
        </div>{" "}
      </div>
    )}
  />
)

export default Header
