import React from "react"

import Layout from "../../components/layout"
import Hero from '../../components/Hero'
import SEO from "../../components/seo"
import StyleNav from "../../components/StyleNav"

const Style = ({data}) => {
  
  return (
    <Layout>
      <SEO title="Style" />
        <section className="page-content col">
            <div className="row">
                <Hero title="Style" />

                <div className="col-lg-3">
                  <StyleNav />
                </div>

                <div className="col-lg-9">

                </div>

                
                
            </div>
        </section>
      
    </Layout>
  )
}

export default Style
