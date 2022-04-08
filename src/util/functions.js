/**
 * Renvoie dans le même ordre les articles qui sont **uniquement** dans la langue désirée
 * @param {Object} articlesList Liste d'articles de toutes langues
 * @param {String} locale Langue souhaitée. Code à 2 lettres ex: "fr"
 * @returns {Array} Tableau d'objets de tous les articles
 */
export function filterOnlyArticlesByLocale(articlesList, locale) {
  return articlesList.filter(node => node.fields.locale.includes(locale))
}

/**
 * Obtenir une liste d'article dans la langue désirée. Sinon, renvoie l'article dans la langue disponible.
 * @param  {Object} articlesGroupedList Retour de la query GraphQL **grouppée**
 * @param  {String} currentLocale Langue souhaitée. Code à 2 lettres ex: "fr"
 * @return {Array} Tableau d'objets de tous les articles
 */
export function filterArticlesByLocale(articlesGroupedList, currentLocale) {
  const results = []

  articlesGroupedList.forEach(article_group => {
    // One locale only
    if (article_group.nodes.length === 1) {
      results.push(article_group.nodes[0])
    }
    // Select user locale
    else {
      let selected_article = undefined
      article_group.nodes.forEach(article => {
        if (article.frontmatter.lang === currentLocale) {
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
  return results
}

/**
 * Trie une liste d'article par leur titre (ASC) ou leur date (DESC)
 * @param {object} articleList Liste d'articles
 * @param {string} sortMethod "abc" ou "date"
 * @returns Liste triée
 */
export function sortArticles(articleList, sortMethod) {
  if (sortMethod === "abc") {
    return articleList.sort((a, b) => a.frontmatter.title.localeCompare(b.frontmatter.title))
  } else if (sortMethod === "date") {
    return articleList.sort((b, a) => new Date(a.frontmatter.date) - new Date(b.frontmatter.date))
  }
}
