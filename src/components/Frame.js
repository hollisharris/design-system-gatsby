import React, { useState, useEffect, useLayoutEffect } from 'react'
import ReactDOM, { createPortal } from 'react-dom'

const IFrame = ({ htmlFile, styles, frameWidth }) => {
  const [contentRef, setContentRef] = useState(null)
  const [iframeHeight, setIframeHeight] = useState(null)
  const mountNode = contentRef && contentRef.contentWindow.document.body

  useEffect(() => {
    if(contentRef) {
      const height = contentRef.contentWindow.document.body.scrollHeight + 'px';
      setIframeHeight(height)
    }
  }, [contentRef])

  const componentHTML = 
    <>
            <style dangerouslySetInnerHTML={{ __html: styles.toString()}} />
            <style dangerouslySetInnerHTML={{
                __html: 
                    `body { 
                        background-color: transparent; 
                    }`
                }}
            />
            <div dangerouslySetInnerHTML={{ __html: htmlFile }}/>
            <script src="/assets/scripts/uta-prototype-components.js"></script>
    </>

  return (
    <iframe ref={setContentRef} title="Component Example"  style={{width: frameWidth, height: iframeHeight, display: 'block', margin: 'auto'}}>
      {mountNode &&
        createPortal(
            componentHTML,
            mountNode
        )}
    </iframe>
  )
}

export default IFrame