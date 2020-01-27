import React, { useState } from 'react';
import IFrame from './Frame'
import "./ComponentExample.scss"
const styles = require('!!css-loader!sass-loader!../scss/main.scss') // eslint-disable-line import/no-webpack-loader-syntax
    


const ComponentExample = ({ htmlFile }) => {
    let [frameWidth, resizeFrame] = useState('100%');
    let [activeSize, setActiveSize] = useState('desktop');

    return (
        <div className="component-example">
            <h5>Component Example</h5>
            <div className="frame" style={{margin: 'auto', padding: '2rem 2rem 2.5rem'}}>
                <IFrame
                    title="iframe"
                    styles={styles}
                    frameWidth={frameWidth}
                    htmlFile={htmlFile}>      
                </IFrame>
            </div>
            <div className="component-toolbar uta-btn-group">
                <button className={`uta-btn uta-btn-ghost ${activeSize === 'mobile' ? 'active' : ''}`} onClick={() => {resizeFrame('320px'); setActiveSize('mobile');}}>Mobile</button>
                <button className={`uta-btn uta-btn-ghost ${activeSize === 'tablet' ? 'active' : ''}`} onClick={() => {resizeFrame('50%'); setActiveSize('tablet');}}>Tablet</button>
                <button className={`uta-btn uta-btn-ghost ${activeSize === 'desktop' ? 'active' : ''}`} onClick={() => {resizeFrame('100%'); setActiveSize('desktop');}}>Desktop</button>
            </div>
        </div>
    )
}

export default ComponentExample
