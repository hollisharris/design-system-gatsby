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
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/components" className="nav-link">
                Components
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/templates" className="nav-link">
                Templates
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/styles" className="nav-link">
                Styles
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/tutorials" className="nav-link">
                Tutorials
              </Link>
            </li>
          </ul>
        </div>
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
