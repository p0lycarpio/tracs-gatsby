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
    `gatsby-plugin-netlify`,
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
        },
      },
    },
    {
      // https://github.com/angeloashmore/gatsby-plugin-local-search
      resolve: `gatsby-plugin-local-search`,
      options: {
        name: "articles",
        engine: "flexsearch",
        query: `
          {
            allMdx(filter: { fileAbsolutePath: { regex: "/articles/" }}) {
              nodes {
                id
                frontmatter {
                  title
                  author
                  date
                  slug
                  lang
                }
              }
            }
          }
        `,
        ref: "id", // Unique id
        index: ["title", "author", "theme_id"], // Fields to index
        store: ["title", "id", "lang", "slug", "author"],
        // map the result from the GraphQL query
        normalizer: ({ data }) =>
          data.allMdx.nodes.map(node => ({
            id: node.id,
            slug: node.frontmatter.slug,
            title: node.frontmatter.title,
            author: node.frontmatter.author,
            lang: node.frontmatter.lang,
          })),
      },
      engineOptions: "performance", // options
    },
    {
      // https://github.com/angeloashmore/gatsby-plugin-local-search
      resolve: `gatsby-plugin-local-search`,
      options: {
        name: "themes",
        engine: "flexsearch",
        query: `
          {
            allMdx(filter: { fileAbsolutePath: { regex: "/themes/" }}) {
              nodes {
                id
                frontmatter {
                  title
                  description
                  slug
                }
              }
            }
          }
        `,
        ref: "id", // Unique id
        index: ["title", "description", "theme_id"], // Fields to index
        store: ["title", "id", "slug", "description"],
        // map the result from the GraphQL query
        normalizer: ({ data }) =>
          data.allMdx.nodes.map(node => ({
            id: node.id,
            slug: node.frontmatter.slug,
            title: node.frontmatter.title,
            description: node.frontmatter.description,
          })),
      },
      engineOptions: "default", // options
    },
  ],
}
