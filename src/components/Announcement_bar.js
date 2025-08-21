
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Announcement_bar = () => {
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
   
  };

  return (
    <div className="announcement-bar">
      <div className="container">
        <Slider {...settings}>
          <div className="item">
            <p>Your Skin’s Fresh Start Begins Here</p>
          </div>
          <div className="item">
            <p>Glow Naturally with Every Step</p>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Announcement_bar;
