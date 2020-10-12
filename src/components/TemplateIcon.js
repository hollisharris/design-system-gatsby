import React from 'react';
    
const TemplateIcon = ({ name, highlighted }) => {

    const convertToClass = (name) => {
        var nameClass = name.toLowerCase();
        nameClass = nameClass.replace(/\s+/g, '-');
        return nameClass
    }

    const placeholders = [
        'navigation',
        'hero',
        'leftNav',
        'left',
        'center',
        'right',
        'prefooter',
    ]

    const makeGrid = placeholders.map(placeholder => {
        let isActive = false;

       return(
            <span key={placeholder} className={`template-icon icon-${placeholder} ${isActive ? 'highlight' : ''}`}></span>
       ) 
    })

    return (
        <div className={`template-icon-container ${convertToClass(name)}`}>
            {makeGrid}
        </div>
    )
}

export default TemplateIcon
