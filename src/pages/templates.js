import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Hero from "../components/Hero"
import VerticalListing from "../components/VerticalListing"

import { graphql } from 'gatsby';

export const query = graphql`
  {
    allContentfulPageLayout {
        edges {
            node {
                name
                collegedeptLayout
                slug
            }
        }
    }
  }
`

const Templates = ({data}) => {
  const doc = data.allContentfulPageLayout
  console.log(doc)

  if (!doc) return null;
  
  return (
    <Layout>
      <SEO title="Tutorials" />
        <section className="page-content col">
            <div className="row">
                <Hero title="Templates" description="See examples and use cases of UTA's Sitecore templates"/>

                <div className="col-lg-9">
                    <VerticalListing list={doc.edges}/>
                </div>      
            </div>
        </section>
      
    </Layout>
  )
}

export default Templates
