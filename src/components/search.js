import React, { Component } from "react"
import { Index } from "elasticlunr"
import { LocalizedLink } from "gatsby-theme-i18n"

const resultsStyle = {
  position: "absolute",
  listStyle: "none",
  padding: 4,
}

// Search component
export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ``,
      results: [],
    }
  }

  render() {
    return (
      <div style={{ marginTop: 16 }}>
        <input type="text" value={this.state.query} onChange={this.search} />
        <ul style={resultsStyle}>
          {this.state.results.map(page => (
            <li key={page.id}>
              <LocalizedLink to={page.slug} language={page.lang}>
                {page.title}
              </LocalizedLink>
              <span>{page.lang ? " (" + page.lang + ") " : ""}</span>
              <small>{page.author ? page.author : ""}</small>
            </li>
          ))}
        </ul>
      </div>
    )
  }
  getOrCreateIndex = () =>
    this.index
      ? this.index
      : // Create an elastic lunr index and hydrate with graphql query results
        Index.load(this.props.searchIndex)

  search = evt => {
    const query = evt.target.value
    this.index = this.getOrCreateIndex()
    this.setState({
      query,
      // Query the index with search string to get an [] of IDs
      results: this.index
        .search(query, { expand: true }) // Accept partial matches
        // Map over each ID and return the full document
        .map(({ ref }) => this.index.documentStore.getDoc(ref)),
    })
  }
}
