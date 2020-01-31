import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { graphql } from 'gatsby'
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

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
    }
}
`

const Tutorial = ({data}) => {
    const doc = data.contentfulTutorialPage;
    if (!doc) return null;

    return (
        <Layout>
            <SEO title={doc.title} />
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
                        <ol className="breadcrumb" style={{backgroundColor: 'transparent', marginLeft: 0, paddingLeft: 0}}>
                            <li className="breadcrumb-item"><Link to="/tutorials">Tutorials</Link></li>
                            <li className="breadcrumb-item">{doc.title}</li>
                        </ol>

                        {doc.pageContent && documentToReactComponents(doc.pageContent.json)}
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Tutorial
