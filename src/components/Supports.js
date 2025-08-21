import React from "react";
const Supports = () => {
    return (
      <div className="support-de">
        <div className="support-marquee">
          <div className="support-track">
            {[1, 2].map((_, idx) => (
              <React.Fragment key={idx}>
                <div className="support-item">
                  <img src="images/s1.svg" />
                  <div>
                    <h4>Free & fast delivery</h4>
                    <p>Order $25.00 or more</p>
                  </div>
                </div>
                <div className="support-item">
                  <img src="images/s2.svg" />
                  <div>
                    <h4>Up to 25% off</h4>
                    <p>On pets online store</p>
                  </div>
                </div>
                <div className="support-item">
                  <img src="images/s3.svg" />
                  <div>
                    <h4>Our fast returns</h4>
                    <p>Terms & conditions apply</p>
                  </div>
                </div>
                <div className="support-item">
                  <img src="images/s4.svg" />
                  <div>
                    <h4>Customer support</h4>
                    <p>24*7 Live client support</p>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default Supports;
  