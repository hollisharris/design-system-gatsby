import React from "react"

import Layout from "../../components/layout"
import Container from "../../components/Container"
import Hero from '../../components/Hero'
import SEO from "../../components/seo"
import StyleNav from "../../components/StyleNav"
import ComponentExample from "../../components/ComponentExample"

const Buttons = ({data}) => {
let buttonHTML = require(`uta-prototype/bundle/html/button.html`);
let buttonSecondaryHTML = require(`uta-prototype/bundle/html/button--secondary.html`);
let buttonGhostHTML = require(`uta-prototype/bundle/html/button--ghost.html`);
  
  return (
    <Layout>
      <SEO title="Buttons" />
      <Container>
        <section className="page-content col">
            <div className="row">
                <Hero title="Buttons" />

                <div className="col-lg-3">
                  <StyleNav />
                </div>

                <div className="col-lg-9">
                    <ComponentExample htmlFile={buttonHTML} />
                    <ComponentExample htmlFile={buttonSecondaryHTML} />
                    <ComponentExample htmlFile={buttonGhostHTML} />
                </div>
            </div>
        </section>
        </Container>
      
    </Layout>
  )
}

export default Buttons
