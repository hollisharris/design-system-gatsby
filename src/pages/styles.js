import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Hero from '../components/Hero'
import SEO from "../components/seo"

const Styles = ({data}) => {
  
  return (
    <Layout>
      <SEO title="Tutorials" />
        <section className="page-content col">
            <div className="row">
                <Hero title="Styles" />
                
            </div>
        </section>
      
    </Layout>
  )
}

export default Styles
