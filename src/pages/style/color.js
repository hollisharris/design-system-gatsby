import React from "react"

import Layout from "../../components/layout"
import Container from "../../components/Container"
import Hero from '../../components/Hero'
import SEO from "../../components/seo"
import StyleNav from "../../components/StyleNav"

const Color = ({data}) => {
  
  return (
    <Layout>
      <SEO title="Color" />
      <Container>
        <section className="page-content col">
            <div className="row">
                <Hero title="Color" />

                <div className="col-lg-3">
                  <StyleNav />
                </div>

                <div className="col-lg-9">

                </div>
            </div>
        </section>
        </Container>
      
    </Layout>
  )
}

export default Color
