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

  const postsBasic = resultsBasic.data.allMdx.edges

  // Create blog post pages.
  console.log("postsBasic!@@@@@@@@@@@@@@", postsBasic)

  // you'll call `createPage` for each result
  postsBasic.forEach(({ node }, index) => {
    // console.log("create!", index)
    // console.log("node.frontmatter", node.frontmatter)
    // console.log("node.fields.slug", node.fields.slug)

    const newPath =
      "/" +
      node.frontmatter.lang +
      "-55" +
      "/clone-apple-music/basic" +
      node.fields.slug

    console.log("newPath", newPath)
    createPage({
      // This is the slug you created before
      // (or `node.frontmatter.slug`)
      path: newPath,
      // This component will wrap our MDX content
      component: path.resolve(`./src/templates/blog-post-layout.js`),
      // You can use the values in this context in
      // our page layout component
      context: {
        id: node.id,
        slug: node.fields.slug,
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
    createNodeField({
      // Individual MDX node
      node,
      // Name of the field you are adding
      name: "slug",
      // Generated value based on filepath with "blog" prefix
      value,
    })
  }
}
