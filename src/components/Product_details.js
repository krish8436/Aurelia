import { useState, useEffect } from "react";
import dataCards from "../mockdata/Data";
import { useParams } from "react-router-dom";
import { useCart } from "./Cart";
import Supports from "./Supports";
import Tabcon from "./Tabcon";
import Faq from "./Faq";
import Bestsellers from "./Bestseller";
import { useNavigate } from "react-router-dom";

const Product_details = () => {
  const { proID } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const product = dataCards.find((item) => item.id == proID);
  const [quantity, setQuantity] = useState(1);

  const [timeLeft, setTimeLeft] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const dealEndTime = new Date().getTime() + 24 * 60 * 60 * 1000; 

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = dealEndTime - now;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({ hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const incrementQty = () => setQuantity((prev) => prev + 1);
  const decrementQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleInputChange = (e) => {
    const val = e.target.value;
    const num = parseInt(val);
    if (!isNaN(num) && num > 0) {
      setQuantity(num);
    } else {
      setQuantity(1);
    }
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [proID]);
  return (
    <div className="pro-details">
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <div className="pro-de-img">
              <img
                src={product.productImage}
                alt={product.productName}
                width="100%"
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="pro-de-details">
              <h2>{product.productName}</h2>
              <div className="rating-bar">
                <p>
                  {product.ratingImage}{" "}
                  <span>
                    In Stock: <span style={{ color: "#35BB3A" }}>In stock</span>
                  </span>
                </p>
              </div>
              <div className="pro-price d-flex">
                <h4>
                  <strike>{product.comparePrice}</strike>
                </h4>
                <h4>{product.price}</h4>
              </div>
              <div className="descrp">
                <p>{product.description}</p>
              </div>

              {/* ⏳ LIVE TIMER */}
              <div className="timer-offer">
                <p>Hurry up! Deals end up :</p>
                <div className="timer-box">
                  <div className="tmr">
                    <p>HOURS</p>
                    <div className="tm-cunt">
                      <span>{timeLeft.hours}</span>
                    </div>
                  </div>
                  <div className="tmr-dots">:</div>
                  <div className="tmr">
                    <p>MINUTES</p>
                    <div className="tm-cunt">
                      <span>{timeLeft.minutes}</span>
                    </div>
                  </div>
                  <div className="tmr-dots">:</div>
                  <div className="tmr">
                    <p>SECONDS</p>
                    <div className="tm-cunt">
                      <span>{timeLeft.seconds}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="quant">
                <p>Quantity</p>
                <div className="qunt">
                  <div className="qbtn" onClick={decrementQty}>
                    −
                  </div>
                  <input
                    type="text"
                    value={quantity}
                    onChange={handleInputChange}
                  />
                  <div className="qbtn" onClick={incrementQty}>
                    +
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="pro-de-btn">
              <button
  onClick={() => {
    const cleanPrice = parseFloat(
      product.price?.toString().replace(/[^\d.]/g, "") || 0
    );
    console.log("Adding to cart:", { ...product, price: cleanPrice, quantity });

    addToCart({
      ...product,
      price: cleanPrice,
      quantity: quantity || 1,
    });
    navigate("/cart");
  }}
>
  ADD TO CART
</button>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pro-space1">
        <Supports/>
      </div>
      <div className="product-info-tabs">
       <Tabcon/>
      </div>
      <div className="faq-part">
        <Faq/>
      </div>
      <div className="best-sellers">
          <Bestsellers/>
      </div>
    </div>
  );
};

export default Product_details;