/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"

const Container = ({ children }) => {

  return (
    <div className="container-fluid"><div className="row">{children}</div></div>
  )
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Container
