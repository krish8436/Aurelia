import React from "react";
import { useWishlist } from "./Wishlist";
import { useCart } from "./Cart";
import { Link } from "react-router-dom";

const Wishlistpage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (item) => {
    const cleanedPrice = parseFloat(
      item.price?.toString().replace(/[^\d.]/g, "")
    );
  
    addToCart({ 
      ...item, 
      quantity: 1,
      price: isNaN(cleanedPrice) ? 0 : cleanedPrice,
    });
  
    removeFromWishlist(item.id); 
  };
  

  return (
    <div className="container wishlist-page py-5">
      <h2 className="mb-4 wishlist-title">My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p>Your wishlist is empty. <Link to="/shop">Go shopping</Link></p>
      ) : (
        <div className="row">
          {wishlist.map((proinfo) => (
            <div className="col-md-3 mb-4" key={proinfo.id}>
              <div className="cards">
                <div className="pro-img">
                  <h2>{proinfo?.discountText}</h2>
                  <img src={proinfo?.productImage} alt={proinfo?.productName} />
                  <div className="pro-buttons d-flex">
                    <button onClick={() => handleMoveToCart(proinfo)}>
                      <img src="images/cart.svg" alt="Add to Cart" />
                    </button>
                    <button onClick={() => removeFromWishlist(proinfo.id)}>
                      <img src="images/delete.svg" alt="Remove from Wishlist" />
                    </button>   
                    <button>
                      <Link to={`/product/${proinfo.id}`}>
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlistpage;
