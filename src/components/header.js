import * as React from "react"
import { heading, flex } from "./layout.module.scss"
import Nav from "./nav/nav.js"
import Lang from "./lang"
import SearchBar from "./search"

const Header = ({ article, site, page }) => {
  return (
    <div>
      <div className={flex}>
        <span className={heading}>{site}</span>
        <SearchBar />
        <span>{article ? <Lang slug={article}></Lang> : <Lang page={page}></Lang>}</span>
      </div>
      <Nav />
    </div>
  )
}

export default Header
