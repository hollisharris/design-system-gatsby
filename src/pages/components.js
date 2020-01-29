import React, { useState, useEffect, useCallback } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { graphql } from 'gatsby'

import "./components.scss"

export const query = graphql`
{
    usableComponents: allContentfulComponentPage(filter: {globalComponent: {eq: false}}) {
        edges {
            node {
                name
                slug
                version
                status
                buttons
            }
        }
    }
    globalComponents:allContentfulComponentPage(filter: {globalComponent: {eq: true}}) {
        edges {
            node {
                name
                slug
                version
                status
            }
        }
    }
}
`

const ComponentsPage = ({data}) => {
  const usableComponents = data.usableComponents;
  const globalComponents = data.globalComponents;

  // Filters
  let [buttons, buttonsChecked] = useState(false);
  let [showAll, setShowAll] = useState(true);

  function toggleShowAll() {
      if(buttons) {
        setShowAll(false)
      } else {
        setShowAll(true)
      }
  }

  useEffect(() => {
    toggleShowAll()
  }, [buttons])
  
  const toggleButtonFilter = () => {
    
        buttonsChecked(!buttons)
  };


  if (!usableComponents || !globalComponents) return null;

  const usableComponentsList = usableComponents.edges.map((item, index)  => {
    if(showAll || item.node.buttons && buttons) {
        return (
            <div className="components-list" key={index}>
                <div className="components-list-item">
                    <Link to={`/components/${item.node.slug}`}><p className="large">{item.node.name}</p></Link>
                    <p className="component-details"><span className="version"><strong>Version:</strong> {item.node.version}</span> <span className="status"><strong>Status:</strong> {item.node.status}</span></p>
                </div>
            </div>
        )
    }
  })

  const globalComponentsList = globalComponents.edges.map((item, index)  => {
    return (
        <div className="components-list" key={index}>
            <div className="components-list-item">
                <Link to={`/components/${item.node.slug}`}><p className="large">{item.node.name}</p></Link>
                <p className="component-details"><span className="version"><strong>Version:</strong> {item.node.version}</span> <span className="status"><strong>Status:</strong> {item.node.status}</span></p>
            </div>
        </div>
    )
  })
  
  return (
    <Layout>
      <SEO title="Components" />
      <section className="page-content col">
        <div className="row">
          <div className="col-12">
              <section className="hero">
                  <div className="container-fluid">
                      <div className="row">
                          <div className="col-lg-12 offset-lg-1">
                              <h1 className="hero-title">Components</h1>
                          </div>
                      </div>
                  </div>
              </section>
                    
          <h4 className="list-header">Page Components</h4>
          {usableComponentsList}

          <h4 className="list-header">Global Components</h4>
          {globalComponentsList}
        </div>
        </div>
      </section>

      <div className="filters">
        <h5>Filters</h5>
        <form>
            <label>
                <input type="checkbox" name="richtext" />
                Rich Text
            </label>
            <label>
                <input type="checkbox" name="buttons"  checked={buttons} onChange={toggleButtonFilter}/>
                Buttons
            </label>
            <label>
                Number of Buttons
                <input type="number" name="quantity" min="1" max="2" defaultValue="1"/>
            </label>
        </form>
      </div>
    </Layout>
  )
}

export default ComponentsPage
