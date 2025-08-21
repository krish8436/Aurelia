import React from "react";
import { useLocation } from "react-router-dom";

const ThankYou = () => {
  const location = useLocation();
  const { formData, cartItems, totalAmount } = location.state || {};
  const paymentMode = formData?.paymentMethod || "Not specified";

  const renderAddress = (data) => (
    <>
      <p><strong>{data?.firstName} {data?.lastName}</strong></p>
      <p>{data?.address}</p>
      <p>
        {data?.city}, {data?.state} {data?.zip}
      </p>
      {data?.email && <p>{data?.email}</p>}
      <p>{data?.phone}</p>
    </>
  );

  return (
    <div className="thank-body">
      <div className="banner-p thanks-bg">
        <div className="container">
          <div className="row">
            <div className="col-sm-7"></div>
            <div className="col-sm-5">
              <div className="shop-banner-heading">
                <div className="line-heading-top"></div>
                <h2>Here’s What You’ll Love</h2>
                <h1>Aurelia</h1>
                <div className="line-heading-bottom"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="thank-body">
        <div className="container">
          <div className="row">
            <div className="col-sm-8">
              <div className="thank-left">
                <div className="thanks-txt">
                  <div className="thnak-img">
                    <img src="images/thanks.svg" alt="Thank you" />
                  </div>
                  <div className="thank-con">
                    <h2>Thank you</h2>
                    <p>We’re getting your items ready</p>
                  </div>
                </div>
                <div className="ordr-con">
                <h5 className="pay-mode"> Payment Mode: <span>{paymentMode.toUpperCase()}</span></h5>
                  <p>We've received your order and are preparing it for shipment.</p>
                </div>
                <div className="cus-or-info">
                  <h5>Customer information</h5>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="cust-address">
                        <h2>Shipping address</h2>
                        <div>{renderAddress(formData?.shipping)}</div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="cust-address">
                        <h2>Billing address</h2>
                        <div>{renderAddress(formData?.billing)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-4">
              <div className="thank-right">
                <h4>Order summary</h4>
                <div id="thank-items-wrapper">
                  {cartItems?.map((item, index) => (
                   <div className="thank-items" key={index}>
                   <div className="row align-items-center thank-pro">
                     <div className="col-2 position-relative">
                       <div className="thank-img">
                         <img
                           src={item.productImage || "images/default.png"}
                           alt={item.name}
                           style={{ width: "100%", borderRadius: "6px" }}
                         />
                         <div
                           className="qty-badge"
                           style={{
                             position: "absolute",
                             top: "4px",
                             right: "4px",
                             backgroundColor: "#000",
                             color: "#fff",
                             borderRadius: "50%",
                             width: "24px",
                             height: "24px",
                             fontSize: "14px",
                             display: "flex",
                             alignItems: "center",
                             justifyContent: "center",
                           }}
                         >
                           {item.quantity}
                         </div>
                       </div>
                     </div>
                     <div className="col-10">
                       <div className="d-flex justify-content-between align-items-center thank-itm">
                         <h5 className="mb-0">{item.productName}</h5>
                         <span style={{ fontWeight: "500" }}>₹{item.price}</span>
                       </div>
                     </div>
                   </div>
                 </div>
                 
                  
                  ))}

                  <div className="thank-total">
                    <p>
                      Total <span>₹{totalAmount}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>    
    </div>
  );
};

export default ThankYou;
