import React, { useState } from "react";
import { Link } from "react-router-dom";

const SearchModal = ({ show, onClose, products }) => {
  const [query, setQuery] = useState("");

  const filtered = products.filter((item) =>
    item.productName.toLowerCase().includes(query.toLowerCase())
  );

  if (!show) return null;

  return (
    <div className="modal-backdrop-custom">
      <div className="modal-box">
        <button className="close-btn" onClick={onClose}>×</button>
        <h4 className="mb-3">Search Products</h4>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="search-results">
          {query.trim() === "" ? (
            <p className="text-muted">Start typing to search products...</p>
          ) : filtered.length > 0 ? (
            filtered.map((item) => (
              <Link
                to={`/product/${item.id}`}
                key={item.id}
                className="search-item mb-2 d-flex align-items-center text-decoration-none"
                onClick={onClose}
              >
                <img
                  src={item.productImage}
                  alt={item.productName}
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                    marginRight: "12px",
                    borderRadius: "6px",
                  }}
                />
                <div>
                  <div style={{ fontWeight: "500", color: "#000" }}>{item.productName}</div>
                  <div style={{ fontSize: "14px", color: "#666" }}>{item.price}</div>
                </div>
              </Link>
            ))
          ) : (
            <p>No matching products.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
