import React, { useState, useEffect } from "react"

import Layout from "../components/layout"
import Container from "../components/Container"
import SEO from "../components/seo"
import Card from '../components/Card'
import Hero from '../components/Hero'

import { graphql } from 'gatsby'

// import "./components.scss"

export const query = graphql`
{
    usableComponents: allContentfulComponentPage(filter: {globalComponent: {eq: false}, status: {nin: "Deprecated"}}) {
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
                thumbnail {
                    title
                    fluid(maxWidth: 300) {
                        ...GatsbyContentfulFluid
                    }
                }
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

    const reset = event => {
        if(event === 'all') {
            setFormData(initialState);
        } else {
            setFormData({
                ...formData,
                [event]: 0
            });
        }
    };

//   Filters
    let [filteredList, setFilteredList] = useState([]);
    let [formChanged, setFormChanged] = useState(false);

    const initialState = {
        searchTerm: "",
        richtext: false,
        buttons: false,
        buttonsCount: 0,
        images: false,
        imagesCount: 0,
        links: false,
        listing: false
      };

    const [formData, setFormData] = useState(initialState)

    const buttonValues = [
        '1','2'
    ]

    const imagesValues = [
        '1','2','3','4'
    ]

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
        let result = usableComponents.edges.filter(
            component => 
                (!formData.richtext || component.node.richtext === formData.richtext) &&
                (!formData.links || component.node.links === "Links optional" || component.node.links === "Links required") &&
                (!formData.buttonsCount || component.node.buttons >= formData.buttonsCount) &&
                (!formData.searchTerm || component.node.name.toLowerCase().includes(formData.searchTerm.toLowerCase())) &&
                (!formData.imagesCount || component.node.images >= formData.imagesCount) &&
                (!formData.listing || component.node.listing === "Limited" || component.node.listing === "Unlimited")
        );

        let alphabetizeResult = result.sort(function(a, b){
            if(a.node.slug < b.node.slug) { return -1; }
            if(a.node.slug > b.node.slug) { return 1; }
            return 0;
        })
        setFilteredList(alphabetizeResult);

    }, [formData, usableComponents]);

    useEffect(() => {
        // Compare object values
        // Ignoring Buttons and Images keys checkbox triggered dropdowns 
        function shallowEqual(object1, object2) {
            if(
                (object1['searchTerm'] !== object2['searchTerm']) ||
                (object1['richtext'] !== object2['richtext']) ||
                (object1['buttonsCount'] !== object2['buttonsCount']) ||
                (object1['imagesCount'] !== object2['imagesCount']) ||
                (object1['links'] !== object2['links']) ||
                (object1['listing'] !== object2['listing'])
            ) {
                return false
            } else {
                return true
            }
          }

        if(shallowEqual(formData,initialState)){
            setFormChanged(true);
        } else {
            setFormChanged(false)
        }
    }, [formData, initialState]);

    if (!usableComponents || !globalComponents) return null;

    let usableComponentsList = null;
    if(filteredList.length > 0) {
        usableComponentsList = filteredList.map((item, index)  => {
            return (
                <Card
                    key={index}
                    slug={`/components/${item.node.slug}`}
                    name={item.node.name}
                    version={item.node.version}
                    status={item.node.status}
                    thumbnail={item.node.thumbnail}/>
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
            <Card key={index} slug={item.node.slug} name={item.node.name} version={item.node.version} status={item.node.status}/>
        )
    })
  
    return (
        <Layout>
        <SEO title="Components" />
            <Container>
                <section className="page-content col">
                    <div className="row">
                        <Hero title="Components" description="Components are building blocks you can assemble to make unique page layouts" />
                    
                        <div className="col-lg-12 filters sticky-top bg-white py-3 border-bottom d-none d-md-block">
                            <form className="d-flex">
                                    <input
                                        name="searchTerm"
                                        className="search-box border rounded px-3 py-2 mr-2"
                                        type="text"
                                        placeholder="Search components"
                                        value={formData.searchTerm}
                                        onChange={handleInputChange}
                                    />
      
                                    <label className="border rounded px-3 py-2 mr-2">
                                        <input type="checkbox" name="richtext" checked={formData.richtext} onChange={handleInputChange}/>
                                        Rich Text
                                    </label>
                                    
                                    <div className="position-relative mr-2">
                                        <label className="border rounded px-3 py-2">
                                            <span className={`dropdown-arrow mr-2 ${formData.buttons ? 'up' : 'down'}`}></span>
                                            <input hidden type="checkbox" name="buttons" checked={formData.buttons} onChange={handleInputChange}/>
                                            Buttons  {formData.buttonsCount > 0 && <span className="badge badge-primary badge-pill">{formData.buttonsCount}</span>}
                                        </label>
                                        
                                            <div className={`${formData.buttons ? 'visible': 'invisible'} form-group radio-group bg-white border p-2 rounded`}>
                                                {
                                                    buttonValues.map(value => (
                                                        <label  key={`buttons-${value}`}>
                                                            <input className="toggle-radio" type="radio" id={`buttons-${value}`} name="buttonsCount" value={value} checked={value === formData.buttonsCount ? true : false} onChange={handleInputChange}/> {value}
                                                        </label>
                                                    ))
                                                }
                                                <button className={`border rounded px-3 py-2 mb-2   bg-white border-0 btn-block ${formData.buttonsCount !== 0 ? 'text-primary' : 'text-gray' }`} disabled={formData.buttonsCount !== 0 ? false : true } onClick={()=>reset('buttonsCount')}>Reset</button>
                                            </div>
                                    </div>

                                    <div className="position-relative  mr-2">
                                        <label className="border rounded px-3 py-2">
                                            <span className={`dropdown-arrow mr-2 ${formData.images ? 'up' : 'down'}`}></span>
                                            <input hidden type="checkbox" name="images" checked={formData.images} onChange={handleInputChange}/>
                                            Images {formData.imagesCount > 0 && <span className="badge badge-primary badge-pill">{formData.imagesCount}</span>}
                                        </label>
                                    
                                        <div className={`${formData.images ? 'visible': 'invisible'} form-group radio-group bg-white border p-2 rounded`}>
                                            {
                                                imagesValues.map(value => (
                                                    <label key={`images-${value}`}>
                                                        <input className="toggle-radio" type="radio" id={`images-${value}`} name="imagesCount" value={value} checked={value === formData.imagesCount ? true : false} onChange={handleInputChange}/> {value}
                                                    </label>
                                                ))
                                            }
                                            <button className={`border rounded px-3 py-2 mb-2 bg-white border-0  btn-block ${formData.imagesCount !== 0 ? 'text-primary' : 'text-gray' }`} disabled={formData.imagesCount !== 0 ? false : true } onClick={()=>reset('imagesCount')}>Reset</button>
                                        </div>
                                    </div>
                        
                                    <label className="border rounded px-3 py-2 mr-2">
                                        <input type="checkbox" name="links" checked={formData.links} onChange={handleInputChange}/>
                                        Links
                                    </label>

                                    <label className="border rounded px-3 py-2 mr-2">
                                        <input type="checkbox" name="listing" checked={formData.listing} onChange={handleInputChange}/>
                                        Listing
                                    </label>

                                    <button className={`rounded px-3 py-2 mb-2  bg-white border-0 ${formChanged ? 'text-gray' : 'text-primary' }`} disabled={formChanged} onClick={()=>reset('all')}>Reset</button>
                            </form>
                        </div>
                        

                        <div className="col-lg-12">
                            <h2 className="mt-5">Page Components</h2>
                            <small className="text-muted text-small">{usableComponentsList.length} of {usableComponents.edges.length} components</small>
                            <div className="row  mt-4">
                                {usableComponentsList}
                            </div>

                            <h2 className="mt-5">Global Components</h2>
                            <div className="row">
                                {globalComponentsList}
                            </div>
                        </div>

                        
                    </div>
                </section>
            </Container>

        
        </Layout>
    )
}

export default ComponentsPage
