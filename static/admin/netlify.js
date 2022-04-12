import CMS from "netlify-cms-app"
import React from "react"

const ArticlePreview = ({ entry, widgetFor }) => (
  <div title={entry.getIn(["data", "title"])}>
    <h1>{entry.getIn(["data", "title"])}</h1>
    <div>{widgetFor("body")}</div>
  </div>
)

CMS.registerPreviewTemplate("articles", ArticlePreview)
