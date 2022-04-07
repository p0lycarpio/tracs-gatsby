import * as React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link } from "gatsby"

const ThemeItem = ({ theme }) => {
  const image = getImage(theme.frontmatter.image)

  return (
    <div>
      <Link to={theme.slug}>
        <GatsbyImage image={image} alt={theme.title} /> <h3>{theme.frontmatter.title}</h3>
      </Link>
    </div>
  )
}

export default ThemeItem
