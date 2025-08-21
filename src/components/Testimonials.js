import Common_heading from "./Common_heading"
import Slider from "react-slick"

const Testimonials = (()=>{
    const heading = "Customer Experiences"
    const subheading = "Authentic Voices. Honest Glow."
    const sliderSettings = {
      dots: true,
      arrows: true,
      infinite: true, 
      speed: 500,
      slidesToShow: 3, 
      slidesToScroll: 1,
      autoplay: false,
      centerMode: true, 
      centerPadding: '0px',
      responsive: [
        {
          breakpoint: 992,
          settings: { slidesToShow: 2 }
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
    
    const review = [
        {
            author : "images/face1.png",
            ratings:"images/ratings.png",
            message: "This cleanser is a game-changer for my sensitive skin! It leaves my face feeling clean but not stripped. No irritation, and it’s gentle enough to use twice a day. Highly recommend!",
            name: "Lina Gomes"
        },
        {
            author : "images/face2.png",
            ratings:"images/ratings.png",
            message: "This cleanser is a game-changer for my sensitive skin! It leaves my face feeling clean but not stripped. No irritation, and it’s gentle enough to use twice a day. Highly recommend!",
            name: "Lina Gomes"
        },
        {
            author : "images/face3.png",
            ratings:"images/ratings.png",
            message: "This cleanser is a game-changer for my sensitive skin! It leaves my face feeling clean but not stripped. No irritation, and it’s gentle enough to use twice a day. Highly recommend!",
            name: "Lina Gomes"
        },
        {
          author : "images/face3.png",
          ratings:"images/ratings.png",
          message: "This cleanser is a game-changer for my sensitive skin! It leaves my face feeling clean but not stripped. No irritation, and it’s gentle enough to use twice a day. Highly recommend!",
          name: "Lina Gomes"
      }
    ]
    return(
        <div className="testimonials">
            <div className="container">
            <Common_heading heading = {heading} subheading = {subheading} />
            <div className="testislider">
            <Slider {...sliderSettings}>
              
             {
                review.map((item)=>{
                    return(
                        <div className="slider-card">
                        <div className="testi-item">
      
                            <img className="author" src={item.author} />
                        
                          <img className="ratings" src={item.ratings} />
                          <p>{item.message}</p>
                          <div className="hr"></div>
                          <h5>{item.name}</h5>
                        </div>
                      </div>
                      
                    )
                })
             }
            
            </Slider>
            </div>
            </div>
        </div>
    )

})

export default Testimonials