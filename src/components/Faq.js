import React from "react";
import { Accordion } from "react-bootstrap";

const Faq = () => {
  return (
      <div className="">
        <div className="row">
          <div className="col-sm-6 p-0">
            <div className="faq-inn">
              <h5 className="text-uppercase">FAQ</h5>
              <h2 className="mb-4">Common Questions</h2>
              <div className="faq-body">
                <Accordion defaultActiveKey="0" flush>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Is this product safe for sensitive skin?</Accordion.Header>
                    <Accordion.Body>
                      Yes, it’s dermatologist-tested and gentle on sensitive skin.
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Does it contain any parabens or sulfates?</Accordion.Header>
                    <Accordion.Body>
                      No, our product is completely free from parabens, sulfates, and other harsh chemicals.
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="2">
                    <Accordion.Header>Can I use it with other skincare products?</Accordion.Header>
                    <Accordion.Body>
                      Yes, it's safe to use alongside your existing skincare routine.
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="3">
                    <Accordion.Header>How long until I see results?</Accordion.Header>
                    <Accordion.Body>
                      Most users see noticeable improvements within 2–4 weeks of regular use.
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="4">
                    <Accordion.Header>Is it cruelty-free?</Accordion.Header>
                    <Accordion.Body>
                      Absolutely. Our products are 100% cruelty-free and not tested on animals.
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>
          </div>
          <div className="col-sm-6 p-0">
            <div className="faq-img">
                <img src="images/faqbg.jpg"/>
            </div>
          </div>
        </div>
      </div>

  );
};

export default Faq;
