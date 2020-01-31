import React from 'react';
    
const Hero = ({ title, description }) => {
    return (
        <div className="col-12">
            <section className="hero">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 offset-lg-1">
                            {title && <h1 className="hero-title">{title}</h1>}
                            {description && <p className="hero-description">{description}</p>}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Hero
