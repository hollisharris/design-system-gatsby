import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

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
  const featuredLinksMap = doc.featuredLinks;
  if (!doc) return null;

  const featuredLinks = featuredLinksMap.map((item, index)  => {
    return (
        <div className="featured-links row" key={index}>
            {item.path && <div className="featured-link">
            <Link to={item.path}><h3>{item.sectionTitle}</h3></Link>
              <p>{item.sectionDescription.sectionDescription}</p>
            </div>
            }
        </div>
    )
  })
  
  return (
    <Layout>
      <SEO title="Home" />
      {documentToReactComponents(doc.hero.json)}
      {featuredLinks}
    </Layout>
  )
}

export default IndexPage
