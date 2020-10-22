import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Container from "../components/Container"
import SEO from "../components/seo"
import Hero from '../components/Hero'
import IFrame from '../components/Frame'
import CtaRightRailDetail from '../components/CtaRightRailDetail'
import TemplateIcon from '../components/TemplateIcon'

import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import options from '../components/linkOptions'

export const query = graphql`
query pageLayoutV2Query($slug: String!) {
    contentfulTemplate(slug: { eq: $slug }) {
        isCollegedept
        name
        updatedAt
        createdAt
        pageContent {
            json
        }
        headerPlaceholder
        header {
            name
            slug
            uid
        }
        heroPlaceholder
        heroComponents {
            name
            slug
            uid
        }
        pageContentPlaceholder
        pageContentComponentsVisible
        pageContentComponents {
            name
            slug
            uid
        }
        rightRailPlaceholder
        rightRailComponentsVisible
        rightRailComponents {
            name
            slug
            uid
        }
        leftRailPlaceholder
        leftRailComponentsVisible
        leftRailComponents {
            name
            slug
            uid
        }
        prefooterPlaceholders
        prefooterComponents {
            name
            slug
            uid
        }
    }
}
`

const Template = ({data}) => {
    const doc = data.contentfulTemplate;
    console.log(doc)

    if (!doc) return null;

    const styles = require('!!css-loader!sass-loader!../scss/main.scss')

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
        const components = data.components;
        const placeholder = data.placeholder;
        const visible = data.visible;

        if(components) {
             const id = Math.floor(Math.random() * 50000) + 1;
            //  const hidePopover = data.hidePopover
            let visibleComponents;
            if(visible) {
                // Limit displayed components
                visibleComponents = components.filter((component, index) => index <= (visible - 1));
            } else {    
                // Display first component
                visibleComponents = [components[0]];
            }
            

             return visibleComponents.map((component, index) => {
                    let useableComponents = components.filter((other, index) => other.slug !== component.slug);

                    useableComponents = useableComponents.sort(function(a, b){
                        if(a.slug < b.slug) { return -1; }
                        if(a.slug > b.slug) { return 1; }
                        return 0;
                    })

                    return (
                        <div key={index} className="page-layout__component">
                            <div className="page-layout__description">
                                    {components.length && placeholder ? (
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
                                                <Link to={`/components/${component.slug}/`} className="dropdown-item"><span>{component.name}</span></Link>
                                                {useableComponents.length > 0 &&
                                                    <>
                                                        <div className="dropdown-divider"></div>
                                                        <p className="dropdown-header">Useable {useableComponents.length > 1 ? 'Components': 'Component'}</p>
                                                        {useableComponents.map(other => <Link to={`/components/${other.slug}/`} key={other.slug} className="dropdown-item"><span>{other.name}</span></Link>)}
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    ) : <p></p>}
                            </div>
                            <div className="page-layout__html">
                                {renderHTML(component.uid)}
                            </div>
                        </div>
                    );
             })
        }

        return null
    }

    //default
    let header = {
        components: [{
            uid: "header"
        }]
    };
    let navigation = {
        components: doc.header,
        placeholder: doc.headerPlaceholder
    };
    let hero = {
        components: doc.heroComponents,
        placeholder: doc.heroPlaceholder
    };
    // let left = {
    //     components: doc.header,
    //     placeholder: doc.headerPlaceholder
    // };
    let center = {
        components: doc.pageContentComponents,
        placeholder: doc.pageContentPlaceholder,
        visible: doc.pageContentComponentsVisible
    };
    let left = {
        components: doc.leftRailComponents,
        placeholder: doc.leftRailPlaceholder,
        visible: doc.leftRailComponentsVisible
    };
    let right = {
        components: doc.rightRailComponents,
        placeholder: doc.rightRailPlaceholder,
        visible: doc.rightRailComponentsVisible
    };
    let prefooter = {
        components: doc.prefooterComponents,
        placeholder: doc.prefooterPlaceholders
    };
    let footer = {
        components: [{
            uid: "footer"
        }]
    };

    let finalLayout =
    <main>
        <div className="page-layout">
                {renderComponents(header)}
                {renderComponents(navigation)}
                {renderComponents(hero)}
                {renderComponents(left)}
                {renderComponents(center)}
                {renderComponents(right)}
                {renderComponents(prefooter)}
                {renderComponents(footer)}
        </div>   
    </main>;

    //page types

    // Section Landing
    if (left.components && right.components && !center.components) {
        finalLayout = 
            <main>
                <div className="page-layout">
                        {renderComponents(header)}
                        {renderComponents(navigation)}
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
    
                        {renderComponents(prefooter)}
                        {renderComponents(footer)}
                </div>
            </main>;
    }

    // Experience Right Rail
    if (!left.components && right.components && center.components) {
        finalLayout = 
            <main>
                <div className="page-layout">
                        {renderComponents(header)}
                        {renderComponents(navigation)}
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

    // Detail page
    if (!right.components && left.components && center.components) {
        finalLayout = 
            <main>
                <div className="page-layout">
                        {renderComponents(header)}
                        {renderComponents(navigation)}
                        {renderComponents(hero)}

                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-3">
                                    {renderComponents({
                                        components: [
                                            {
                                                uid: 'interior-nav'
                                            }
                                        ],
                                        visible: 1,
                                        placeholder: null
                                    })}
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

    // Experience Interior with Nav
    if (left.components && right.components && center.components) {
        finalLayout = 
            <main>
                <div className="page-layout">
                        {renderComponents(header)}
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
                                    {/* {renderComponents(leftNav)} */}
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
            <ol className="breadcrumb border-bottom bg-white">
                <li className="breadcrumb-item"><Link to="/templates">Templates</Link></li>
                <li className="breadcrumb-item">{doc.name}</li>
            </ol>
            
            <Container>
            <section className="page-content col">
                <div className="row">
                    <div className="col-12">
                        <Hero title={doc.name} />
                    </div>
                </div>

                    <div className="row ">
                        <div className="col-9">
                            {doc.pageContent && <div className="richtext">
                                <h2>About the template</h2>
                                {documentToReactComponents(doc.pageContent.json, options)}
                            </div>}

                            <div className="richtext py-3">
                                <h2>Placeholders</h2>
                                {/* {documentToReactComponents(doc.placeholders.json, options)} */}
                                <ul className="px-0 mx-0 list-group list-group-flush border-bottom">
                                    {navigation.placeholder && <li style={{left:0}}className="px-0 mx-0 list-group-item">{navigation.placeholder}</li>}
                                    {hero.placeholder && <li style={{left:0}}className="px-0 mx-0 list-group-item">{hero.placeholder}</li>}
                                    {left.placeholder && <li style={{left:0}}className="px-0 mx-0 list-group-item">{left.placeholder}</li>}
                                    {center.placeholder && <li style={{left:0}}className="px-0 mx-0 list-group-item">{center.placeholder}</li>}
                                    {right.placeholder && <li style={{left:0}}className="px-0 mx-0 list-group-item">{right.placeholder}</li>}
                                    {prefooter.placeholder && <li style={{left:0}}className="px-0 mx-0 list-group-item">{prefooter.placeholder}</li>}
                                </ul>
                            </div>
                        </div>
                        <div className="col-3">
                            <CtaRightRailDetail
                            headline="Placeholder preview">
                                <TemplateIcon name={doc.name}/>
                            </CtaRightRailDetail>
                        </div>
                    </div>
                

                <div className="row">
                    <div className="col-12 my-5 component-example">
                        <h2 className="text-center mb-4">Template Example</h2>
                        <div className="frame" style={{margin: 'auto', padding: '2rem 2rem 2.5rem'}}>
                            <IFrame html={finalLayout} styles={styles} frameWidth={'100%'} />
                        </div>
                    </div>
                </div>
            </section>
            </Container>
        </Layout>
    )
}

export default Template
