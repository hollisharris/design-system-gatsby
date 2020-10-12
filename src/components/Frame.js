import React, { useState, useEffect, useRef } from 'react'
import Frame from 'react-frame-component';

const IFrame = ({ html, htmlFile, styles, frameWidth }) => {
  const iframeRef = useRef(null)
  const [iframeHeight, setIframeHeight] = useState('500px')
  const [iframeReady, setIframeReady] = useState(false)


  useEffect(() => {
      setIframeHeight(iframeRef.current.node.contentWindow.document.body.scrollHeight)
  }, [iframeReady,iframeRef,frameWidth]);


  return (
    <Frame
      title="Component Example"
      ref={iframeRef}
      scrolling="no"
      onLoad={() => setIframeReady(true)}
      style={{maxWidth: frameWidth, width: '100%', height: iframeHeight, display: 'block', minHeight: '200px', margin: 'auto', overflow: 'hidden'}}
      initialContent={`<!DOCTYPE html>
                    <html>
                        <head>
                            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
                        </head>
                        <body>
                            <div class="frame-root"></div>
                            <script src="/assets/scripts/uta-prototype-components.min.js"></script>
                        </body>
                    </html>`
      }
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
      <React.Fragment>
        {htmlFile &&
        <div dangerouslySetInnerHTML={{ __html: htmlFile }}/>}

        {html &&
        html}
      </React.Fragment>

    </Frame>
  )
}

export default IFrame