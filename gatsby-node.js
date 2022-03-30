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
