import React from 'react';
import { Link } from 'gatsby'
    
const SideNav = ({ data }) => {
    return (
        <section className="right-rail-linklist">
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <h2 className="right-rail-linklist-header">Style</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <ul className="right-rail-linklist-list">
                            <li>
                                <Link to="" role="button" className="uta-btn uta-btn-ghost-secondary"><span>Color</span></Link>
                            </li>
                            <li>
                                <Link to="" role="button" className="uta-btn uta-btn-ghost-secondary"><span>Grid</span></Link>
                            </li>
                            <li>
                                <Link to="" role="button" className="uta-btn uta-btn-ghost-secondary"><span>Iconography</span></Link>
                            </li>
                            <li>
                                <Link to="/style/typography" role="button" className="uta-btn uta-btn-ghost-secondary"><span>Typography</span></Link>
                            </li>
                            <li>
                                <Link to="" role="button" className="uta-btn uta-btn-ghost-secondary"><span>Buttons</span></Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SideNav
