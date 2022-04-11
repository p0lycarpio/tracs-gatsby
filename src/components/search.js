import React, { useState } from "react"
import { useFlexSearch } from "react-use-flexsearch"
import { useStaticQuery, graphql } from "gatsby"
import { LocalizedLink } from "gatsby-theme-i18n"

const resultsStyle = {
  position: "absolute",
  listStyle: "none",
  padding: 4,
}

const SearchBar = () => {
  const data = useStaticQuery(graphql`
    query {
      allLocalSearchArticles {
        nodes {
          id
          store
          index
        }
      }
    }
  `)

  const index = data.allLocalSearchArticles.nodes[0].index
  const store = data.allLocalSearchArticles.nodes[0].store

  const [query, setQuery] = useState("")
  const results = useFlexSearch(query, index, store) // https://github.com/angeloashmore/react-use-flexsearch

  return (
    <div style={{ marginTop: 16 }}>
      <input
        value={query}
        onChange={e => {
          setQuery(e.target.value)
        }}
      />
      <ul style={resultsStyle}>
        {results.map(result => (
          <li key={result.id}>
            <LocalizedLink to={result.slug} language={result.lang}>
              {result.title}
            </LocalizedLink>
            <span>{result.lang ? " (" + result.lang + ") " : ""}</span>
            <small>{result.author ? result.author : ""}</small>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SearchBar
