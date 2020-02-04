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
  const globalComponents = data.globalComponents;

//   Filters
    let [filteredList, setFilteredList] = useState([]);
    let [buttons, buttonsChecked] = useState(false);
    let [buttonsCount, setButtonsCount] = useState();
    let [images, imagesChecked] = useState(false);
    let [imageCount, setimageCount] = useState();
    let [richtext, richtextChecked] = useState(false);
    let [showAll, setShowAll] = useState(true);

    useEffect(() => {
        if(!buttons && buttonsCount > 0) {
            setButtonsCount(false)
        }
    }, [buttons, buttonsCount])

    useEffect(() => {
        if(!images && imageCount > 0) {
            setimageCount(false)
        }
    }, [images, imageCount])

    useEffect(() => {
        let result = usableComponents.edges.filter(
            component => 
                (!buttons || component.node.buttons > 0) &&
                (!richtext || component.node.richtext === richtext) &&
                (!buttonsCount || component.node.buttons >= buttonsCount) &&
                (!images || component.node.images > 0) &&
                (!imageCount || component.node.images >= imageCount) 
        );

        result = result.sort(function(a, b){
            if(a.node.name < b.node.name) { return -1; }
            if(a.node.name > b.node.name) { return 1; }
            return 0;
        })
        setFilteredList(result);

    }, [buttons, richtext, buttonsCount, usableComponents, images, imageCount])
    
    // Richtext
    const toggleRichtextFilter = () => {
        richtextChecked(!richtext)
    };

    // Buttons
    const toggleButtonFilter = () => {
        buttonsChecked(!buttons)
    };

    const changeButtonCount = (event) => {
        setButtonsCount(event.target.value)
    };

    // Images
    const toggleImageFilter = () => {
        imagesChecked(!images)
    };

    const changeImageCount = (event) => {
        setimageCount(event.target.value)
    };

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

  const globalComponentsList = globalComponents.edges.map((item, index)  => {
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

                    <div className="col-lg-3 filters" style={{position: 'sticky', top: 0}}>
                        <section className="cta-detail">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col">
                                        <h2 className="cta-detail-title">Filters</h2>
                                        <div className="cta-detail-description">
                                        <form>
                                            <label>
                                                <input type="checkbox" name="richtext" checked={richtext} onChange={toggleRichtextFilter}/>
                                                Rich Text
                                            </label>
                                            <label>
                                                <input type="checkbox" name="buttons" checked={buttons} onChange={toggleButtonFilter}/>
                                                Buttons
                                            </label>
                                            {buttons && <label>
                                                Number of Buttons
                                                <input type="number" name="quantity" min="1" max="2" defaultValue="1" value={buttonsCount} onChange={changeButtonCount}/>
                                            </label>}
                                            <label>
                                                <input type="checkbox" name="images" checked={images} onChange={toggleImageFilter}/>
                                                Images
                                            </label>
                                            {images && <label>
                                                Number of Images
                                                <input type="number" name="quantity" min="1" max="4" defaultValue="1" value={imageCount} onChange={changeImageCount}/>
                                            </label>}
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
