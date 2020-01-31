import React from 'react';
import { Link } from "gatsby"

import './ComponentListItem.scss'
    
const ComponentListItem = ({ slug, name, version, status }) => {

    const convertToClass = (status) => {
        var statusClass = status.toLowerCase();
        statusClass = statusClass.replace(/\s+/g, '-');
        return statusClass
    }

    return (
        <div className="components-list">
            <div className="components-list-item">
                <Link to={`/components/${slug}`}><p className="large">{name}</p></Link>
                <p className="component-details"><span className="version"><strong>Version:</strong> {version}</span> <span className={`status ${convertToClass(status)}`}><strong>Status:</strong> {status}</span></p>
            </div>
        </div>
    )
}

export default ComponentListItem
