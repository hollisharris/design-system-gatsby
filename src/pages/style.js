import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Hero from '../components/Hero'
import SEO from "../components/seo"

const Style = ({data}) => {
  
  return (
    <Layout>
      <SEO title="Style" />
        <section className="page-content col">
            <div className="row">
                <Hero title="Style" />
                
            </div>
        </section>
      
    </Layout>
  )
}

export default Style
