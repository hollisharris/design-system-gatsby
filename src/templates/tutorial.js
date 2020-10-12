import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Container from "../components/Container"
import CtaRightRailDetail from "../components/CtaRightRailDetail"

import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import options from '../components/linkOptions'

export const query = graphql`
query tutorialQuery($slug: String!) {
    contentfulTutorialPage(slug: { eq: $slug }) {
        pageContent {
            json
        }
        title
        description {
            description
        }
        slug
        tutorialVideoId
        tutorialVideoStartTime
        componentReference {
            imageSizes {
              width
              height
            }
            name
            slug
          }
    }
}
`

const Tutorial = ({data}) => {
    const doc = data.contentfulTutorialPage;
    if (!doc) return null;

    const formatTutorialStartTime = (startTime) => {
        if(doc.tutorialVideoStartTime) {
            let newStart = startTime.split(":");
            let minute = +newStart[0]*60;
            let seconds = +newStart[1];
            return(minute+seconds);
        } else {
            return null
        }
    }

    return (
        <Layout>
            <SEO title={doc.title} />
            <ol className="breadcrumb border-bottom bg-white">
                <li className="breadcrumb-item"><Link to="/tutorials/">Tutorials</Link></li>
                <li className="breadcrumb-item">{doc.title}</li>
            </ol>
            <Container>
            <section className="page-content col">
                <div className="row">
                    <div className="col-12">
                        <section className="hero">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-lg-12 offset-lg-1">
                                        <h1 className="hero-title">{doc.title}</h1>
                                        {doc.description && <div className="hero-description">{doc.description.description}</div>}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="col-lg-9 richtext">
                        {doc.pageContent && documentToReactComponents(doc.pageContent.json, options)}

                        {doc.componentReference && <section className="related-links mt-5">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col" style={{padding: '0'}}>
                                        <div className="related-links-wrapper">
                                            <h2 className="related-links-title">More about the component</h2>
                                            <div className="uta-btn-group">
                                                    <Link role="button" className="uta-btn uta-btn-inverse-ghost-secondary" to={`/components/${doc.componentReference.slug}`}>{doc.componentReference.name}</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>}
                    </div>

                    <div className="col-lg-3">
                        {doc.tutorialVideoId && <CtaRightRailDetail
                        headline="Video Tutorial"
                        >
                            <div className="pt-3 pb-4" style={{maxWidth: '640px'}}><div style={{position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden'}}><iframe width="640" height="360" title={doc.title}src={`https://web.microsoftstream.com/embed/video/${doc.tutorialVideoId}?autoplay=false&amp;showinfo=true;${doc.tutorialVideoStartTime ? `&st=${formatTutorialStartTime(doc.tutorialVideoStartTime)}` : ''}`} allowFullScreen style={{border:'none', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, height: '100%', maxWidth: '100%'}}></iframe></div></div>
                        </CtaRightRailDetail>}

                        {doc.componentReference && doc.componentReference.imageSizes.length > 0 && <CtaRightRailDetail
                        headline="Image Sizes"
                        >
                            {doc.componentReference.imageSizes.map(size => (
                                <p className="pb-3" key={`${size.width}x${size.height}`}><strong>{size.width} x {size.height}</strong> <span className="text-muted">pixels</span></p>
                            ))}
                        </CtaRightRailDetail>}
                    </div>
                </div>
            </section>
            </Container>
        </Layout>
    )
}

export default Tutorial
