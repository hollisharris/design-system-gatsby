import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Container from "../components/Container"
import SEO from "../components/seo"

import { graphql } from 'gatsby'
import { INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import ComponentExample from '../components/ComponentExample'

export const query = graphql`
query MyQuery($slug: String!) {
    contentfulComponentPage(slug: { eq: $slug }) {
        name
        uid
        useCases {
            json
        }
        placeholders {
            json
        }
        status
        version
        richtext
        listing
        listLimit
        links
        images
        buttons
        globalComponent
        similarComponents {
            name
            slug
        }
    }
}
`

const options = {
    renderNode: {
      [INLINES.ENTRY_HYPERLINK]: (node) => {
        const { name, slug } = node.data.target.fields;
        if(node.data.target.sys.contentType.sys.id === "componentPage") {
            return <Link to={`components/${slug['en-US']}`}>{name['en-US']}</Link>
        } else if(node.data.target.sys.contentType.sys.id === "tutorialPage") {
            return <Link to={`tutorials/${slug['en-US']}`}>{name['en-US']}</Link>
        } else if(node.data.target.sys.contentType.sys.id === "pageLayout") {
            return <Link to={`templates/${slug['en-US']}`}>{name['en-US']}</Link>
        }
      }
    }
  };

const ComponentPage = ({data}) => {
    const doc = data.contentfulComponentPage;
    if (!doc) return null;

    let componentHTML;

    try {
        componentHTML = require(`uta-prototype/bundle/html/${doc.uid}.html`);
    } catch(e) {
        componentHTML = '<p>Component not available for previewing</p>';
    }

    return (
        <Layout>
            <SEO title="Components" />
            <Container>
            <section className="page-content col">
                <div className="row">
                    <div className="col-12">
                        <section className="hero">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-lg-12 offset-lg-1">
                                        <h1 className="hero-title">{doc.name}</h1>
                                        <div className="hero-description"><strong>Status:</strong> {doc.status} | <strong>Version:</strong> {doc.version}</div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="col-lg-9 richtext">

                        <ol className="breadcrumb" style={{backgroundColor: 'transparent', marginLeft: 0, paddingLeft: 0}}>
                            <li className="breadcrumb-item"><Link to="/components">Components</Link></li>
                            <li className="breadcrumb-item">{doc.name}</li>
                        </ol>

                        {doc.useCases && !doc.globalComponent &&
                            <div className="use-cases ">
                                <h5>Use Cases</h5>
                                {documentToReactComponents(doc.useCases.json, options)}
                            </div>
                        }

                        {doc.placeholders && !doc.globalComponent &&
                            <div className="placeholders">
                                <h5>Placeholders</h5>
                                {documentToReactComponents(doc.placeholders.json, options)}
                            </div>
                        }
                    </div>

                    <div className="col-lg-3">
                        {!doc.globalComponent &&
                        <section className="cta-detail">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col">
                                        <h2 className="cta-detail-title">Component Details</h2>
                                        <div className="cta-detail-description">
                                            <p><strong>Rich Text:</strong><br /> {doc.richtext ? 'Yes' : 'No'}</p>
                                            <p><strong>Max # of Images:</strong><br /> {doc.images > 0 ? doc.images : 'Images are not supported'}</p>
                                            <p><strong>Buttons:</strong><br /> {doc.buttons > 0 ? doc.buttons : 'Buttons are not supported'}</p>
                                            <p><strong>Links:</strong><br /> {doc.links}</p>
                                            <p><strong>Listing:</strong><br /> {doc.listing}
                                            {doc.listing === 'Limited' && doc.listLimit &&
                                                ` to ${doc.listLimit}`
                                            }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        }
                    </div>
                </div>

                 
                <h5>Component Example</h5>
                <ComponentExample htmlFile={componentHTML} />

                {doc.similarComponents &&
                <section className="related-links" style={{marginTop: '2em'}}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col" style={{padding: '0'}}>
                                <div className="related-links-wrapper">
                                    <h2 className="related-links-title">Similar Components</h2>
                                    <div className="uta-btn-group">
                                        {doc.similarComponents.map((component, index) => (
                                            <Link role="button" className="uta-btn uta-btn-inverse-ghost-secondary" to={`components/${component.slug}`}>{component.name}</Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                }

            </section>
            </Container>
            
        </Layout>
    )
}

export default ComponentPage
