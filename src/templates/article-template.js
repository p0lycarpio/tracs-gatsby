import React, { useEffect, useState } from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "../components/layout"
import { article } from "./article.module.scss"
import { graphql } from "gatsby"
import { useTranslation } from "react-i18next"
import { LocalizedLink } from "gatsby-theme-i18n"

const ArticleTemplate = ({ data }) => {
  const { t } = useTranslation("index")
  const [rendu, setRendu] = useState("")

  const callArticle = (lang, e) => {
    e.preventDefault()
    const translated = data.allMdx.nodes.filter(n => {
      return n.fields.locale.includes(lang)
    })
    setRendu(translated[0])
  }

  if (data.mdx) {
    return (
      <main>
        <Layout article={data.mdx.slug} pageTitle={data.mdx.frontmatter.title}>
          <h1>{data.mdx.frontmatter.title}</h1>
          <p>{data.mdx.frontmatter.date}</p>
          <p>{data.mdx.frontmatter.author}</p>
          <div className={article}>
            <MDXRenderer>{data.mdx.body}</MDXRenderer>
          </div>
        </Layout>
      </main>
    )
  } else {
    if (rendu === "") {
      return (
        <main>
          <Layout>
            <h1>{t("article404")}</h1>
            <div className={article}>
              <p>{t("article404msg")}</p>
              <p>
                {t("dispo")}
                {data.allMdx.nodes.map(article => (
                  <span key={article.id}>
                    <a href="" onClick={e => callArticle(article.fields.locale, e)}>
                      {article.fields.locale.toUpperCase()}
                    </a>
                    {` `}
                  </span>
                ))}
              </p>
            </div>
          </Layout>
        </main>
      )
    } else {
      return (
        <main>
          <Layout article={rendu.slug} pageTitle={rendu.frontmatter.title}>
            <h1>{rendu.frontmatter.title}</h1>
            <MDXRenderer>{rendu.body}</MDXRenderer>
          </Layout>
        </main>
      )
    }
  }
}

export default ArticleTemplate

export const query = graphql`
  query ($locale: String!, $slug: String!) {
    mdx(fields: { locale: { eq: $locale } }, frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        slug
        title
      }
      body
      slug
    }
    allMdx(filter: { frontmatter: { slug: { eq: $slug } } }) {
      nodes {
        fields {
          locale
        }
        frontmatter {
          slug
          lang
          title
        }
        id
        body
        slug
      }
    }
  }
`
