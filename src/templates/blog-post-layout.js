import React, { useEffect } from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import { Link } from "gatsby-plugin-intl"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { useIntl } from "gatsby-plugin-intl"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Wrap = styled.div`
  padding-top: 134px;
  width: 100%;
`
const Title = styled.h1``

export default function PageTemplate({ data: { current, prev, next } }) {
  const intl = useIntl()
  const featuredImgFluid = current.frontmatter.featuredImg.childImageSharp.fluid
  console.log("current", current)

  return (
    <Layout>
      <SEO title={current.frontmatter.title} />
      <Wrap>
        <Title>{current.frontmatter.title}</Title>
        <MDXRenderer>{current.body}</MDXRenderer>
      </Wrap>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostQuery(
    $slug: String!
    $prev: Int!
    $next: Int!
    $type: String!
  ) {
    current: mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      frontmatter {
        title
        order
        category
        excerpt
        featuredImg {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        lang
      }
      fields {
        slug
      }
    }
    prev: mdx(frontmatter: { order: { eq: $prev }, type: { eq: $type } }) {
      id
      frontmatter {
        title
        order
      }
      fields {
        slug
      }
    }
    next: mdx(frontmatter: { order: { eq: $next }, type: { eq: $type } }) {
      id
      frontmatter {
        title
        order
      }
      fields {
        slug
      }
    }
  }
`
