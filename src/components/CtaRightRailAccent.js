import React from 'react';
import { Link } from "gatsby"

const CtaAccent = ({ headline, description, path, url, linkText }) => {


    return (
        <section className="cta-accent cta-accent__rightrail">
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <div className="ghost-header">
                            <h2 className="ghost-header-title">{headline}</h2>
                        </div>

                        <div className="cta-accent-description">
                            <p>{description}</p>
                        </div>
                        
                        {url && <a href={url} className="uta-btn uta-btn-inverse"><span>{linkText}</span></a>}
                        {path && <Link to={path} className="uta-btn uta-btn-inverse"><span>{linkText}</span></Link>}           
                    </div>
                </div>
            </div>
        </section>

    )
}

export default CtaAccent
