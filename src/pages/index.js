import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Hero from "../components/Hero"
import VerticalListing from "../components/VerticalListing"

import { graphql } from 'gatsby';
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

export const query = graphql`
  {
    contentfulLanding {
      hero {
        json
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
            <Hero title="UTA Sitecore Design System" />
           
            <div className="col-lg-9">
              <VerticalListing list={doc.featuredLinks} />
            </div>
        </div>
      </section>
    </Layout>
  )
}

export default IndexPage
