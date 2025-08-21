import { useState } from "react";
import { useCart } from "./Cart";
import { Link } from "react-router-dom";
import { useWishlist } from "./Wishlist";

const Cards = ({ proinfo }) => {
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { addToWishlist } = useWishlist();

  const handleAddToCart = () => {
    setLoading(true);

    setTimeout(() => {
      const priceValue = parseFloat(
        proinfo?.price?.toString().replace(/[^\d.]/g, "") || 0
      );

      addToCart({
        ...proinfo,
        price: priceValue,
        quantity: 1,
      });

      setLoading(false);
      setShowToast(true);


      setTimeout(() => {
        setShowToast(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 1000);
    }, 600);
  };

  return (
    <>
      {(loading || showToast) && (
        <div className="center-screen-overlay">
          {loading && <div className="spinner"></div>}
          {showToast && <div className="center-toast">Item added to cart</div>}
        </div>
      )}

      <div className="cards">
        <div className="pro-img">
          <h2>{proinfo?.discountText}</h2>
          <img src={proinfo?.productImage} alt={proinfo?.productName} />
          <div className="pro-buttons d-flex">
            <button onClick={handleAddToCart}>
              <img src="images/cart.svg" alt="Add to Cart" />
            </button>
            <button onClick={() => addToWishlist(proinfo)}>
            <img src="images/wishlist.svg" alt="Wishlist" />
            </button>
            <button>
              <Link key={proinfo.id} to={`/product/${proinfo.id}`}>
                <img src="images/view.svg" alt="View" />
              </Link>
            </button>
          </div>
        </div>

        <div className="pro-details">
          <h5>{proinfo?.productName}</h5>
          <p className="ratings">{proinfo?.ratingImage}</p>
          <p>
            <span className="me-2">
              <strike>{proinfo?.comparePrice}</strike>
            </span>
            <span>{proinfo?.price}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Cards;
