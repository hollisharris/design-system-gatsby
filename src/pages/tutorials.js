import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Hero from "../components/Hero"

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
            <div className="list-item" key={index}>
                <Link to={`/tutorials/${item.node.slug}`}><p className="large">{item.node.title}</p></Link>
                {item.node.description && <p className="description">{item.node.description.description}</p>}
            </div>
        )
    })
  
  return (
    <Layout>
      <SEO title="Tutorials" />
        <section className="page-content col">
            <div className="row">
                <Hero title="Tutorials" description="Quick guides to help you work efficiently in UTA's Sitecore CMS"/>

                <div className="col-lg-9">
                    {tutorialsList}
                </div>

                <div className="col-lg-3">
                    <section class="cta-accent cta-accent__rightrail">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col">
                                    <div class="ghost-header">
                                        <h2 class="ghost-header-title">Sign up for Training</h2>
                                    </div>

                                    <div class="cta-accent-description">
                                        <p>From Sitecore to Cascade 8 to Campus Press, get the right training for</p>
                                    </div>
                                    
                                    <a href="https://webapps.uta.edu/oittraining/" class="uta-btn uta-btn-inverse" role="button"><span>Upcoming Classes</span></a>                    
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                
            </div>
        </section>
      
    </Layout>
  )
}

export default Tutorials
