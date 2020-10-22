import React from 'react';
import { Link } from "gatsby"

const CtaAccent = ({ headline, description, path, url, linkText }) => {


    return (
        <div className="cta-accent">
            <div className="uta-lazy-bg cta-accent-bg uta-lazy-loaded" data-src="https://cdn.web.uta.edu/-/media/feature/cta/cta-accent.ashx?revision=025abb8c-3bcb-4671-8a30-0ffc9b02a20a" aria-hidden="true" style={{backgroundImage: 'url(https://cdn.web.uta.edu/-/media/feature/cta/cta-accent.ashx?revision=025abb8c-3bcb-4671-8a30-0ffc9b02a20a&quot)'}}></div>
            <noscript><div className="uta-lazy-bg cta-accent-bg" style={{backgroundImage: 'url(https://cdn.web.uta.edu/-/media/feature/cta/cta-accent.ashx?revision=025abb8c-3bcb-4671-8a30-0ffc9b02a20a)'}}></div></noscript>
            <div className="container-fluid">
                <div className="row">
                    <div className="col col-lg-8 offset-lg-2">
                        <h2 className="cta-accent-title">{headline}</h2>
                        <p>{description}</p>
                        <div className="uta-btn-group">
                            {url && <a href={url} className="uta-btn uta-btn-inverse"><span>{linkText}</span></a>}
                            {path && <Link to={path} className="uta-btn uta-btn-inverse"><span>{linkText}</span></Link>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CtaAccent
