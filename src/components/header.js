import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header className="global-header nav-reveal utility-reveal college-header" style={{position: 'static'}}>
    
    <div className="global-header-wrapper">
      <nav className="navbar navbar-expand-lg navbar-uta">
        <Link to="/" className="navbar-brand">
          <img src="data:image/png;base64,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" alt="UTA" className="img-fluid">
          </img><span className="navbar-uta-college-title" style={{opacity: 1, margin: '.05em 0 0 -.75em'}}>Sitecore Design System</span>
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
              <Link to="/style" className="nav-link">
                Style
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/tutorials" className="nav-link">
                Tutorials
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/updates" className="nav-link">
                Updates
              </Link>
            </li>
            <li className="nav-item">
              <a href="https://blog.uta.edu/redesign" className="nav-link">
                About Web Mod
              </a>
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
