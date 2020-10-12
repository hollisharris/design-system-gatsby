import React from 'react';
import { Link } from "gatsby"
import Img from "gatsby-image"

// import './ComponentListItem.scss'
    
const Card = ({ slug, name, status, thumbnail }) => {
    console.log(status)

    const convertToClass = (status) => {
        if(status === 'New') {
            return 'badge-success'
        } else if (status === 'Updated') {
            return 'badge-info'
        }
        // var statusClass = status.toLowerCase();
        // statusClass = statusClass.replace(/\s+/g, '-');
        // return statusClass
    }

    return (
        <div className="col-6 col-md-4 col-lg-3">
            <Link to={slug} className="card-link">
                <div className="card mb-4 d-flex">
                    {thumbnail && <div className="p-3">
                         <Img className="card-img-top w-100 m-auto" fluid={thumbnail.fluid} alt={thumbnail.title} />
                    </div>}
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0 card-title"><strong>{name}</strong></p>
                        {status && status !== 'Ready' && <p className="mb-0"> <span className={`status badge ${convertToClass(status)}`}>{status}</span></p>}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Card
