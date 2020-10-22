import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Container from "../components/Container"
import Hero from "../components/Hero"
import Card from "../components/Card"


export const query = graphql`
query componentTypeQuery($name: String!) {
    allContentfulComponentPage(filter: {category: {eq: $name}}) {
        edges {
            node {
                ...componentInfo
            }
        }
    }
}
`

const Type = ({data}) => {
    const doc = data.allContentfulComponentPage;
    if (!doc) return null;

    console.log(doc)

    let components = doc.edges.sort(function(a, b){
        if(a.node.slug < b.node.slug) { return -1; }
        if(a.node.slug > b.node.slug) { return 1; }
        return 0;
    })

    const componentsList = components.map((item, index)  => {
        return (
            <Card
                key={index}
                slug={`/components/${item.node.slug}`}
                name={item.node.name}
                status={item.node.status}
                thumbnail={item.node.thumbnail}
            />
        )
    })

    return (
        <Layout>
            <SEO title={`${doc.edges[0].node.category} Components`}  />

            <ol className="breadcrumb border-bottom bg-white">
                <li className="breadcrumb-item"><Link to="/components/">Components</Link></li>
                <li className="breadcrumb-item">{doc.edges[0].node.category}</li>
            </ol>
            
            <Container>
            <section className="page-content col update-template">
                <div className="row">
                    <Hero title={`${doc.edges[0].node.category} Components`} />

                    <div className="col-lg-12">
                        <div className="row  mt-4">
                            {componentsList}
                        </div>
                    </div>
                </div>
            </section>
            </Container>
        </Layout>
    )
}

export default Type
