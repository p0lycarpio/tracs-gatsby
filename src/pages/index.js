import * as React from "react"
import Layout from "../components/layout"
import ArticleList from "../components/articleList"
import { useTranslation } from "react-i18next"

const IndexPage = () => {
  const { t } = useTranslation("index")

  return (
    <main>
      <Layout page="/">
        <h1>{t("welcome")}</h1>
        <p>{t("description")}</p>
        <br></br>
        <h2>Articles</h2>
        <ArticleList />
      </Layout>
    </main>
  )
}

export default IndexPage
