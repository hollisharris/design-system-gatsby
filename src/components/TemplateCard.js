import React from 'react';
import { Link } from "gatsby"

import TemplateIcon from './TemplateIcon'

const TemplateCard = ({ slug, name, status, thumbnail }) => {


    const convertToClass = (status) => {
        if(status === 'New') {
            return 'badge-success'
        } 
        // var statusClass = status.toLowerCase();
        // statusClass = statusClass.replace(/\s+/g, '-');
        // return statusClass
    }

    return (
        <div className="col-12 col-md-4 col-lg-3">
            <Link to={slug} className="card-link">
                <div className="card mb-2 d-flex">
                    <div className="p-3">
                         <TemplateIcon name={name} />
                    </div>
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0 card-title"><strong>{name}</strong></p>
                        {status && status === 'New' &&<p className="mb-0"> <span className={`status badge ${convertToClass(status)}`}>{status}</span></p>}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default TemplateCard
