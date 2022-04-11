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
    `gatsby-plugin-react-helmet`,
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
    {
      resolve: `gatsby-theme-i18n`,
      options: {
        defaultLang: `fr`,
        configPath: require.resolve(`./i18n/config.json`),
        prefixDefault: true,
      },
    },
    {
      resolve: `gatsby-theme-i18n-react-i18next`,
      options: {
        locales: `./i18n/react-i18next`,
        i18nextOptions: {
          ns: ["index"],
          defaultNS: ["index"],
        },
      },
    },
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index
        fields: [`title`, `excerpt`, `author`],
        // How to resolve each field`s value for a supported node type
        resolvers: {
          Mdx: {
            title: node => node.frontmatter.title,
            author: node => node.frontmatter.author,
            slug: node => node.frontmatter.slug,
            lang: node => node.frontmatter.lang,
          },
        },
      },
    },
  ],
}
