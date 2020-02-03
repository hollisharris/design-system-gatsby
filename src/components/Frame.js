import React, { useState, useEffect, useRef } from 'react'
import Frame, { FrameContextConsumer } from 'react-frame-component';

const IFrame = ({ html, htmlFile, styles, frameWidth }) => {
  const iframeRef = useRef(null)
  const [iframeHeight, setIframeHeight] = useState(null)
  const [iframeDoc, setIframeDoc] = useState(null)

  // const mountNode = contentRef && contentRef.contentWindow.document.body

  useEffect(() => {
    if(iframeDoc) {
      setTimeout(()=>{
        let height = iframeDoc.body.scrollHeight;
        setIframeHeight(height+'px')
      }, 250)
    }
  }, [iframeDoc])

  return (
    <Frame
      title="Component Example"
      ref={iframeRef}
      style={{width: frameWidth, height: iframeHeight, display: 'block', margin: 'auto'}}
      initialContent={`<!DOCTYPE html>
                    <html>
                        <head>
                            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
                        </head>
                        <body>
                            <div class="frame-root"></div>
                            <script src="/assets/scripts/uta-prototype-components.js"></script>
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
        <FrameContextConsumer>
        {
          ({document, window}) => {
            // Render Children
            setIframeDoc(document)
          }
        }
      </FrameContextConsumer>
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