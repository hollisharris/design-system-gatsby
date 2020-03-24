import React from "react"

import Layout from "../components/layout"
import Container from "../components/Container"
import SEO from "../components/seo"
import Hero from "../components/Hero"
import CtaRightRailAccent from "../components/CtaRightRailAccent"
import ComponentListItem from '../components/ComponentListItem'

import { graphql } from 'gatsby';

export const query = graphql`
  {
    marketing: allContentfulPageLayout(filter: {isCollegedept: {in: "Marketing"}}) {
        edges {
            node {
                name
                isCollegedept
                slug
            }
        }
    }
    dept: allContentfulPageLayout(filter: {isCollegedept: {in: "Dept/College"}}) {
      edges {
          node {
              name
              isCollegedept
              slug
          }
      }
  }
  }
`

const Templates = ({data}) => {
  const doc = data.marketing
  const docDept = data.dept

  if (!doc) return null;

  const marketingTemplatesList = doc.edges.map((item, index)  => {
    return (
        <ComponentListItem key={index} slug={`templates/${item.node.slug}`} name={item.node.name}/>
    )
  })

  const deptTemplatesList = docDept.edges.map((item, index)  => {
    return (
        <ComponentListItem key={index} slug={`templates/${item.node.slug}`} name={item.node.name}/>
    )
  })
    
  return (
    <Layout>
      <SEO title="Templates" />
        <Container>
        <section className="page-content col">
            <div className="row">
                <Hero title="Templates" description="See examples and use cases of UTA's Sitecore templates"/>

                <div className="col-lg-9">
                  <h4>Marketing</h4>
                  {marketingTemplatesList}

                  <h4 style={{marginTop: '2em'}}>Dept/College</h4>
                  {deptTemplatesList}
                </div>     

                <div className="col-lg-3">
                    <CtaRightRailAccent headline="Find a Component" description="Make unique pages using all the components available to you." path="/components" linkText="View all components"/>
                </div>

            </div>
        </section>
        </Container>
      
    </Layout>
  )
}

export default Templates
