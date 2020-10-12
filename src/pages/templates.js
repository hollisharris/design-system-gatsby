import React from "react"

import Layout from "../components/layout"
import Container from "../components/Container"
import SEO from "../components/seo"
import Hero from "../components/Hero"
import CtaRightRailAccent from "../components/CtaRightRailAccent"
import TemplateCard from '../components/TemplateCard'

import { graphql } from 'gatsby';

export const query = graphql`
  {
    marketing: allContentfulTemplate(filter: {isCollegedept: {in: "Marketing"}}) {
        edges {
            node {
                name
                isCollegedept
                slug
            }
        }
    }
    dept: allContentfulTemplate(filter: {isCollegedept: {in: "Dept/College"}}) {
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
        <TemplateCard key={index} slug={`/templates/${item.node.slug}`} name={item.node.name}/>
    )
  })

  const alphabetizeList = (list) => {
    let newList = list.sort(function(a, b){
      if(a.props.name < b.props.name) { return -1; }
      if(a.props.name > b.props.name) { return 1; }
      return 0;
    })
    return newList
  }

  const deptTemplatesList = docDept.edges.map((item, index)  => {
    return (
        <TemplateCard key={index} slug={`/templates/${item.node.slug}`} name={item.node.name}/>
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
                  <h2>Marketing</h2>
                  <p className="text-mutd">Templates with either no navigation and prefooter placeholders or optional ones</p>
                  <div className="marketing row d-flex">
                    {alphabetizeList(marketingTemplatesList)}
                  </div>  

                  <h2 className="department mt-5">Dept/College</h2>
                  <p className="text-mutd">Templates with navigation and prefooter placeholders</p>
                  <div className="row">
                    {alphabetizeList(deptTemplatesList)}
                  </div>     
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
