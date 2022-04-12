exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage, createRedirect } = actions

  createRedirect({
    fromPath: `/`,
    toPath: `/fr`,
    exactPath: true,
    redirectInBrowser: true,
    isPermanent: false,
  })

  const articleTemplate = require.resolve(`./src/templates/article-template.js`)
  const themeTemplate = require.resolve(`./src/templates/theme-template.js`)

  const result = await graphql(`
    {
      allMdx: allFile {
        nodes {
          sourceInstanceName
          childMdx {
            frontmatter {
              type
              slug
              theme_id
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

  const dataResult = result.data.allMdx.nodes

  dataResult.forEach(node => {
    if (node.sourceInstanceName === "articles") {
      createPage({
        path: node.childMdx.frontmatter.slug,
        component: articleTemplate,
        context: {
          slug: node.childMdx.frontmatter.slug,
        },
      })
    } else if (node.sourceInstanceName === "themes" && node.childMdx != null) {
      createPage({
        path: node.childMdx.frontmatter.slug,
        component: themeTemplate,
        context: {
          slug: node.childMdx.frontmatter.slug,
          theme_id: node.childMdx.frontmatter.theme_id,
        },
      })
    }
  })
}
