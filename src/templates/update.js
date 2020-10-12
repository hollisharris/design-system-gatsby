import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Container from "../components/Container"

import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import options from '../components/linkOptions'

export const query = graphql`
query updateQuery($slug: String!) {
    contentfulUpdate(slug: { eq: $slug }) {
        title
        date(formatString: "dddd, MMMM Do, YYYY")
        content {
            json
        }
        slug
    }
}
`

const Update = ({data}) => {
    const doc = data.contentfulUpdate;
    if (!doc) return null;

    return (
        <Layout>
            <SEO title={doc.date} />
            <ol className="breadcrumb border-bottom bg-white">
                <li className="breadcrumb-item"><Link to="/updates/">Updates</Link></li>
                <li className="breadcrumb-item">{doc.date}</li>
            </ol>
            
            <Container>
            <section className="page-content col update-template">
                

                <div className="row">
                    <div className="col-12">
                        

                        <section className="hero">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-lg-12 offset-lg-1">
                                        <h1 className="hero-title">{doc.title}</h1>
                                        {doc.date && <div className="hero-description">{doc.date}</div>}
                                        {/* {doc.description && <div className="hero-description">{doc.description.description}</div>} */}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="col-lg-12">
                        
                    </div>

                    <div className="col-lg-9 richtext">
                        {doc.content && documentToReactComponents(doc.content.json, options)}
                    </div>
                </div>
            </section>
            </Container>
        </Layout>
    )
}

export default Update
