import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import Frame, { FrameContextConsumer } from 'react-frame-component'
import "./ComponentExample.scss"
const styles = require('!!css-loader!sass-loader!../scss/main.scss') // eslint-disable-line import/no-webpack-loader-syntax
    


const ComponentExample = ({ htmlFile }) => {
    let [frameWidth, resizeFrame] = useState('100%');
    let [frameHeight, setFrameHeight] = useState('300');

    const iframeEl = useRef(null);

    // useEffect((height) => {
    //     setFrameHeight(height)
    // }, [frameHeight]);

    useLayoutEffect(() => {
        console.log(iframeEl.current.node.contentDocument.document);
    }, []);

    return (
        <div className="component-example">
            <h2>Component Example</h2>
            <div className="frame" style={{maxWidth: frameWidth, height: `${frameHeight}px`}}>
                <Frame
                    ref={iframeEl}
                    style={{width: '100%', height: '100%'}}
                    initialContent={`<!DOCTYPE html>
                        <html>
                            <head>
                                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
                            </head>
                            <body id="mainHeight">
                                <div class="frame-root"></div>
                                <script src="/assets/scripts/uta-prototype-components.js"></script>
                            </body>
                        </html>`}
                    head={
                        <React.Fragment>
                            <style dangerouslySetInnerHTML={{ __html: styles.toString()}} />
                            <style dangerouslySetInnerHTML={{
                                __html: `
                                    body { 
                                        background-color: transparent; 
                                    }
                                `}}
                            />
                        </React.Fragment>
                    }>
                        {/* <FrameContextConsumer>
                    {
                        // Callback is invoked with iframe's window and document instances
                        ({document, window}) => {
                            // Render Children
                            let body = document.body,
                            html = document.documentElement;

                            var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
                            height = window.innerHeight;
                            setFrameHeight(height)
                        }
                    }
                    </FrameContextConsumer> */}
                    <React.Fragment>
                        <div dangerouslySetInnerHTML={{ __html: htmlFile}} />
                    </React.Fragment>
                </Frame>
            </div>
            <div className="uta-btn-group">
                <button  onClick={() => resizeFrame('320px')}>Mobile</button>
                <button  onClick={() => resizeFrame('50%')}>Tablet</button>
                <button  onClick={() => resizeFrame('100%')}>Desktop</button>
            </div>
        </div>
    )
}

export default ComponentExample
