import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Hero from "../components/Hero"
import VerticalListing from "../components/VerticalListing"

import { graphql } from 'gatsby';

export const query = graphql`
  {
    contentfulLanding {
      headline
      description {
        description
      }
      featuredLinks {
        path
        sectionTitle
        sectionDescription {
          sectionDescription
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
      <section className="page-content col">
        <div className="row">
            <Hero title={doc.headline} description={doc.description.description}/>
           
            <div className="col-lg-9">
              <VerticalListing list={doc.featuredLinks} />
            </div>
        </div>
      </section>
    </Layout>
  )
}

export default IndexPage
