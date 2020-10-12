import React from 'react';
import { Link } from 'gatsby';
import Img from "gatsby-image"
// import './VerticalListing.scss';
    
const VerticalListing = ({ list }) => {
    console.log(list)

    const listing = list.map((item, index)  => {
        if(item.node) {
            return (
                <div className="row align-items-center" key={index}>
                    {item.node.sectionImage.fluid && <div className="col-md-3 offset-md-1">
                        <div className="aspect-ratio-box">
                            <div className="aspect-ratio-box-wrapper">
                                <div className="aspect-ratio-box-inside">
                                    <div className="flexbox-centering">
                                        <Img fluid={item.node.sectionImage.fluid}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
                    <div className="col-md-7">
                        <h2 className="vertical-listing-title">{item.node.name}</h2>
                        {item.node.description && <p>{item.node.description}</p>}
                        <div className="uta-btn-group"><Link href={`/templates/${item.node.slug}/`} className="uta-btn uta-btn-compact-primary" role="button"><span>Template Details</span></Link></div>
                    </div>
                </div>
            )
        } else {
            console.log(item)
            return (
                <div className="row align-items-center" key={index}>
                    {item.sectionImage && <div className="col-md-3 offset-md-1">
                        <div className="aspect-ratio-box">
                            <div className="aspect-ratio-box-wrapper">
                                <div className="aspect-ratio-box-inside">
                                    <div className="flexbox-centering">
                                        {/* <Img fluid={item.sectionImage.fluid} alt={item.sectionImage.title}/> */}
                                        <img src={item.sectionImage.file.url} alt={item.sectionImage.title}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
                    <div className="col-md-7">
                        <h2 className="vertical-listing-title">{item.sectionTitle}</h2>
                        {item.sectionDescription && <p>{item.sectionDescription.sectionDescription}</p>}
                        <div className="uta-btn-group"><a href={`${item.path}`} className="uta-btn uta-btn-compact-primary" role="button"><span>Learn More</span></a></div>
                    </div>
                </div>
            )
        }
        
    })
    return (
        <section className="vertical-listing">
            <div className="container-fluid">
                {listing}
            </div>
        </section>
    )
}

export default VerticalListing
