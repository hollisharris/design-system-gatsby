import React from 'react';
import './VerticalListing.scss';
    
const VerticalListing = ({ list }) => {

    const listing = list.map((item, index)  => {
        if(item.node) {
            return (
                <div className="row align-items-center" key={index}>
                    <div className="col-md-7 offset-md-4">
                        <h2 className="vertical-listing-title">{item.node.name}</h2>
                        {item.node.description && <p>{item.node.description}</p>}
                        <div className="uta-btn-group"><a href={`/templates/${item.node.slug}`} className="uta-btn uta-btn-compact-primary" role="button"><span>Template Details</span></a></div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="row align-items-center" key={index}>
                    <div className="col-md-7 offset-md-4">
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
