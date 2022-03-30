import * as React from "react"
import Layout from "../components/layout"
import ArticleList from "../components/articleList"

const IndexPage = () => {
  return (
    <main>
      <Layout>
        <h1>Bienvenue à bord !</h1>
        <p>Transatlantic Cultures décrypte la mécanique des échanges culturels qui se sont développés, depuis la fin du XVIIIe siècle, entre l’Europe, l’Afrique et les Amériques. Des mathématiques à la makossa, de Frederick Douglass à Gilberto Gil, des Expositions universelles aux Jeux Olympiques, immergez-vous dès maintenant dans la richesse et la diversité des mondes atlantiques.</p>
        <br></br>
        <h2>Articles</h2>
        <ArticleList />
      </Layout>
    </main>
  )
}

export default IndexPage
