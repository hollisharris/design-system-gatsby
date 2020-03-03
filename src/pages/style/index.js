import React from "react"
import { Link } from 'gatsby' 

import Layout from "../../components/layout"
import Hero from '../../components/Hero'
import SEO from "../../components/seo"
import CtaAccent from "../../components/CtaAccent"

const Style = ({data}) => {
  
  return (
    <Layout>
      <SEO title="Style" />
        <section className="page-content">
                <Hero title="Style" />

                  <section className="cta-linklist">
                    <div className="container-fluid">
                      <div className="row align-items-center">
                        <div className="col-lg-6 offset-lg-1">
                          <p className="cta-linklist-category">Cohesion &amp; Consistency</p>
                          <h2 className="cta-linklist-title">UTA Web Styles</h2>
                          <p className="cta-linkklist-description">Introduce cohesion and consistency to UTA’s web presence in order to strengthen UTA’s brand identity and recognition as the model 21st-Century Urban Research University and
improve the overall user experience.</p>
                        </div>
                        <div className="col-lg-4 offset-lg-1">
                          <ul className="list-unstyled">
                            <li>
                              <Link to="/style/icons" role="button" className="uta-btn uta-btn-ghost-secondary"><span>Iconography</span></Link>

                            </li>
                            <li>
                              <Link to="/style/typography" role="button" className="uta-btn uta-btn-ghost-secondary"><span>Typography</span></Link>

                            </li>
                            <li>
                                <Link to="/style/buttons" role="button" className="uta-btn uta-btn-ghost-secondary"><span>Buttons</span></Link>

                              </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </section>

                  <CtaAccent headline="UTA Brand Identity Guidelines" description="A resource for proper usage of the UTA visual identity system" url="https://www.uta.edu/identity" linkText="Identity Guidelines"/>

        </section>
      
    </Layout>
  )
}

export default Style
