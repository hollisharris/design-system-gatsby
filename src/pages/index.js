import React from "react"

import Layout from "../components/layout"
import Container from "../components/Container"
import SEO from "../components/seo"
import Hero from "../components/Hero"
import VerticalListing from "../components/VerticalListing"
import LatestUpdate from "../components/LatestUpdate"

import { graphql } from 'gatsby';

export const query = graphql`
  {
    contentfulLanding {
      headline
      description {
        description
      }
      featuredLinks {
        sectionTitle
        path
        sectionDescription {
          sectionDescription
        }
        sectionImage {
          title
          fluid(maxWidth: 300) {
              ...GatsbyContentfulFluid_tracedSVG
          }
          file {
            url
          }
        }
      }
    }
  }
`

const IndexPage = ({data}) => {
  const doc = data.contentfulLanding

  if (!doc) return null;
  
  return (
    <Layout>
      <SEO title="Home" />
      <Container>
      <section className="page-content col">
        <div className="row">
            <Hero title={doc.headline} description={doc.description.description}/>
           
            <div className="col-lg-9  mx-auto">
              <LatestUpdate />
              <VerticalListing list={doc.featuredLinks} />
            </div>
        </div>
      </section>
      </Container>
    </Layout>
  )
}

export default IndexPage
