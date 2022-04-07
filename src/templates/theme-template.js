import * as React from "react"
import Layout from "../components/layout"
import { GatsbyImage } from "gatsby-plugin-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { graphql } from "gatsby"
import { useTranslation } from "react-i18next"
import { useLocalization } from "gatsby-theme-i18n"
import ArticleItem from "../components/articleItem"

const ThemeTemplate = ({ data }) => {
  const { t } = useTranslation("index")
  const { locale } = useLocalization()

  const [articles, setArticles] = React.useState([])

  React.useEffect(() => {
    const results = []

    data.allMdx.group.forEach(article_group => {
      // One locale only
      if (article_group.nodes.length === 1) {
        results.push(article_group.nodes[0])
      }
      // Select user locale
      else {
        let selected_article = undefined
        article_group.nodes.forEach(article => {
          if (article.frontmatter.lang === locale) {
            selected_article = article
          }
        })
        // English fallback
        if (selected_article === undefined) {
          article_group.nodes.forEach(article => {
            if (article.frontmatter.lang === "en") {
              selected_article = article
            }
          })
        }
        // Last fallback
        if (selected_article === undefined) {
          selected_article = article_group.nodes[0]
        }
        // There is a result !
        results.push(selected_article)
      }
    })
    setArticles(results)
  }, [data.allMdx.group, locale])

  const articles_list = articles.map(article => {
    return <ArticleItem article={article} key={article.id} />
  })

  if (data.mdx) {
    return (
      <main>
        <Layout page={data.mdx.frontmatter.slug} pageTitle={data.mdx.frontmatter.title}>
          <h1>{data.mdx.frontmatter.title}</h1>
          <GatsbyImage
            image={data.mdx.frontmatter.image.childImageSharp.gatsbyImageData}
            alt={data.mdx.frontmatter.title}
          />
          <MDXRenderer>{data.mdx.body}</MDXRenderer>
          <hr></hr>
          {articles_list !== 0 ? articles_list : null}
        </Layout>
      </main>
    )
  } else {
    return (
      <main>
        <Layout>
          <h1>{t("article404")}</h1>
          <div>{t("article404msg")}</div>
        </Layout>
      </main>
    )
  }
}

export default ThemeTemplate

export const query = graphql`
  query ($locale: String!, $slug: String!, $theme_id: String!) {
    mdx(fields: { locale: { eq: $locale } }, frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        slug
        title
        image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      body
      slug
    }
    allMdx(filter: { fileAbsolutePath: { regex: "/articles/" }, frontmatter: { theme_id: { eq: $theme_id } } }) {
      group(field: frontmatter___slug) {
        nodes {
          frontmatter {
            date
            title
            slug
            author
            lang
          }
          fields {
            locale
          }
          id
          slug
          excerpt
        }
      }
    }
  }
`
