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

  const [articles, setArticles] = React.useState("")

  React.useEffect(() => {
    if (data.allMdx.nodes.length !== 0) {
      // Build array of uniques articles
      let uniqueArticles = []
      /*       data.allMdx.nodes.forEach(article => {
        // Find if an article is translated
        let translated = data.allMdx.nodes.filter(
          obj =>
            obj.frontmatter.lang === "fr" ||
            (article.frontmatter.slug !== obj.frontmatter.slug && obj.frontmatter.lang !== "fr")
        )
        console.log(translated)
        translated.forEach((el, i) => {
          if (uniqueArticles[i].slug.indexOf(el.frontmatter.slug) === -1) {
            uniqueArticles.push(el)
          }
        })
      }) */

      uniqueArticles = data.allMdx.nodes.filter(art => art.frontmatter.lang === useLocalization)

      const listArt = uniqueArticles.map(article => <ArticleItem article={article}></ArticleItem>)

      setArticles(listArt)
    }
  }, [data.allMdx.nodes])

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
          {articles !== 0 ? articles : null}
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
`
