import React from 'react';

export const TypographyCardType = {
    GIGA: 1,
    H1: 2,
    H2: 3,
    H3: 4,
    H4: 5,
    H5: 6,
    H6: 7,
    H7: 8,
    H8: 9,
    P: 10
}
    
const TypographyCard = ({ name, displayText, type, cssStyles }) => {

    function listStyles(cssStyles) {
        return Object.keys(cssStyles).map((style) => {
            return style.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`) + ': ' + cssStyles[style] + ';';
        }).join('\n');
    }

    function text() {
        let text = displayText ? displayText : 'UTA';

        switch (type) {
            case TypographyCardType.GIGA:
                return <h1 className="giga" style={cssStyles}>{text}</h1>;
            case TypographyCardType.H1:
                return <h1 style={cssStyles}>{text}</h1>;
            case TypographyCardType.H2:
                return <h2 style={cssStyles}>{text}</h2>;
            case TypographyCardType.H3:
                return <h3 style={cssStyles}>{text}</h3>;
            case TypographyCardType.H4:
                return <h4 className="giga" style={cssStyles}>{text}</h4>;
            case TypographyCardType.H5:
                return <h5 style={cssStyles}>{text}</h5>;
            case TypographyCardType.H6:
                return <h6 style={cssStyles}>{text}</h6>;
            case TypographyCardType.H7:
                return <p className="h7" style={cssStyles}>{text}</p>;
            case TypographyCardType.H8:
                return <p className="h8" style={cssStyles}>{text}</p>;
            default:
                return <p style={cssStyles}>{text}</p>;
        }
    }

    return (
        <section className="typography-card">
            <div className="row">
                <div className="col-8">
                    {text()}
                </div>
                <div className="col-4">
                    <p><strong>{name}</strong></p>
                    <pre>
                        <code>
                            {listStyles(cssStyles)}
                        </code>
                    </pre>
                </div>
            </div>
        </section>
    );
}

export default TypographyCard 
