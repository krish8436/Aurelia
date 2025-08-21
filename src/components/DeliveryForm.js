// src/components/DeliveryForm.jsx
import React, { useState } from "react";

const DeliveryForm = () => {
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(false);

  const handleBillingCheckbox = (e) => {
    setBillingSameAsShipping(e.target.checked);
  };

  return (
    <div className="check-left">
      <div className="delivery-heading mb-4">
        <h2>Delivery Details</h2>
        <p>Please fill all the information</p>
      </div>
      {/* SHIPPING FORM CODE HERE */}
    </div>
  );
};

export default DeliveryForm;
