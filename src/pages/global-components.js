import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { graphql } from 'gatsby';

export const query = graphql`
{
    allContentfulComponentPage(filter: {globalComponent: {eq: true}}) {
        edges {
            node {
                name
                uid
                version
                status
            }
        }
    }
}
`

const GlobalComponentsPage = ({data}) => {
  const doc = data.allContentfulComponentPage;
  if (!doc) return null;

  const componentsList = doc.edges.map((item, index)  => {
    return (
        <div className="components-list row" key={index}>
            <div className="components-list-item">
                <Link to={`/components/${item.node.uid}`}><h3>{item.node.name}</h3></Link>
                <p><span className="version"><strong>Version:</strong> {item.node.version}</span> <span className="status"><strong>Status:</strong> {item.node.status}</span></p>
            </div>
        </div>
    )
  })
  
  return (
    <Layout>
      <SEO title="Components" />
      <h1>Global Components</h1>
      {componentsList}
      <Link to="/components">All Components</Link>
    </Layout>
  )
}

export default GlobalComponentsPage
