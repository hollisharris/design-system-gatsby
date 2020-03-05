import React, { useState, useEffect } from "react"

import Layout from "../components/layout"
import Container from "../components/Container"
import SEO from "../components/seo"
import ComponentListItem from '../components/ComponentListItem'
import Hero from '../components/Hero'

import { graphql } from 'gatsby'

import "./components.scss"

export const query = graphql`
{
    usableComponents: allContentfulComponentPage(filter: {globalComponent: {eq: false}}) {
        edges {
            node {
                name
                slug
                version
                status
                buttons
                richtext
                images
                links
                listing
                listLimit
            }
        }
    }
    globalComponents:allContentfulComponentPage(filter: {globalComponent: {eq: true}}) {
        edges {
            node {
                name
                slug
                version
                status
            }
        }
    }
}
`

const ComponentsPage = ({data}) => {
  const usableComponents = data.usableComponents;
  let globalComponents = data.globalComponents;

//   Filters
    let [filteredList, setFilteredList] = useState([]);

    const [formData, setFormData] = useState({
        richtext: false,
        buttons: false,
        buttonsCount: null,
        images: false,
        imagesCount: null,
        links: false,
        listing: false
    })

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        setFormData({
            ...formData,
            [name]: value
        });
    }

    useEffect(() => {
        if(!formData.buttons && formData.buttonsCount > 0) {
            setFormData({
                ...formData,
                buttonsCount: null
            });
        }

        if(!formData.images && formData.imageCount > 0) {
            setFormData({
                ...formData,
                imageCount: null
            });
        }
    }, [formData])

    useEffect(() => {
        let result = usableComponents.edges.filter(
            component => 
                (!formData.buttons || component.node.buttons > 0) &&
                (!formData.richtext || component.node.richtext === formData.richtext) &&
                (!formData.links || component.node.links === "Links optional" || component.node.links === "Links required") &&
                (!formData.buttonsCount || component.node.buttons >= formData.buttonsCount) &&
                (!formData.images || component.node.images > 0) &&
                (!formData.imageCount || component.node.images >= formData.imageCount) &&
                (!formData.listing || component.node.listing === "Limited" || component.node.listing === "Unlimited")
        );

        let alphabetizeResult = result.sort(function(a, b){
            if(a.node.slug < b.node.slug) { return -1; }
            if(a.node.slug > b.node.slug) { return 1; }
            return 0;
        })
        setFilteredList(alphabetizeResult);

    }, [formData, usableComponents])

    if (!usableComponents || !globalComponents) return null;

    let usableComponentsList = null;
    if(filteredList.length > 0) {
        usableComponentsList = filteredList.map((item, index)  => {
            return (
                <ComponentListItem key={index} slug={item.node.slug} name={item.node.name} version={item.node.version} status={item.node.status}/>
            )
        })
    } else {
        usableComponentsList = <p>No components found. Request a new component.</p>
    }

    // Alphabetize Results
    globalComponents = globalComponents.edges.sort(function(a, b){
        if(a.node.slug < b.node.slug) { return -1; }
        if(a.node.slug > b.node.slug) { return 1; }
        return 0;
    })

    const globalComponentsList = globalComponents.map((item, index)  => {
            return (
                <ComponentListItem key={index} slug={item.node.slug} name={item.node.name} version={item.node.version} status={item.node.status}/>
            )
    })
  
    return (
        <Layout>
        <SEO title="Components" />
            <Container>
                <section className="page-content col">
                    <div className="row">
                        <Hero title="Components" description="Components are building blocks you can assemble to make unique page layouts" />
                    
                        <div className="col-lg-9">
                            <h4 className="list-header">Page Components</h4>
                            {usableComponentsList}

                            <h4 className="list-header">Global Components</h4>
                            {globalComponentsList}
                        </div>

                        <div className="col-lg-3 filters">
                            <section className="cta-detail">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col">
                                            <h2 className="cta-detail-title">Filters</h2>
                                            <div className="cta-detail-description">
                                            <form>
                                                    <label>
                                                        <input type="checkbox" name="richtext" checked={formData.richtext} onChange={handleInputChange}/>
                                                        Rich Text
                                                    </label>

                                                    <label>
                                                        <input type="checkbox" name="buttons" checked={formData.buttons} onChange={handleInputChange}/>
                                                        Buttons
                                                    </label>
                                                    {formData.buttons &&
                                                        <div className="form-group d-flex">
                                                            <input class="toggle-radio" type="radio" id="buttons-one" name="buttonsCount" value="1" onChange={handleInputChange} defaultChecked={formData.buttons}/><label htmlFor="buttons-one">1</label>
                                                            <input class="toggle-radio" type="radio" id="buttons-two" name="buttonsCount" value="2" onChange={handleInputChange} /><label htmlFor="buttons-two">2</label>

                                                            {/* <input type="number" name="quantity" min="1" max="2" defaultValue="1" value={buttonsCount} onChange={changeButtonCount}/> */}
                                                        </div>
                                                    }

                                                    <label>
                                                        <input type="checkbox" name="images" checked={formData.images} onChange={handleInputChange}/>
                                                        Images
                                                    </label>
                                                    {formData.images && 
                                                        <div className="form-group  d-flex">
                                                            <input class="toggle-radio" type="radio" id="images-one" name="imageCount" value="1" onChange={handleInputChange} defaultChecked={formData.images}/><label htmlFor="images-one">1</label>
                                                            <input class="toggle-radio" type="radio" id="images-two" name="imageCount" value="2" onChange={handleInputChange} /><label htmlFor="images-two">2</label>
                                                            <input class="toggle-radio" type="radio" id="images-three" name="imageCount" value="3" onChange={handleInputChange} /><label htmlFor="images-three">3</label>
                                                            <input class="toggle-radio" type="radio" id="images-four" name="imageCount" value="4" onChange={handleInputChange} /><label htmlFor="images-four">4</label>
                                                        
                                                            {/* <input type="number" name="quantity" min="1" max="4" defaultValue="1" value={imageCount} onChange={changeImageCount}/> */}
                                                        </div>
                                                    }
                                       
                                                    <label>
                                                        <input type="checkbox" name="links" checked={formData.links} onChange={handleInputChange}/>
                                                        Links
                                                    </label>

                                                    <label>
                                                        <input type="checkbox" name="listing" checked={formData.listing} onChange={handleInputChange}/>
                                                        Listing
                                                    </label>
                                            </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </section>
            </Container>

        
        </Layout>
    )
}

export default ComponentsPage
