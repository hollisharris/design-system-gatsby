import React from 'react';
import { Link } from 'gatsby';
    
const CtaRightRailDetail = ({ buttonURL, buttonText, category, headline, children }) => {

    return (
        <section className="cta-detail">
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        {category && <p class="cta-detail-category">{category}</p>}
                        {headline && <h2 className="cta-detail-title">{headline}</h2>}
                        <div className={!buttonURL ? 'pb-4' : null}>
                        {children}
                        </div>

                        {buttonText && buttonURL && <Link to={buttonURL} className="uta-btn uta-btn-compact-primary" role="button"><span>{buttonText}</span></Link>}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CtaRightRailDetail
