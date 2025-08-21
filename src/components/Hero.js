import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    customPaging: i => (
      <div
        style={{
          width: '30px',
          padding: '5px',
          textAlign: 'center',
          color: '#000',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        {i + 1}
      </div>
    ),
    appendDots: dots => (
      <div
        style={{
          position: 'absolute',
          right: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          zIndex: 10,
        }}
      >
        {dots}
      </div>
    ),
  };

  // Determine banner class based on current slide
  const bannerClass = `banner ${
    currentSlide === 0
      ? 'banner-1'
      : currentSlide === 1
      ? 'banner-2'
      : 'banner-3'
  }`;

  return (
    <div className={bannerClass} style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        <Slider {...settings}>
          <div className="item">
            <div className="banner-de">
              <h1>Skin Resets</h1>
              <p>Empower Your Skin to Shine</p>
             <Link to="/shop">
  <button>
    Buy now <img src="images/arrow1.svg" alt="icon" />
  </button>
</Link>
            </div>
          </div>
          <div className="item">
            <div className="banner-de">
              <h1>Glow Care</h1>
              <p>Empower Your Skin to Shine</p>
              <Link to="/shop">
  <button>
    Buy now <img src="images/arrow1.svg" alt="icon" />
  </button>
</Link>
            </div>
          </div>
          <div className="item">
            <div className="banner-de">
              <h1>Glow Skin</h1>
              <p>Empower Your Skin to Shine</p>
              <Link to="/shop">
  <button>
    Buy now <img src="images/arrow1.svg" alt="icon" />
  </button>
</Link>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Hero;
