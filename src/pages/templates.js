import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Hero from "../components/Hero"

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

    const templateList = doc.edges.map((item, index)  => {
        return (
            <div className="list-item" key={index}>
                <Link to={`/tutorials/${item.node.slug}`}><p className="large">{item.node.name}</p></Link>
            </div>
        )
    })
  
  return (
    <Layout>
      <SEO title="Tutorials" />
        <section className="page-content col">
            <div className="row">
                <Hero title="Templates" description="UTA's Sitecore available templates"/>

                <div className="col-lg-9">
                    {templateList}
                </div>      
            </div>
        </section>
      
    </Layout>
  )
}

export default Templates
