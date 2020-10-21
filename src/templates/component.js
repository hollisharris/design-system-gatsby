import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Container from "../components/Container"
import SEO from "../components/seo"

import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import ComponentExample from '../components/ComponentExample'
import CtaRightRailDetail from '../components/CtaRightRailDetail'
import options from '../components/linkOptions'

// graphql is at bottom

const ComponentPage = ({data}) => {
    const doc = data.contentfulComponentPage;
    if (!doc) return null;

    const alphabetizeList = (list) => {
        let newList = list.sort(function(a, b){
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
        })
        return newList
    }

    let placeholders = [
        data.headerReference.edges,
        data.heroReference.edges,
        data.pageContentReference.edges,
        data.leftRailReference.edges,
        data.rightRailReference.edges,
        data.prefooterReference.edges,
    ];
    placeholders = placeholders.filter(x => x.length > 0);

    let combinedPlaceholders = [];
    // for (const [index, value] of placeholders.entries()) {
    placeholders.forEach((value) => {
        value.forEach((template) => {
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
    });

    combinedPlaceholders = alphabetizeList(combinedPlaceholders);

    const componentPlaceholders = combinedPlaceholders.map((template, index) => {
        if(template) {
            return (
                <div key={index} className="list-group-item flex-column align-items-start pl-0 py-3">
                        <div className="d-flex w-100 justify-content-between mb-1">
                        <Link key={index} to={`/templates/${template.slug}/`} className="text-decoration-none"><h3 className="h5 mb-1">{template.name}</h3></Link>
                        </div>
                        <small className="text-muted text-uppercase">Placeholders <span>({template.placeholders.length})</span></small>
                        <ul className="m-0 mt-1 p-0 list-unstyled">{template.placeholders.map((placeholder, index) => { return <li className="mx-0 px-0" style={{left: 0}} key={index}>{placeholder}</li>})}</ul>
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

    let componentVariationHTML;
    try {
        componentVariationHTML = require(`uta-prototype/bundle/html/${doc.componentUidVariation}.html`);
    } catch(e) {
        componentVariationHTML = '<p>Component not available for previewing</p>';
    }

    const formatTutorialStartTime = (startTime) => {
        if(doc.componentTutorial.tutorialVideoStartTime) {
            let newStart = startTime.split(":");
            let minute = +newStart[0]*60;
            let seconds = +newStart[1];
            return(minute+seconds);
        } else {
            return null
        }
    }

    console.log(doc.defaultMobile )

    return (
        <Layout>
            <SEO title={doc.name} />
            <ol className="breadcrumb border-bottom bg-white">
                <li className="breadcrumb-item"><Link to="/components/">Components</Link></li>
                <li className="breadcrumb-item">{doc.name}</li>
            </ol>
            
            <Container>
            <section className="page-content col component-template">
                <div className="row">
                    <div className="col-12">
                        <section className="hero">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-lg-12 offset-lg-1">
                                        <h1 className="hero-title">{doc.name}</h1>
                                        <div className="hero-description"><strong>Status:</strong> {doc.status}</div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="col-lg-9 mt-0 pt-0 mx-auto">

                        {!doc.globalComponent && doc.useCases &&
                            <div className="richtext use-cases py-3">
                                <h2>About the component</h2>
                                {documentToReactComponents(doc.useCases.json, options)}
                            </div>
                        }

                        {!doc.globalComponent && combinedPlaceholders && combinedPlaceholders.length > 0 &&
                            <div className="richtext placeholders py-3">
                                <h2>Templates</h2>
                                <div className="list-group list-group-flush border-bottom">
                                    {componentPlaceholders}
                                </div>
                            </div>
                        }

                        {!doc.globalComponent && doc.imageSizes &&
                            <div className="richtext placeholders mt-2 py-3">
                                <h2>Image Sizes</h2>
                                {doc.imageSizes.map(size => (
                                    <p className="pb-3" key={`${size.width}x${size.height}`}><strong>{size.width} x {size.height}</strong> <span className="text-muted">pixels</span></p>
                                ))}
                            </div>
                        }
                    </div>

                    <div className="col-lg-3">
                        {!doc.globalComponent && <CtaRightRailDetail
                        headline="Component Details">
                            <p><strong>Rich Text:</strong><br /> {doc.richtext ? 'Yes' : 'No'}</p>
                            <p><strong>Max # of Images:</strong><br /> {doc.images > 0 ? doc.images : 'Images are not supported'}</p>
                            <p><strong>Buttons:</strong><br /> {doc.buttons > 0 ? doc.buttons : 'Buttons are not supported'}</p>
                            <p><strong>Links:</strong><br /> {doc.links}</p>
                            <p><strong>Listing:</strong><br /> {doc.listing}
                            {doc.listing === 'Limited' && doc.listLimit &&
                                ` to ${doc.listLimit}`
                            }
                            </p>
                        </CtaRightRailDetail> }

                        {doc.componentTutorial && <CtaRightRailDetail
                        category="Tutorials"
                        headline={doc.componentTutorial.title}
                        buttonURL={`/tutorials/${doc.componentTutorial.slug}`}
                        buttonText="Read the full tutorial">
                            <div className="pt-3 pb-4" style={{maxWidth: '640px'}}><div style={{position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden'}}><iframe width="640" height="360" title={`Component tutorial for ${doc.name}`}src={`https://web.microsoftstream.com/embed/video/${doc.componentTutorial.tutorialVideoId}?autoplay=false&amp;showinfo=true;${doc.componentTutorial.tutorialVideoStartTime ? `&st=${formatTutorialStartTime(doc.componentTutorial.tutorialVideoStartTime)}` : ''}`} allowFullScreen style={{border:'none', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, height: '100%', maxWidth: '100%'}}></iframe></div></div>
                        </CtaRightRailDetail>}

                    </div>
                </div>

                <div className="my-5">
                    <h2 className="mb-4 text-center">Component Example</h2>
                    <ComponentExample htmlFile={componentHTML} defaultMobile={doc.defaultMobile ? 'mobile' : 'desktop'}/>
                </div>
                
                {doc.componentUidVariation &&
                    <div className="my-5">
                        <h2 className="mb-4 text-center">Component Variation</h2>
                        <ComponentExample htmlFile={componentVariationHTML} defaultMobile={doc.defaultMobile ? 'mobile' : 'desktop'}/>
                    </div>
                 }

                {doc.similarComponents &&
                <section className="related-links">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col" style={{padding: '0'}}>
                                <div className="related-links-wrapper">
                                    <h2 className="related-links-title">Similar Components</h2>
                                    <div className="uta-btn-group">
                                        {doc.similarComponents.map((component, index) => (
                                            <Link key={index} role="button" className="uta-btn uta-btn-inverse-ghost-secondary" to={`/components/${component.slug}`}>{component.name}</Link>
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
        componentUidVariation
        useCases {
            json
        }
        status
        richtext
        listing
        listLimit
        links
        images
        buttons
        globalComponent
        defaultMobile
        componentTutorial {
            tutorialVideoId
            tutorialVideoStartTime
            slug
            title
        }
        imageSizes {
            height
            width
        }
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