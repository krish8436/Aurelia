import Common_heading from "./Common_heading";
import Cards from "./Cards";
import dataCards from "../mockdata/Data";
import Slider from "react-slick"; 
import { useState } from "react";

const Bestsellers = () => {
  const heading = "Best Sellers";
  const subheading = "Your favorites, all in one place.";

  const [bestsale] = useState(
    dataCards.filter((item) => item.isBestSeller)
  );

  const sliderSettings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, 
    slidesToScroll: 1,
    autoplay: true, 
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <div className="bestseller py-5">
      <div className="container">
        <Common_heading heading={heading} subheading={subheading} />

        <Slider {...sliderSettings}>
          {bestsale.map((best) => (
            <div key={best.id} className="px-2">
              <Cards proinfo={best} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Bestsellers;
