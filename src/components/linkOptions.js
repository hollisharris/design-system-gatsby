import React from "react"
import { INLINES } from '@contentful/rich-text-types';
import { Link } from "gatsby"
 
 const options = {
    renderNode: {
      [INLINES.ENTRY_HYPERLINK]: (node) => {
        // const { name, slug } = node.data.target.fields;
        const { slug } = node.data.target.fields;
        const value = node.content[0].value;
        if(node.data.target.sys.contentType.sys.id === "componentPage") {
            return <Link to={`/components/${slug['en-US']}/`}>{value}</Link>
        } else if(node.data.target.sys.contentType.sys.id === "tutorialPage") {
            return <Link to={`/tutorials/${slug['en-US']}/`}>{value}</Link>
        } else if(node.data.target.sys.contentType.sys.id === "pageLayout") {
            return <Link to={`/templates/${slug['en-US']}/`}>{value}</Link>
        }
      }
    }
  };

  export default options