import React from "react"

import Layout from "../../components/layout"
import Container from "../../components/Container"
import Hero from '../../components/Hero'
import SEO from "../../components/seo"
import StyleNav from "../../components/StyleNav"
import TypographyCard, { TypographyCardType } from "../../components/Style/TypographyCard"

const Typography = ({data}) => {
  
  return (
    <Layout>
      <SEO title="Typography" />
      <Container>
        <section className="page-content col">
            <div className="row">
                <Hero title="Typography" />

                <div className="col-lg-3">
                  <StyleNav />
                </div>

                <div className="col-lg-9">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-2">
                                <p>Typefaces</p>
                            </div>
                            <div className="col-lg-10">
                                <h1>Bergen Sans</h1>
                                <h1>Helvetica Neue</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-2">
                                <p>Type styles</p>
                            </div>
                            <div className="col-lg-10">
                                <header className="typography-header"> 
                                    <div className="row">
                                        <div className="col-8">
                                            <p>Display sizes</p>
                                        </div>
                                        <div className="col-4">
                                            <p>Spec</p>
                                        </div>
                                    </div>
                                </header>
                                
                                <TypographyCard 
                                    name="Giga"
                                    displayText="Giga | 75"
                                    type={TypographyCardType.GIGA} 
                                    cssStyles={{
                                        fontSize: '75px',
                                        fontWeight: 700,
                                        lineHeight: '94px',
                                        letterSpacing: '2px',
                                        textTransform: 'uppercase',
                                    }}
                                />

                                <TypographyCard 
                                    name="H1"
                                    displayText="H1 | 65"
                                    type={TypographyCardType.H1} 
                                    cssStyles={{
                                        fontSize: '65px',
                                        fontWeight: 700,
                                        lineHeight: '81px',
                                        letterSpacing: '2px'
                                    }}
                                />

                                <TypographyCard 
                                    name="H2"
                                    displayText="H2 | 48"
                                    type={TypographyCardType.H2} 
                                    cssStyles={{
                                        fontSize: '48px',
                                        fontWeight: 700,
                                        lineHeight: '60px',
                                        letterSpacing: '1px'
                                    }}
                                />

                                <TypographyCard 
                                    name="H3"
                                    displayText="H3 | 42"
                                    type={TypographyCardType.H3} 
                                    cssStyles={{
                                        fontSize: '42px',
                                        fontWeight: 700,
                                        lineHeight: '52px',
                                        letterSpacing: '1px'
                                    }}
                                />

                                <TypographyCard 
                                    name="H4"
                                    displayText="H4 | 36"
                                    type={TypographyCardType.H4} 
                                    cssStyles={{
                                        fontSize: '36px',
                                        fontWeight: 700,
                                        lineHeight: '45px',
                                        letterSpacing: '1px'
                                    }}
                                />

                                <TypographyCard 
                                    name="H5"
                                    displayText="H5 | 32"
                                    type={TypographyCardType.H5} 
                                    cssStyles={{
                                        fontSize: '32px',
                                        fontWeight: 700,
                                        lineHeight: '40px',
                                        letterSpacing: '1px'
                                    }}
                                />

                                <TypographyCard 
                                    name="H6"
                                    displayText="H6 | 24"
                                    type={TypographyCardType.H6} 
                                    cssStyles={{
                                        fontSize: '24px',
                                        fontWeight: 700,
                                        lineHeight: '30px',
                                        letterSpacing: '0.5px'
                                    }}
                                />

                                <TypographyCard 
                                    name="H7"
                                    displayText="H7 | 18"
                                    type={TypographyCardType.H7} 
                                    cssStyles={{
                                        fontSize: '18px',
                                        fontWeight: 700,
                                        lineHeight: '22px',
                                        letterSpacing: '0.5px'
                                    }}
                                />

                                <TypographyCard 
                                    name="H8"
                                    displayText="H8 | 16"
                                    type={TypographyCardType.H8} 
                                    cssStyles={{
                                        fontSize: '16px',
                                        fontWeight: 700,
                                        lineHeight: '24px',
                                        letterSpacing: '0.5px'
                                    }}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-10 offset-lg-2">
                                <header className="typography-header"> 
                                    <div className="row">
                                        <div className="col-8">
                                            <p>Display sizes</p>
                                        </div>
                                        <div className="col-4">
                                            <p>Spec</p>
                                        </div>
                                    </div>
                                </header>

                                <TypographyCard 
                                    name="Paragraph"
                                    displayText="Paragraph | 16"
                                    type={TypographyCardType.P} 
                                    cssStyles={{
                                        fontSize: '16px',
                                        fontWeight: 400,
                                        lineHeight: '24px'
                                    }}
                                />

                                <TypographyCard 
                                    name="Super Paragraph"
                                    displayText="Super Paragraph | 18"
                                    type={TypographyCardType.P} 
                                    cssStyles={{
                                        fontSize: '18px',
                                        fontWeight: 400,
                                        lineHeight: '30px',
                                        letterSpacing: '0.5px',
                                    }}
                                />

                                <TypographyCard 
                                    name="Subparagraph"
                                    displayText="Subparagraph | 14"
                                    type={TypographyCardType.P} 
                                    cssStyles={{
                                        fontSize: '14px',
                                        fontWeight: 400,
                                        lineHeight: '17px',
                                        letterSpacing: '0.5px',
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </Container>
      
    </Layout>
  )
}

export default Typography
