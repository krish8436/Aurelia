// TabsExample.jsx
import React from "react";
import { Tabs, Tab, Container } from "react-bootstrap";

const Tabcon = () => {
  return (
    <div className="pro-tabs-con">
    <Container className="mt-4">
      <Tabs defaultActiveKey="home" id="my-tabs" className="mb-3" fill>
        <Tab eventKey="home" title="Description">
          <h4>Skin Care</h4>
          <p>Bioforce is a natural, dermatologist-tested skincare solution designed to soothe, nourish, and restore balance to your skin. Made with botanical extracts and essential
             nutrients, it's ideal for sensitive and dry skin types.</p>
             <ul>
              <li>Clinically tested for effectiveness</li>
              <li>Contains no artificial fragrances or parabens</li>
              <li>Rich in antioxidants and natural moisturizers</li>
              <li>Lightweight yet deeply hydrating</li>
              <li>Suitable for daily use on all skin types</li>
             </ul>
        </Tab>

        <Tab eventKey="profile" title="Additional Information">
          <h4>Additional Information </h4>
          <p>This is the content inside the Profile tab.</p>
        </Tab>

        <Tab eventKey="contact" title="Shipping & Returns">
          <h4>Shipping & Returns</h4>
          <p>This is the content inside the Contact tab.</p>
        </Tab>
      </Tabs>
    </Container>
    </div>
  );
};

export default Tabcon;
