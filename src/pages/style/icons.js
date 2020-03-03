import React from "react"

import Layout from "../../components/layout"
import Container from "../../components/Container"
import Hero from '../../components/Hero'
import SEO from "../../components/seo"
import StyleNav from "../../components/StyleNav"

import IconCard from '../../components/Style/IconCard';

export const query = graphql`
{
    contentfulIcons {
        iconLibrary {
          icons {
            class
            name
          }
        }
      }
}
`

const Buttons = ({data}) => {

  const doc = data.contentfulIcons;

  const icons = doc.iconLibrary.icons.map(icon => {
      return <IconCard key={icon.name} name={icon.name} classname={icon.class} />;
  });
  
  return (
    <Layout>
      <SEO title="Buttons" />
      <Container>
        <section className="page-content col">
            <div className="row">
                <Hero title="Iconography" description="A user's understanding of an icon is based on previous experience. Most icons are not standardized across all experiences that a user encounters. As a result, a text label is frequently required to provide clarity and reduce ambiguity."/>

                <div className="col-lg-3">
                  <StyleNav />
                </div>

                <div className="col-lg-9">
                    <h5>Designing with Icons</h5>
                    <p>In some contexts (ex: a product grid) icons that aim to simplify can actually make an experience more complex. Each time an icon is placed in a design, be sure to ask "Is this icon making the information clearer and easier to use?" and "Is the interface just as clear without an icon?" before using an icon.</p>
                    <p>Unmoderated usability testing can be a great way to get affordable, quick feedback from users on new icon placements and new icons. Be sure to follow the proper testing protocols and always show the icon in context for how it will be used.</p>
                    
                    <h5>Icon Library</h5>
                    <div className="icon-container">
                      {icons}
                    </div>
                </div>
            </div>
        </section>
        </Container>
      
    </Layout>
  )
}

export default Buttons
