/* exports.createPages = ({ actions: { createPage } }) => {
    const themes = require('./content/themes/themes.json')

    themes.forEach(theme => {

        createPage({
            path: `/themes/${theme.slug}/`,
            component: require.resolve("./src/pages/themes/theme.js"),
            context: {
                title: theme.title,
                description: theme.description,
                image: theme.image
            }
        })
    })
}*/

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const blogTemplate = require.resolve(`./src/templates/blog-template.js`)

  const result = await graphql(`
    {
      blog: allFile(filter: { sourceInstanceName: { eq: "articles" } }) {
        nodes {
          childMdx {
            frontmatter {
              type
              slug
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(result.errors)
    return
  }

  const blogPosts = result.data.blog.nodes

  blogPosts.forEach(({ childMdx: node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: blogTemplate,
      context: {
        slug: node.frontmatter.slug,
      },
    })
  })
}
