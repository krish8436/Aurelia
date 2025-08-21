import React, { useEffect, useState } from "react";
import { useCart } from "./Cart";
import { useLocation, Link } from "react-router-dom";
import SearchModal from "./SearchModal";
import dataCards from "../mockdata/Data";
import { useWishlist } from "./Wishlist";

const Header = () => {
  const { cartItems } = useCart();
  const location = useLocation();
  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { wishlist } = useWishlist();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="container">
          {/* Mobile + Tablet Header */}
          <div className="d-flex align-items-center justify-content-between d-lg-none py-2">
            <div className="d-flex align-items-center gap-2">
              <button
                className="navbar-toggler"
                type="button"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <Link to="/">
                <img src="images/logo.png" alt="Site Logo" style={{ height: "30px" }} />
              </Link>
            </div>

            <div className="d-flex align-items-center gap-2">
              <button
                type="button"
                className="bg-transparent border-0 p-0"
                onClick={() => setShowSearch(true)}
              >
                <img src="images/i3.svg" alt="Search" />
              </button>

              <Link to="/wishlist" className="position-relative bg-transparent border-0 p-0">
                <img src="images/i4.svg" alt="User" />
                {wishlist.length > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-6px",
                      right: "-3px",
                      background: "#000000",
                      color: "white",
                      borderRadius: "50%",
                      lineHeight: "19px",
                      width: "18px",
                      height: "18px",
                      textAlign: "center",
                      fontSize: "10px",
                      padding: 0,
                    }}
                  >
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <Link to="/cart" className="position-relative bg-transparent border-0 p-0">
                <img src="images/i5.svg" alt="Cart" />
                {totalItems > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-6px",
                      right: "-3px",
                      background: "#000000",
                      color: "white",
                      borderRadius: "50%",
                      lineHeight: "19px",
                      width: "18px",
                      height: "18px",
                      textAlign: "center",
                      fontSize: "10px",
                      padding: 0,
                    }}
                  >
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="d-none d-lg-flex align-items-center justify-content-between">
            <div className="logo">
              <Link to="/">
                <img src="images/logo.png" alt="Site Logo" />
              </Link>
            </div>

            <nav className="navbar navbar-expand-lg mx-auto">
              <div className="container-fluid justify-content-center">
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                  <ul className="navbar-nav gap-3">
                    <li className="nav-item">
                      <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>Home</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/shop" className={`nav-link ${isActive("/shop") ? "active" : ""}`}>Shop</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/about" className={`nav-link ${isActive("/about") ? "active" : ""}`}>About</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/team" className={`nav-link ${isActive("/team") ? "active" : ""}`}>Team</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/contact" className={`nav-link ${isActive("/contact") ? "active" : ""}`}>Contact</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>

            <div className="icon-buy d-flex align-items-center gap-3 position-relative">
              <button
                type="button"
                className="bg-transparent border-0 p-0"
                onClick={() => setShowSearch(true)}
              >
                <img src="images/i3.svg" alt="Search" />
              </button>

              <Link to="/wishlist" className="position-relative bg-transparent border-0 p-0">
                <img src="images/i4.svg" alt="Wishlist" />
                {wishlist.length > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-6px",
                      right: "-3px",
                      background: "#000000",
                      color: "white",
                      borderRadius: "50%",
                      lineHeight: "19px",
                      width: "18px",
                      height: "18px",
                      textAlign: "center",
                      fontSize: "10px",
                      padding: 0,
                    }}
                  >
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <Link to="/cart" className="position-relative bg-transparent border-0 p-0">
                <img src="images/i5.svg" alt="Cart" />
                {totalItems > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-6px",
                      right: "-3px",
                      background: "#000000",
                      color: "white",
                      borderRadius: "50%",
                      lineHeight: "19px",
                      width: "18px",
                      height: "18px",
                      textAlign: "center",
                      fontSize: "10px",
                      padding: 0,
                    }}
                  >
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            zIndex: 999,
          }}
        >
          <div
            className="mobile-menu bg-white p-4"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "80%",
              maxWidth: "300px",
              height: "100%",
              overflowY: "auto",
              animation: "slideIn 0.3s ease forwards",
            }}
          >
            <button className="close-btn mb-3" onClick={() => setMobileMenuOpen(false)}>
              ✕
            </button>
            <div className="mob-logo mb-3">
              <img src="images/logo.png" alt="Logo" />
            </div>
            <ul className="nav flex-column">
              <li className="nav-item">
                <span><img src="images/m1.svg" alt="Home Icon" /></span>
                <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>Home</Link>
              </li>
              <li className="nav-item">
                <span><img src="images/m2.svg" alt="Shop Icon" /></span>
                <Link to="/shop" className={`nav-link ${isActive("/shop") ? "active" : ""}`}>Shop</Link>
              </li>
              <li className="nav-item">
                <span><img src="images/m3.svg" alt="About Icon" /></span>
                <Link to="/about" className={`nav-link ${isActive("/about") ? "active" : ""}`}>About</Link>
              </li>
              <li className="nav-item">
                <span><img src="images/m4.svg" alt="Team Icon" /></span>
                <Link to="/team" className={`nav-link ${isActive("/team") ? "active" : ""}`}>Team</Link>
              </li>
              <li className="nav-item">
                <span><img src="images/m5.svg" alt="Contact Icon" /></span>
                <Link to="/contact" className={`nav-link ${isActive("/contact") ? "active" : ""}`}>Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Search Modal */}
      <SearchModal
        show={showSearch}
        onClose={() => setShowSearch(false)}
        products={dataCards}
      />
    </>
  );
};

export default Header;
