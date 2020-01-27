import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header className="global-header nav-reveal utility-reveal college-header" style={{position: 'static'}}>
    
    <div className="global-header-wrapper">
      <nav className="navbar navbar-expand-lg navbar-uta">
        <Link to="/" className="navbar-brand">
          {siteTitle}
        </Link>
      </nav>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
