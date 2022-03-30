module.exports = {
  siteMetadata: {
    title: `Transatlantic Cultures`,
    siteUrl: `https://transatlantic-cultures.org/`,
    description: `Programme de recherche international sur la culture`,
  },

  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-image`,
    `gatsby-plugin-mdx`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `articles`,
        path: `${__dirname}/content/articles/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `themes`,
        path: `${__dirname}/content/themes/`,
      },
    },
  ],
}
