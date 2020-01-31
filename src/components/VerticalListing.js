import React from 'react';
    
const VerticalListing = ({ list }) => {

    const listing = list.map((item, index)  => {
        return (
            <div class="row align-items-center" key={index}>
                <div class="col-md-7 offset-md-4">
                    <h2 class="vertical-listing-title">{item.node.name}</h2>
                    {item.node.description && <p>From sport clubs to counseling and psychological services, we want our students to maintain a healthy lifestyle. Our health and recreational programs give students an outlet to decompress through mental and physical wellness.</p>}
                    <div class="uta-btn-group"><a href={`/templates/${item.node.slug}`} class="uta-btn uta-btn-compact-primary" role="button"><span>Template Details</span></a></div>
                </div>
            </div>
        )
    })
    return (
        <section class="vertical-listing">
            <div class="container-fluid">
                {listing}
            </div>
        </section>
    )
}

export default VerticalListing
