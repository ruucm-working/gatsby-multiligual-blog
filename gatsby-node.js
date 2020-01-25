const { createFilePath } = require("gatsby-source-filesystem")
const path = require("path")

// Programmatically create the pages for browsing blog posts (Create Page!)
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  /**
   * Basic Contents
   */
  const resultsBasic = await graphql(`
    query {
      allMdx(
        sort: { fields: [frontmatter___order], order: ASC }
        filter: { frontmatter: { type: { eq: "basic" }, lang: { eq: "ko" } } }
      ) {
        edges {
          node {
            id
            excerpt(pruneLength: 250)
            frontmatter {
              title
              author
              lang
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  // Handle errors
  if (resultsBasic.errors) {
    reporter.panicOnBuild(`🚨 Error while running GraphQL(resultsBasic) query.`)
    return
  }
  console.log("resultsBasic", resultsBasic)
  // you'll call `createPage` for each result
  resultsBasic.data.allMdx.edges.forEach(({ node }, index) => {
    let slug = node.fields.slug
    createPage({
      path: slug,
      // This component will wrap our MDX content
      component: path.resolve(`./src/templates/blog-post-layout.js`),
      context: {
        id: node.id,
        slug: slug,
        prev: index - 1,
        next: index + 1,
        type: "basic",
      },
    })
  })
}

// Create Slug!
exports.onCreateNode = async ({
  node,
  actions,
  getNode,
  store,
  cache,
  createNodeId,
}) => {
  const { createNodeField, createNode } = actions
  if (node.internal.type === "Mdx") {
    const value = createFilePath({ node, getNode })
    const newSlug =
      "/" + node.frontmatter.lang + "-55" + "/clone-apple-music/basic" + value
    createNodeField({
      // Individual MDX node
      node,
      // Name of the field you are adding
      name: "slug",
      // Generated value based on filepath with "blog" prefix
      value: newSlug,
    })
  }
}
