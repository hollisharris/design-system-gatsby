const path = require(`path`);
const slash = require(`slash`);

exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.html$/i,
          loader: 'html-loader',
        },
      ],
    }
  })
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  // we use the provided allContentfulBlogPost query to fetch the data from Contentful
  return graphql(
    `
      {
        allContentfulComponentPage(filter: {status: {nin: "Deprecated"}}) {
          edges {
            node {
              id
              slug
            }
          }
        }
        allContentfulTutorialPage {
          edges {
            node {
              id
              slug
            }
          }
        }
        allContentfulUpdate {
          edges {
            node {
              id
              slug
            }
          }
        }
        allContentfulTemplate {
          edges {
            node {
              id
              slug
            }
          }
        }
        types: allContentfulComponentPage {
          group(field: category) {
            fieldValue
          }
        }
      }
    `
  ).then(result => {
      if (result.errors) {
        console.log("Error retrieving contentful data",      result.errors);
      }
      // Resolve the paths to our template
      const componentPageTemplate = path.resolve("./src/templates/component.js");
      const tutorialPageTemplate = path.resolve("./src/templates/tutorial.js");
      const templatePageTemplate = path.resolve("./src/templates/template-v2.js");
      const updatePageTemplate = path.resolve("./src/templates/update.js");
      const typePageTemplate = path.resolve("./src/templates/type.js");
      // Then for each result we create a page.
      result.data.allContentfulComponentPage.edges.forEach(edge => {
        createPage({
          path: `/components/${edge.node.slug}/`,
          component: slash(componentPageTemplate),
          context: {
            slug: edge.node.slug,
            id: edge.node.id
          }
        });
      });
      result.data.allContentfulTutorialPage.edges.forEach(edge => {
        createPage({
          path: `/tutorials/${edge.node.slug}/`,
          component: slash(tutorialPageTemplate),
          context: {
            slug: edge.node.slug,
            id: edge.node.id
          }
        });
      });
      result.data.allContentfulTemplate.edges.forEach(edge => {
        createPage({
          path: `/templates/${edge.node.slug}/`,
          component: slash(templatePageTemplate),
          context: {
            slug: edge.node.slug,
            id: edge.node.id
          }
        });
      });
      result.data.allContentfulUpdate.edges.forEach(edge => {
        createPage({
          path: `/updates/${edge.node.slug}/`,
          component: slash(updatePageTemplate),
          context: {
            slug: edge.node.slug,
            id: edge.node.id
          }
        });
      });
      result.data.types.group.forEach(edge => {
        const convertToSlug = (name) => {
          var newSlug = name.toLowerCase();
          newSlug = newSlug.replace(/\s+/g, '-');
          return newSlug
        }
        createPage({
          path: `/components/${convertToSlug(edge.fieldValue)}/`,
          component: slash(typePageTemplate),
          context: {
            name: edge.fieldValue
          }
        });
      });
    })
    .catch(error => {
      console.log("Error retrieving contentful data", error);
    });
};