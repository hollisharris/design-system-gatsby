import React, { useEffect, useState } from 'react';
import IFrame from './Frame'

const styles = require('!!css-loader!sass-loader!../scss/main.scss') // eslint-disable-line import/no-webpack-loader-syntax


const ComponentExample = ({ htmlFile, defaultMobile }) => {
    let [frameWidth, resizeFrame] = useState('100%');
    let [activeSize, setActiveSize] = useState(defaultMobile || 'desktop');

    useEffect(()=> {
        if(activeSize === 'mobile') {
            resizeFrame('320px')
        } else if (activeSize === 'tablet') {
            resizeFrame('50%')
        } else {
            resizeFrame('100%')
        }
    }, [activeSize])

    return (
        <div className="component-example">
            <div className="frame" style={{margin: 'auto', padding: '2rem 2rem 2.5rem'}}>
                <IFrame
                    title="iframe"
                    styles={styles}
                    style={{overflow:'hidden'}}
                    scrolling="no"
                    frameWidth={frameWidth}
                    htmlFile={htmlFile}>  
                </IFrame>
            </div>
            <div className="component-toolbar uta-btn-group d-none d-sm-block">
                <button className={`uta-btn uta-btn-ghost mx-0 ${activeSize === 'mobile' ? 'active' : ''}`} onClick={() => {setActiveSize('mobile');}}>Mobile</button>
                <button className={`uta-btn uta-btn-ghost mx-0 ${activeSize === 'tablet' ? 'active' : ''}`} onClick={() => {setActiveSize('tablet');}}>Tablet</button>
                <button className={`uta-btn uta-btn-ghost mx-0 ${activeSize === 'desktop' ? 'active' : ''}`} onClick={() => {setActiveSize('desktop');}}>Desktop</button>
            </div>
        </div>
    )
}

export default ComponentExample
