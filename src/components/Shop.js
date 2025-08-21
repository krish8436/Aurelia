import { useState, useEffect } from "react";
import dataCards from "../mockdata/Data";
import Cards from "./Cards";

const Shop = () => {
  const filter_cate = [
    { cate_name: "All Products" },
    { cate_name: "Skin" },
    { cate_name: "Body" },
    { cate_name: "Hair" },
    { cate_name: "Face" },
    { cate_name: "Nail" },
  ];

  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [priceLimit, setPriceLimit] = useState(2000);
  const [sortType, setSortType] = useState("A-Z");
  const [filteredProducts, setFilteredProducts] = useState(dataCards);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    applyFilters(selectedCategory, priceLimit, sortType);
  }, []);

  const applyFilters = (category, price, sort) => {
    setLoading(true);

    setTimeout(() => {
      const categoryFiltered =
        category === "All Products"
          ? dataCards
          : dataCards.filter(
              (item) =>
                item.category.toLowerCase() === category.toLowerCase()
            );

      const priceFiltered = categoryFiltered.filter((item) => {
        const numericPrice = parseInt(item.price.replace(/[^\d]/g, ""));
        return numericPrice <= price;
      });

      const sorted = [...priceFiltered].sort((a, b) => {
        const titleA = a.title ?? "";
        const titleB = b.title ?? "";

        if (sort === "A-Z") {
          return titleA.localeCompare(titleB);
        } else if (sort === "Z-A") {
          return titleB.localeCompare(titleA);
        } else if (sort === "Low to High") {
          return (
            parseInt(a.price.replace(/[^\d]/g, "")) -
            parseInt(b.price.replace(/[^\d]/g, ""))
          );
        } else if (sort === "High to Low") {
          return (
            parseInt(b.price.replace(/[^\d]/g, "")) -
            parseInt(a.price.replace(/[^\d]/g, ""))
          );
        }

        return 0;
      });

      setFilteredProducts(sorted);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="shoppage">
      <div className="shopbanner">
        <div className="container text-center">
          <h1>All Products</h1>
        </div>
      </div>

      <div className="container">
        <div className="shop-body">
          <div className="row">
            {/* Sidebar */}
            <div className="col-sm-3">
              <div className="shop-filter">
                <h4>Filter Option</h4>

                {/* Categories */}
                <div className="categories">
                  <h2>Categories</h2>
                  {filter_cate.map((list) => (
                    <label key={list.cate_name} style={{ display: "block" }}>
                      <input
                        type="radio"
                        name="category"
                        value={list.cate_name}
                        checked={selectedCategory === list.cate_name}
                        onChange={() => {
                          setSelectedCategory(list.cate_name);
                          applyFilters(list.cate_name, priceLimit, sortType);
                        }}
                      />
                      {list.cate_name}
                    </label>
                  ))}
                </div>

                {/* Price Range */}
                <div className="price-range mt-4">
                  <h2>Price (Up to ₹{priceLimit})</h2>
                  <input
                    type="range"
                    min="500"
                    max="2500"
                    step="100"
                    value={priceLimit}
                    onChange={(e) => {
                      const newLimit = Number(e.target.value);
                      setPriceLimit(newLimit);
                      applyFilters(selectedCategory, newLimit, sortType);
                    }}
                    className="custom-range"
                    style={{
                      background: `linear-gradient(to right, #6DACBD 0%, #6DACBD ${
                        (priceLimit - 500) / 20
                      }%, #ddd ${(priceLimit - 500) / 20}%, #ddd 100%)`,
                    }}
                  />
                  <div className="d-flex justify-content-between">
                    <span>₹500</span>
                    <span>₹2500</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product List */}
            <div className="col-sm-9">
              <div className="shop-card position-relative" style={{ minHeight: "300px" }}>
                {/* Sorting Bar */}
                <div className="shop-result d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h4>
                      Showing {filteredProducts.length} result
                      {filteredProducts.length !== 1 ? "s" : ""}
                    </h4>
                  </div>
                  <div className="sort-by d-flex align-items-center">
                    <label htmlFor="sort" className="me-2 mb-0">
                      Sort by:
                    </label>
                    <select
                      id="sort"
                      value={sortType}
                      onChange={(e) => {
                        setSortType(e.target.value);
                        applyFilters(selectedCategory, priceLimit, e.target.value);
                      }}
                      className="form-select"
                    >
                      <option value="A-Z">Alphabetically, A-Z</option>
                      <option value="Z-A">Alphabetically, Z-A</option>
                      <option value="Low to High">Price: Low to High</option>
                      <option value="High to Low">Price: High to Low</option>
                    </select>
                  </div>
                </div>

                {/* Fade effect on products */}
                <div className={loading ? "fade-content" : ""}>
                  <div className="row">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <div className="col-sm-4 mb-4" key={product.id}>
                          <Cards proinfo={product} />
                        </div>
                      ))
                    ) : (
                      <div className="col-12">
                        <p>No products found in this range.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Background fade blur only (no loader icon) */}
                {loading && <div className="loader-overlay"></div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
