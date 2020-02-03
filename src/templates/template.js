import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Hero from '../components/Hero'
import IFrame from '../components/Frame'

import { graphql } from 'gatsby'
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"


export const query = graphql`
query pageLayoutQuery($slug: String!) {
    contentfulPageLayout(slug: { eq: $slug }) {
        collegedeptLayout
        name
        updatedAt
        createdAt
        pageContent {
            json
        }
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
    console.log(doc)

    if (!doc) return null;

    const styles = require('!!css-loader!sass-loader!../scss/main.scss')
    const jsonLayout = JSON.parse(doc.layoutBuilder.internal.content)

    function renderHTML(component) {
        let html;

        try {
            html = require(`uta-prototype/bundle/html/${component}.html`);
        } catch(e) {
            html = '';
        }

        return (<div dangerouslySetInnerHTML={{ __html: html }} />);
    }

    function renderComponents(data) {
        if(data) {
             const id = Math.floor(Math.random() * 50000) + 1;
             const hidePopover = data.hidePopover
             const placeholder = data.placeholder
             const list = data.useable;

             return data.components.map((component, index) => {
                if(hidePopover) {
                    return (
                        <div key={index} className="page-layout__html">
                            {renderHTML(component)}
                        </div>
                    );
                } else {
                    return (
                        <div key={index} className="page-layout__component">
                            <div className="page-layout__description">
                                    {list.length ? (
                                        <div className="dropright">
                                            <button className="uta-btn dropdown-toggle" type="button" id={`dropdown-${id}`} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    {placeholder}
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby={`dropdown-${id}`}>
                                                {/* <p className="dropdown-header">Displayed Component</p>
                                                <Link to={`/components/${this.getFile(component)}#${component}`} className="dropdown-item"><span>{utils.capitalize(this.renderTitle(component))}</span></Link>
                                                <div className="dropdown-divider"></div> */}
                                                <p className="dropdown-header">Placeholder</p>
                                                <p className="dropdown-item">{placeholder}</p>
                                                <div className="dropdown-divider"></div>

                                                <p className="dropdown-header">Displayed Component</p>
                                                <p className="dropdown-item"><span>{component}</span></p>
                                                <div className="dropdown-divider"></div>

                                                <p className="dropdown-header">Useable {list.length > 1 ? 'Components': 'Component'}</p>
                                                {list.map(other => <Link to={`/components/${other}`} key={other} className="dropdown-item"><span>{other}</span></Link>)}
                                            </div>
                                        </div>
                                    ) : <p></p>}
                            </div>
                            <div className="page-layout__html">
                                {renderHTML(component)}
                            </div>
                        </div>
                    );
                }
             })
        }

        return null
    }

    //default
    let header = jsonLayout.header;
    let hero = jsonLayout.hero;
    let left = jsonLayout.left;
    let leftNav = jsonLayout.leftNav;
    let center = jsonLayout.center;
    let right = jsonLayout.right;
    let prefooter = jsonLayout.prefooter;
    let footer = jsonLayout.footer;

    let finalLayout =
    <main>
        <div className="page-layout">
                {renderComponents(header)}
                {renderComponents(hero)}
                {renderComponents(left)}
                {renderComponents(center)}
                {renderComponents(right)}
                {renderComponents(prefooter)}
                {renderComponents(footer)}
        </div>   
    </main>;

    //page types
    if (left && left.components.length && right && right.components.length && !center) {
        finalLayout = 
            <main>
                <div className="page-layout">
                        {renderComponents(hero)}

                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-6">
                                    {renderComponents(left)}
                                </div>
                                <div className="col-lg-6">
                                    {renderComponents(right)}
                                </div>
                            </div>
                        </div>
    
                        {renderComponents(footer)}
                </div>
            </main>;
    }

    if (!left && right && right.components.length && center && center.components.length) {
        finalLayout = 
            <main>
                <div className="page-layout">
                        {renderComponents(hero)}

                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-9">
                                    {renderComponents(center)}
                                </div>
                                <div className="col-lg-3">
                                    {renderComponents(right)}
                                </div>
                            </div>
                        </div>
    
                        {renderComponents(prefooter)}
                        {renderComponents(footer)}
                </div>
            </main>;
    }

    if (!right && left && left.components.length && center && center.components.length) {
        finalLayout = 
            <main>
                <div className="page-layout">
                        {renderComponents(header)}
                        {renderComponents(hero)}

                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-3">
                                    {renderComponents(leftNav)}
                                    {renderComponents(left)}
                                </div>
                                <div className="col-lg-9">
                                    {renderComponents(center)}
                                </div>
                            </div>
                        </div>
    
                        {renderComponents(prefooter)}
                        {renderComponents(footer)}
                </div>
            </main>;
    }

    if (left && left.components.length && right && right.components.length && center && center.components.length) {
        finalLayout = 
            <main>
                <div className="page-layout">
                        {renderComponents(hero)}

                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-6 order-lg-2">
                                    {renderComponents(center)}
                                </div>
                                <div className="col-lg-3 order-lg-3">
                                    {renderComponents(right)}
                                </div>
                                <div className="col-lg-3 order-lg-1">
                                    {renderComponents(leftNav)}
                                    {renderComponents(left)}
                                </div>
                            </div>
                        </div>
    
                        {renderComponents(footer)}
                </div>
            </main>;
    }

    return (
        <Layout>
            <SEO title={doc.name} />
            <section className="page-content col">
                <div className="row">
                    <div className="col-12">
                        <Hero title={doc.name} />

                        <ol className="breadcrumb" style={{backgroundColor: 'transparent', marginLeft: 0, paddingLeft: 0}}>
                            <li className="breadcrumb-item"><Link to="/templates">Templates</Link></li>
                            <li className="breadcrumb-item">{doc.name}</li>
                        </ol>
                    </div>
                </div>

                {doc.pageContent &&
                    <div className="row richtext">
                        <div className="col-12">
                            {documentToReactComponents(doc.pageContent.json)}
                        </div>
                    </div>
                }

                <div className="row">
                    <div className="col-12 component-example">
                        <h5>Template Example</h5>
                        <div className="frame" style={{margin: 'auto', padding: '2rem 2rem 2.5rem'}}>
                            <IFrame html={finalLayout} styles={styles} frameWidth={'100%'} />
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Template