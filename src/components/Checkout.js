import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./Cart";

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
  "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const Checkout = () => {
  const { cartItems } = useCart();
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  const getInputClass = (field) => {
    return errors[field] ? "form-control is-invalid" : "form-control";
  };

  const renderError = (field) => {
    return errors[field] ? <div className="invalid-feedback">{errors[field]}</div> : null;
  };

  const handleCardNumberChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formatted = raw.match(/.{1,4}/g)?.join(" ") || "";
    setCardNumber(formatted);

    if (formatted) setErrors((prev) => ({ ...prev, cardNumber: "" }));
  };

  const handleExpiryChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 4);
    let formatted = raw;
    if (raw.length >= 3) formatted = `${raw.slice(0, 2)}/${raw.slice(2)}`;
    setExpiry(formatted);

    if (formatted) setErrors((prev) => ({ ...prev, expiry: "" }));
  };

  const handleCvvChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 4);
    setCvv(raw);

    if (raw) setErrors((prev) => ({ ...prev, cvv: "" }));
  };

  const handleUpiChange = (e) => {
    setUpiId(e.target.value);
    if (e.target.value) setErrors((prev) => ({ ...prev, upiId: "" }));
  };

  const handleBillingCheckbox = (e) => {
    setBillingSameAsShipping(e.target.checked);
  };

  const validateForm = (form) => {
    const newErrors = {};

    const requiredFields = [
      "shippingFirstName", "shippingLastName", "shippingAddress", "shippingPhone",
      "shippingCountry", "shippingCity", "shippingState", "shippingZip"
    ];

    if (!billingSameAsShipping) {
      requiredFields.push(
        "billingFirstName", "billingLastName", "billingAddress", "billingPhone",
        "billingCountry", "billingCity", "billingState", "billingZip"
      );
    }

    if (paymentMethod === "card") {
      if (!cardNumber.trim()) newErrors.cardNumber = "Card Number is required";
      if (!expiry.trim()) newErrors.expiry = "Expiry is required";
      if (!cvv.trim()) newErrors.cvv = "CVV is required";
    } else if (paymentMethod === "gpay") {
      if (!upiId.trim()) newErrors.upiId = "UPI ID is required";
    }

    if (!paymentMethod) {
      newErrors.paymentMethod = "Please select a payment method";
    }

    requiredFields.forEach((field) => {
      if (!form[field]?.value.trim()) {
        newErrors[field] = "This field is required";
      }
    });

    if (!form.terms?.checked) {
      newErrors.terms = "You must agree to the terms";
    }

    return newErrors;
  };
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const validationErrors = validateForm(form);
  
    // Add checkbox validation
    if (!agreed) {
      validationErrors.agreed = "You must agree to the terms and conditions.";
    }
  
    setErrors(validationErrors);
  
    if (Object.keys(validationErrors).length > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top if errors
      return;
    }
  
    const shipping = {
      firstName: form.shippingFirstName.value,
      lastName: form.shippingLastName.value,
      address: form.shippingAddress.value,
      phone: form.shippingPhone.value,
      email: form.shippingEmail?.value || "",
      country: form.shippingCountry.value,
      city: form.shippingCity.value,
      state: form.shippingState.value,
      zip: form.shippingZip.value,
    };
  
    const billing = billingSameAsShipping ? { ...shipping } : {
      firstName: form.billingFirstName.value,
      lastName: form.billingLastName.value,
      address: form.billingAddress.value,
      phone: form.billingPhone.value,
      email: form.billingEmail?.value || "",
      country: form.billingCountry.value,
      city: form.billingCity.value,
      state: form.billingState.value,
      zip: form.billingZip.value,
    };
  
    navigate("/thankyou", {
      state: {
        formData: {
          shipping,
          billing,
          paymentMethod,
        },
        cartItems,
        totalAmount: subtotal.toFixed(2),
      },
    });
  };
  
  const handleFieldChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
  
    if (errors[name] && String(fieldValue).trim() !== "") {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  return (
    <div className="check-out">
      <div className="details-bar mb-4">
        <div className="de-1 active">
          <span className="bar-cnt">1</span>
          <span className="bar-cnt-de">Cart Details</span>
        </div>
        <div className="bar-line"></div>
        <div className="de-1">
          <span className="bar-cnt">2</span>
          <span className="bar-cnt-de">Shipping</span>
        </div>
        <div className="bar-line"></div>
        <div className="de-1">
          <span className="bar-cnt">3</span>
          <span className="bar-cnt-de">Payment</span>
        </div>
      </div>

      <div className="check-body">
        <div className="container">
          <div className="row">
            {/* Left Form Side */}
            <div className="col-sm-8">
              <div className="check-left">
                <form onSubmit={handleSubmit} noValidate>
                  <div className="cus-de">
                    <div className="delivery-heading mb-4">
                      <h2>Delivery Details</h2>
                      <p>Please fill all the information</p>
                    </div>

                    {/* Shipping Info */}
                    <div className="ship-info-de">
                      <h4>Shipping Information</h4>
                      <div className="row">
                        <div className="col-sm-6">
                          <label className="form-label">First Name</label>
                          <input name="shippingFirstName" onChange={handleFieldChange} className={getInputClass("shippingFirstName")} />
          {renderError("shippingFirstName")}
                        </div>
                        <div className="col-sm-6">
                          <label className="form-label">Last Name</label>
                          <input name="shippingLastName" onChange={handleFieldChange} className={getInputClass("shippingLastName")} />
          {renderError("shippingLastName")}
                        </div>
                      </div>

                      <div className="row mt-3">
                        <div className="col-sm-12">
                          <label className="form-label">Address</label>
                          <input name="shippingAddress" onChange={handleFieldChange} className={getInputClass("shippingAddress")} />
          {renderError("shippingAddress")}
                        </div>
                      </div>

                      <div className="row mt-3">
                        <div className="col-sm-12">
                          <label className="form-label">Phone</label>
                          <input name="shippingPhone" onChange={handleFieldChange} className={getInputClass("shippingPhone")} />
          {renderError("shippingPhone")}
                        </div>
                      </div>

                      <div className="row mt-3">
                        <div className="col-sm-12">
                          <label className="form-label">Country</label>
                          <select name="shippingCountry" onChange={handleFieldChange} className={getInputClass("shippingCountry")}> 
            <option value="">Select Country</option>
            <option value="INDIA">INDIA</option>
          </select>
                        </div>
                      </div>

                      <div className="row mt-3">
                        <div className="col-sm-4">
                          <label className="form-label">City</label>
                          <input name="shippingCity" onChange={handleFieldChange} className={getInputClass("shippingCity")} />
          {renderError("shippingCity")}
                        </div>
                        <div className="col-sm-4">
                          <label className="form-label">State</label>
                          <select name="shippingState" onChange={handleFieldChange} className={getInputClass("shippingState")}> 
            <option value="">Select State</option>
            {indianStates.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          {renderError("shippingState")}
                        </div>
                        <div className="col-sm-4">
                          <label className="form-label">ZIP</label>
                          <input name="shippingZip" onChange={handleFieldChange} className={getInputClass("shippingZip")} />
          {renderError("shippingZip")}
                        </div>
                      </div>
                    </div>

                    {/* Billing Same As Shipping */}
                    <div className="billing-same form-check mt-4">
                      <input 
                        type="checkbox"
                        className="form-check-input"
                        id="billing-same"
                        checked={billingSameAsShipping}
                        onChange={handleBillingCheckbox}
                      />
                      <label className="form-check-label" htmlFor="billing-same">
                        Billing same as shipping
                      </label>
                    </div>

                    {/* Billing Info */}
                    {!billingSameAsShipping && (
                      <div className="ship-info-de mt-4" id="billing-info">
                        <h4>Billing Information</h4>
                        <div className="row">
                          <div className="col-sm-6">
                            <label className="form-label">First Name</label>
                            <input onChange={handleFieldChange} name="billingFirstName" className={getInputClass("billingFirstName")} />
              {renderError("billingFirstName")}
                          </div>
                          <div className="col-sm-6">
                            <label className="form-label">Last Name</label>
                            <input onChange={handleFieldChange} name="billingLastName" className={getInputClass("billingLastName")} />
              {renderError("billingLastName")}
                          </div>
                        </div>

                        <div className="row mt-3">
                          <div className="col-sm-12">
                            <label className="form-label">Address</label>
                            <input onChange={handleFieldChange} name="billingAddress" className={getInputClass("billingAddress")} />
              {renderError("billingAddress")}
                          </div>
                        </div>

                        <div className="row mt-3">
                          <div className="col-sm-12">
                            <label className="form-label">Phone</label>
                            <input onChange={handleFieldChange} name="billingPhone" className={getInputClass("billingPhone")} />
              {renderError("billingPhone")}
                          </div>
                        </div>

                        <div className="row mt-3">
                          <div className="col-sm-12">
                            <label className="form-label">Country</label>
                            <select onChange={handleFieldChange} name="billingCountry" className={getInputClass("billingCountry")}>
                <option value="">Select Country</option>
                <option value="INDIA">INDIA</option>
              </select>
                          </div>
                        </div>

                        <div className="row mt-3">
                          <div className="col-sm-4">
                            <label className="form-label">City</label>
                            <input onChange={handleFieldChange} name="billingCity" className={getInputClass("billingCity")} />
              {renderError("billingCity")}
                          </div>
                          <div className="col-sm-4">
                            <label className="form-label">State</label>
                            <select onChange={handleFieldChange} name="billingState" className={getInputClass("billingState")}>
                <option value="">Select State</option>
                {indianStates.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
                          </div>
                          <div className="col-sm-4">
                            <label className="form-label">ZIP</label>
                            <input onChange={handleFieldChange} name="billingZip" className={getInputClass("billingZip")} />
              {renderError("billingZip")}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Payment Method */}
                  <div className="pay-box mt-5">
        <div className="pay-heading mb-4">
          <h4>Select Payment Method</h4>
          {errors.paymentMethod && (
            <div className="text-danger small mt-1">{errors.paymentMethod}</div>
          )}
        </div>
        <div className="payment-method">

          {/* COD */}
          <div className={`payment-option mb-4 ${paymentMethod === "cod" ? "active-method" : ""}`}>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                value="cod"
                id="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label" htmlFor="cod">
                Cash on Delivery
              </label>
            </div>
          </div>

          {/* CARD */}
          <div className={`payment-option mb-4 ${paymentMethod === "card" ? "active-method" : ""}`}>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                value="card"
                id="card"
                checked={paymentMethod === "card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label d-flex justify-content-between align-items-center" htmlFor="card">
                <div>
                  <div className="pay-head">Credit / Debit Card</div>
                  <p className="text-muted mb-0 small">Pay securely using Visa, MasterCard, Amex, or PayPal.</p>
                </div>
                <img src="images/cards.svg" alt="Supported Cards" height="28" />
              </label>
            </div>

            {paymentMethod === "card" && (
              <div className="mt-3 p-3 border rounded">
                <div className="mb-3">
                  <label className="form-label">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    className={getInputClass("cardNumber")}
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                  />
                  {renderError("cardNumber")}
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <label className="form-label">Expiry</label>
                    <input
                      type="text"
                      name="expiry"
                      className={getInputClass("expiry")}
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={handleExpiryChange}
                    />
                    {renderError("expiry")}
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      className={getInputClass("cvv")}
                      placeholder="123"
                      value={cvv}
                      onChange={handleCvvChange}
                    />
                    {renderError("cvv")}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* GPAY */}
          <div className={`payment-option mb-4 ${paymentMethod === "gpay" ? "active-method" : ""}`}>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                value="gpay"
                id="gpay"
                checked={paymentMethod === "gpay"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label d-flex justify-content-between align-items-center" htmlFor="gpay">
                <div>Google Pay (UPI)</div>
                <img src="images/gpay.svg" alt="Google Pay" height="28" />
              </label>
            </div>

            {paymentMethod === "gpay" && (
              <div className="mt-3 p-3 border rounded">
                <label className="form-label">UPI ID</label>
                <input
                  type="text"
                  name="upiId"
                  className={getInputClass("upiId")}
                  placeholder="example@upi"
                  value={upiId}
                  onChange={handleUpiChange}
                />
                {renderError("upiId")}
              </div>
            )}
          </div>
        </div>
      </div>


                  {/* Agreement */}
                  <div className="form-check mt-4">
  <input
    type="checkbox"
    className={`form-check-input ${errors.agreed ? 'is-invalid' : ''}`}
    id="terms"
    checked={agreed}
    onChange={(e) => setAgreed(e.target.checked)}
  />
  <label className="form-check-label terms" htmlFor="terms">
    I agree to the <a href="#">terms and conditions</a> and <a href="#">privacy policy</a>.
  </label>
  {errors.agreed && <div className="invalid-feedback d-block">{errors.agreed}</div>}
</div>


                  {/* Submit */}
                  <div className="pay-btn mt-4">
                    <button type="submit" className="btn btn-primary w-100">
                      PLACE ORDER
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Summary Side */}
            <div className="col-sm-4">
              <div className="delivery-heading mb-3">
                <h2>Your cart <span className="sm-cnt">({cartCount})</span></h2>
              </div>
              <div className="summary-part">
                <div className="pro-check">
                  {cartCount === 0 ? (
                    <p>No items in cart.</p>
                  ) : (
                    cartItems.map((item) => (
                      <div key={item.id} className="d-flex align-items-center mb-3 ordr-sm">
                      <div className="pro-check-img position-relative">
                        <img
                          src={item.productImage}
                          alt={item.name}
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                            marginRight: "12px",
                            borderRadius: "8px"
                          }}
                        />
                        <span
                          style={{
                            position: "absolute",
                            top: "-6px",
                            right: "-6px",
                            backgroundColor: "#000",
                            color: "#fff",
                            fontSize: "12px",
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                        >
                          {item.quantity}
                        </span>
                      </div>
                      <div>
                        <div style={{ fontWeight: "500" }}>{item.productName}</div>
                        <div style={{ fontSize: "14px", color: "#000" }}>
                          ₹{(item.quantity * item.price).toFixed(2)}
                        </div>
                      </div>
                    </div>
                    
                    
                    ))
                  )}
                </div>

                <div className="order-summary mt-3">
                  <h4>Order summary</h4>
                  <p>Sub total <span>₹{subtotal.toFixed(2)}</span></p>
                  <p>Shipping <span>Free</span></p>
                  <div className="ttl-sm">
                    <p>Total <span>₹{subtotal.toFixed(2)}</span></p>
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

export default Checkout;
