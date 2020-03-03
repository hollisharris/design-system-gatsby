import React from 'react';
import './iconcard.scss';

const IconCard = ({ classname, name }) => {

    return (
        <div className="icon">
            <div className="icon__card">
                <i className={classname} aria-label={name}></i>
            </div>
        </div>
    );
}

export default IconCard 
