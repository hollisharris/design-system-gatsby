import React from 'react';
import {Link, StaticQuery, graphql } from "gatsby"
    
const LatestUpdate = () => {
    return (
        <StaticQuery
        query={graphql`
            query LatestUpdateQuery {
                allContentfulUpdate(limit: 1) {
                    edges {
                      node {
                        date(formatString: "dddd, MMMM Do, YYYY")
                        title
                        slug
                      }
                    }
                  }
            }
        `}
        render={data => {
            const doc = data.allContentfulUpdate.edges[0].node;
            const {date, title, slug } = doc;
            return (
                <section className="cta-twocolumn">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <p className="cta-twocolumn-category">Latest update</p>
                                <h2 className="cta-twocolumn-title">{title}</h2>
                                <p>{date}</p>
                                <div className="uta-btn-group">
                                    <Link to={`/updates/${slug}`} role="button" className="uta-btn uta-btn-compact-primary"><span>Read the update</span></Link>
                                    <Link to={`/updates`} role="button" className="uta-btn uta-btn-compact-secondary"><span>All updates</span></Link>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </section>
            )
        }}
        />
        
    )
}

export default LatestUpdate
