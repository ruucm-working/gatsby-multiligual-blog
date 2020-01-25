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

export default function PageTemplate({ data: { current, prev, next } }) {
  const intl = useIntl()
  const featuredImgFluid = current.frontmatter.featuredImg.childImageSharp.fluid
  console.log("current", current)

  return (
    <Layout>
      <SEO title={current.frontmatter.title} />
      <Wrap>
        <ProductCover>
          <CoverRow>
            <ProductNode align="left">
              <Summary
                category={current.frontmatter.category}
                title={current.frontmatter.title}
                desc={current.frontmatter.excerpt}
                float="left"
              />
            </ProductNode>
          </CoverRow>
          <TitleCover>
            <CoverImage
              img={featuredImgFluid}
              mobileImg={featuredImgFluid}
              height="450"
            />
          </TitleCover>
          <CoverFooter>
            <FooterBorder />
            <System.Text
              type="Body-Short-1"
              text="Need Framer X to learn this class"
            />
          </CoverFooter>
        </ProductCover>

        <ProductBody>
          <ProductWrap>
            <ProductArticle>
              <MDXRenderer>{current.body}</MDXRenderer>
            </ProductArticle>
          </ProductWrap>
        </ProductBody>
      </Wrap>

      <StartCouseWrap>
        <BannerWrap>
          <TitleWrap>
            <System.Text
              type="Heading-Short-2"
              align="center"
              text="Clone Apple Music with Framer X"
            />
          </TitleWrap>
          <DesscWrap>
            <System.Text
              type="Body-Short-2"
              align="center"
              text="Learn Framer X start from scratch to making whole Apple Music as same"
            />
          </DesscWrap>
          {current.frontmatter.order === 0 ? (
            userInput.member ? (
              <Link to={next.fields.slug}>
                <System.Button
                  width="130"
                  height="35"
                  type="primary-1"
                  text="Start Course"
                />
              </Link>
            ) : (
              <System.Button
                onClick={() => {
                  setModal({ showModal: true, serviceModalType: "Member" })
                }}
                width="130"
                height="35"
                type="primary-1"
                text="Start Course"
              />
            )
          ) : (
            <PostLinks>
              {userInput.member && prev && (
                <PostLink to={prev.fields.slug}>Prev</PostLink>
              )}
              {userInput.member && next && (
                <PostLink to={next.fields.slug}>Next</PostLink>
              )}
            </PostLinks>
          )}
        </BannerWrap>
      </StartCouseWrap>
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
