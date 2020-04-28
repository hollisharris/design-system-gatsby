import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Container from "../components/Container"
import SEO from "../components/seo"

import { INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import ComponentExample from '../components/ComponentExample'

// graphql is at bottom

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

    let placeholders = [
        data.headerReference.edges[0],
        data.heroReference.edges[0],
        data.pageContentReference.edges[0],
        data.leftRailReference.edges[0],
        data.rightRailReference.edges[0],
        data.prefooterReference.edges[0],
    ];
    placeholders = placeholders.filter(x => x !== undefined)

    let combinedPlaceholders = [];
    placeholders.map((template, index) => {
            template.node['placeholder'] = template.node.headerPlaceholder || template.node.pageContentPlaceholder || template.node.heroPlaceholder || template.node.leftRailPlaceholder || template.node.rightRailPlaceholder|| template.node.prefooterPlaceholders;
            
            let sameNameIndex = combinedPlaceholders.findIndex(x => x.slug === template.node.slug);
            // let sameNameIndex;
            
            
            if(sameNameIndex >= 0) {
                return combinedPlaceholders[sameNameIndex].placeholders.push(template.node.placeholder)
            } else {
                return combinedPlaceholders.push({
                    name: template.node.name,
                    slug: template.node.slug,
                    placeholders: [
                        template.node.placeholder
                    ]
                }) 
            }
    })
    console.log(combinedPlaceholders)

    const componentPlaceholders = combinedPlaceholders.map((template, index) => {
        if(template) {
            return (
                <div className="list-group-item px-0" key={index}>
                    <p className="mb-0"><Link to={`/templates/${template.slug}`}><strong>{template.name}</strong></Link><br />
                    <ul>{template.placeholders.map((placeholder, index) => { return <li key={index}>{placeholder}</li>})}</ul>
                    </p>
                </div>
            )
        } else {
            return null
        }
    })


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

                        {!doc.globalComponent && doc.useCases &&
                            <div className="use-cases ">
                                <h5>Use Cases</h5>
                                {documentToReactComponents(doc.useCases.json, options)}
                            </div>
                        }

                        {!doc.globalComponent &&
                            <div className="placeholders">
                                <h5>Templates</h5>
                                {/* {documentToReactComponents(doc.placeholders.json, options)} */}
                                <div className="list-group list-group-flush border-bottom">
                                    {componentPlaceholders}
                                </div>
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
                                            <Link key={index} role="button" className="uta-btn uta-btn-inverse-ghost-secondary" to={`components/${component.slug}`}>{component.name}</Link>
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

export const query = graphql`
query MyQuery($slug: String!) {
    contentfulComponentPage(slug: { eq: $slug }) {
        name
        uid
        useCases {
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
    headerReference: allContentfulTemplate(filter: {
        header: {elemMatch: {slug: {eq: $slug}}}
    }) {
        edges {
          node {
            name
            slug
            headerPlaceholder
          }
        }
    }
    heroReference: allContentfulTemplate(filter: {
        heroComponents: {elemMatch: {slug: {eq: $slug}}}
    }) {
        edges {
          node {
            name
            slug
            heroPlaceholder
          }
        }
    }
    leftRailReference: allContentfulTemplate(filter: {
        leftRailComponents: {elemMatch: {slug: {eq: $slug}}}
    }) {
        edges {
          node {
            name
            slug
            leftRailPlaceholder
          }
        }
    }
    rightRailReference: allContentfulTemplate(filter: {
        rightRailComponents: {elemMatch: {slug: {eq: $slug}}}
    }) {
        edges {
          node {
            name
            slug
            rightRailPlaceholder
          }
        }
    }
    pageContentReference: allContentfulTemplate(filter: {
        pageContentComponents: {elemMatch: {slug: {eq: $slug}}}
    }) {
        edges {
          node {
            name
            slug
            pageContentPlaceholder
          }
        }
    }
    prefooterReference: allContentfulTemplate(filter: {
        prefooterComponents: {elemMatch: {slug: {eq: $slug}}}
    }) {
        edges {
          node {
            name
            slug
            prefooterPlaceholders
          }
        }
    }
}
`