import React, { useEffect, useState } from "react";
import { useCart } from "./Cart";
import { useNavigate } from "react-router-dom";

const Cartpage = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const handleCheckout = () => {
    navigate("/checkout"); 
  };

  useEffect(() => {
    console.log("Cart Items:", cartItems);
  }, [cartItems]);

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => {
      const itemPrice = parseFloat(item.price) || 0;
      const itemQuantity = parseInt(item.quantity) || 0;
      return sum + itemPrice * itemQuantity;
    }, 0);
  };

  const applyCoupon = () => {
    const code = promoCode.trim().toLowerCase();

    if (code === "krish100") {
      setDiscountAmount(100);
      setErrorMessage("");
    } else if (code === "save50") {
      setDiscountAmount(50);
      setErrorMessage("");
    } else {
      setDiscountAmount(0);
      setErrorMessage("Invalid promo code");
    }
  };

  const finalTotal = calculateSubtotal() - discountAmount;

  return (
    <div className="cart-page">
      <div className="container">
        {/* Step Bar */}
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

        <div className="cart-page-body">
          <div className="row">
            {/* Cart Left */}
            <div className="col-sm-8">
              <div className="cart-left">
                <div className="cart-info-top d-flex justify-content-between align-items-center mb-4">
                  <h2>Shopping Cart</h2>
                  <h3>
                    Your cart <span>{cartItems.length.toString().padStart(2, "0")}</span>
                  </h3>
                </div>
                <div className="cart-mob">
                <div className="row fw-semibold text-muted mb-3 px-2">
                  <div className="col-6">Product</div>
                  <div className="col-3 text-center">Quantity</div>
                  <div className="col-3 text-end">Price</div>
                </div>

                {cartItems.length === 0 && (
                  <div className="text-center py-5 text-muted">
                    Your cart is empty.
                  </div>
                )}

                {cartItems.map((item) => (
                  <div className="cart-box d-flex align-items-center mb-3" key={item.id}>
                    <div className="col-6 d-flex align-items-center gap-3">
                      <div className="cart-pro">
                        <img
                          src={item.productImage}
                          alt={item.productName}
                          className="cart-img"
                          style={{ width: "60px", height: "60px", objectFit: "cover" }}
                        />
                      </div>
                      <span className="fw-medium">{item.productName}</span>
                    </div>

                    <div className="col-3 text-center d-flex justify-content-center align-items-center gap-2">
                      <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>−</button>
                      <span className="qty-value">{item.quantity}</span>
                      <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                    </div>

                    <div className="col-3 d-flex justify-content-end align-items-center gap-3">
                      <span className="fw-bold">
                        ₹{(parseFloat(item.price || 0) * item.quantity).toFixed(2)}
                      </span>
                      <span
                        className="remove-btn"
                        style={{ cursor: "pointer", fontSize: "24px" }}
                        onClick={() => removeFromCart(item.id)}
                      >
                        &times;
                      </span>
                    </div>
                  </div>
                ))}
                </div>
              </div>
    
            </div>

            {/* Cart Right - Summary */}
            <div className="col-sm-4">
              <div className="cart-summary p-4 border rounded shadow-sm">
                <div className="ordr-sum">
                  <div className="promo-code mb-3">
                    <h5>Promo code</h5>
                    <div className="promo-box d-flex gap-2">
                      <input
                        type="text"
                        placeholder="Type here"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <button onClick={applyCoupon}>Apply</button>
                    </div>
                    {errorMessage && (
                      <div className="text-danger mt-1">{errorMessage}</div>
                    )}
                  </div>
                      <div className="cart-pro-de">
                  <div className="d-flex justify-content-between">
                    <span>Total Items:</span>
                    <span>{cartItems.length}</span>
                  </div>

                  <div className="d-flex justify-content-between">
                    <span>Subtotal:</span>
                    <span>₹{calculateSubtotal().toFixed(2)}</span>
                  </div>

                  <div className="d-flex justify-content-between">
                    <span>Discount:</span>
                    <span>- ₹{discountAmount.toFixed(2)}</span>
                  </div>

                  <div className="d-flex justify-content-between fw-bold mt-2">
                    <span>Total:</span>
                    <span>₹{finalTotal < 0 ? "0.00" : finalTotal.toFixed(2)}</span>
                  </div>
                    </div>
                  <button className="btn btn-dark w-100 mt-4" onClick={handleCheckout}>Checkout</button>
                </div>
              </div>
            </div>
          </div>
          <div class="cancel-poli">
      <div class="row">
        <div class="col-sm-10">
          <div class="cancel-in">
          <h2>Cancellation policy</h2>
          <p>Our cancellation policy allows for hassle-free cancellations within [number of days] days of purchase. For cancellations beyond this period, please refer to our terms and conditions for more information.</p>
          <a href="#">See more details <img src="images/arr.svg"/> </a>
        </div>
        </div>
        <div class="col-sm-2">
          <div class="cnlimg">
           <img src="images/seal.svg"/> 
          </div>
        </div>
      </div>
    </div>
        </div>
      </div>
    </div>
  );
};

export default Cartpage;
