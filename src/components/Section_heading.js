import { useState, useEffect } from "react";
import Common_heading from "./Common_heading";
import dataCards from "../mockdata/Data";
import Cards from "./Cards";
import { Link } from "react-router-dom"


const Section_heading = () => {
  const [allProducts] = useState(dataCards); 
  const [product, setproduct] = useState([]); 
  const [activeTab, setActiveTab] = useState("SKIN");

  const heading = "Featured Favorites";
  const subheading = "Explore Our Newest Skincare Innovations";


  useEffect(() => {
    const filteredData = allProducts.filter((item) => item.category === activeTab);
    setproduct(filteredData);
  }, [activeTab]);

  return (
    <div className="container">
      <Common_heading heading={heading} subheading={subheading} />


      <ul className="nav nav-tabs justify-content-center mb-4 custom-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "SKIN" ? "active" : ""}`}
            onClick={() => setActiveTab("SKIN")}
          >
            SKIN
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "BODY" ? "active" : ""}`}
            onClick={() => setActiveTab("BODY")}
          >
            BODY
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "HAIR" ? "active" : ""}`}
            onClick={() => setActiveTab("HAIR")}
          >
            HAIR
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "FACE" ? "active" : ""}`}
            onClick={() => setActiveTab("FACE")}
          >
            FACE
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "NAIL" ? "active" : ""}`}
            onClick={() => setActiveTab("NAIL")}
          >
            NAIL
          </button>
        </li>
      </ul>
    <div className="pro-cards">
      <div className="row">
        {product.map((info) => (
          <div className="col-sm-3" key={info.id}>
           <Cards proinfo={info} />
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Section_heading;
