import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Container from "../components/Container"
import SEO from "../components/seo"
import Hero from "../components/Hero"
// import CtaRightRailAccent from "../components/CtaRightRailAccent"

import { graphql } from 'gatsby';

export const query = graphql`
  {
    allContentfulUpdate(sort: {fields: date, order: DESC}) {
        edges {
            node {
                content {
                    json
                }
                date(formatString: "dddd, MMMM Do, YYYY")
                title
                slug
            }
        }
    }
  }
`

const Updates = ({data}) => {
  const doc = data.allContentfulUpdate
//   console.log(doc)

  if (!doc) return null;

    const updatesList = doc.edges.map((item, index)  => {
        return (
          <Link key={index} className="d-block py-4 border-bottom" to={`/updates/${item.node.slug}/`}><h2 className="vertical-listing-title">{item.node.title}</h2>
            {item.node.date && <p className="mb-0 description">{item.node.date}</p>}
          </Link>
        )
    })
  
  return (
    <Layout>
      <SEO title="Updates" />
      <Container>
        <section className="page-content col tutorials">
            <div className="row">
                <Hero title="Updates" description="Quick guides to help you work efficiently in UTA's Sitecore CMS"/>

                <div className="col-lg-9 mx-auto vertical-listing">
                    {updatesList}
                </div>

                {/* <div className="col-lg-3">
                    <CtaRightRailAccent headline="Sign up for Training" description="From Sitecore to Cascade 8 to Campus Press, get the right training for you." url="https://webapps.uta.edu/oittraining/" linkText="Upcoming Classes"/>
                </div> */}
                
            </div>
        </section>
        </Container>
      
    </Layout>
  )
}

export default Updates
