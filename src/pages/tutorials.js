import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Container from "../components/Container"
import SEO from "../components/seo"
import Hero from "../components/Hero"
import CtaRightRailAccent from "../components/CtaRightRailAccent"
import './tutorials.scss'

import { graphql } from 'gatsby';

export const query = graphql`
  {
    allContentfulTutorialPage {
        edges {
            node {
                pageContent {
                    json
                }
                title
                description {
                    description
                }
                slug
            }
        }
    }
  }
`

const Tutorials = ({data}) => {
  const doc = data.allContentfulTutorialPage
  console.log(doc)

  if (!doc) return null;

    const tutorialsList = doc.edges.map((item, index)  => {
        return (
            <div className="row align-items-center" key={index}>
                <div className="col-md-7">
                    <Link to={`/tutorials/${item.node.slug}`}><h2 className="vertical-listing-title">{item.node.title}</h2>
                        {item.node.description && <p className="description">{item.node.description.description}</p>}
                    </Link>
                </div>
            </div>
        )
    })
  
  return (
    <Layout>
      <SEO title="Tutorials" />
      <Container>
        <section className="page-content col tutorials">
            <div className="row">
                <Hero title="Tutorials" description="Quick guides to help you work efficiently in UTA's Sitecore CMS"/>

                <div className="col-lg-9 vertical-listing">
                    <div className="container-fluid">
                        {tutorialsList}
                    </div>
                </div>

                <div className="col-lg-3">
                    <CtaRightRailAccent headline="Sign up for Training" description="From Sitecore to Cascade 8 to Campus Press, get the right training for you." url="https://webapps.uta.edu/oittraining/" linkText="Upcoming Classes"/>
                </div>
                
            </div>
        </section>
        </Container>
      
    </Layout>
  )
}

export default Tutorials
