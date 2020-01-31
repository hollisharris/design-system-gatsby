import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Hero from '../components/Hero'

import { graphql } from 'gatsby'
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

export const query = graphql`
query pageLayoutQuery($slug: String!) {
    contentfulPageLayout(slug: { eq: $slug }) {
        collegedeptLayout
        name
        updatedAt
        createdAt
        layoutBuilder {
            id
            internal {
              content
            }
        }
    }
}
`

const Template = ({data}) => {
    const doc = data.contentfulPageLayout;
    if (!doc) return null;

    let jsonLayout = doc.layoutBuilder.internal.content
    jsonLayout = JSON.parse(jsonLayout)
    console.log(jsonLayout);

    return (
        <Layout>
            <SEO title={doc.name} />
            <section className="page-content col">
                <div className="row">
                    <Hero title={doc.name} />

                    <ol className="breadcrumb" style={{backgroundColor: 'transparent', marginLeft: 0, paddingLeft: 0}}>
                        <li className="breadcrumb-item"><Link to="/templates">Templates</Link></li>
                        <li className="breadcrumb-item">{doc.name}</li>
                    </ol>
                </div>
            </section>
        </Layout>
    )
}

export default Template
