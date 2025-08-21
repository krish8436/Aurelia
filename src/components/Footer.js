const Footer = ()=>{
    return(
        <div className="footer">
        <div className="container">
          <div className="row">
            
      
            <div className="col-sm-4">
              <div className="footer-de">
                <h1>Connect with us</h1>
                <p>
                  Aurelia is a natural skin care solution designed to soothe,
                  protect, and support healthy skin.
                </p>
                <div className="socials d-flex">
                  <a href="#"><img src="images/instra.svg" alt="Instagram" /></a>
                  <a href="#"><img src="images/facebook.svg" alt="Facebook" /></a>
                  <a href="#"><img src="images/twitter.svg" alt="Twitter" /></a>
                </div>
              </div>
            </div>
      
      
            <div className="col-sm-4">
              <div className="footer-de">
                <h1>Useful links</h1>
                <p>
                  Whether you're shopping, checking your status, or looking for help
                </p>
                <div className="uselinks">
                  <a href="#">Terms and conditions</a>
                  <a href="#">Privacy policy</a>
                  <a href="#">Contact us</a>
                </div>
              </div>
            </div>
      
      
            <div className="col-sm-4">
              <div className="footer-de">
                <h1>Contact Info</h1>
                <p>
                  Reach out to us! Our friendly team is here to assist you with
                  anything you need
                </p>
                <div className="con-info">
                  <div className="d-flex">
                    <img src="images/map.svg" alt="Address" />
                    <span>
                      123 Paws Avenue <br />
                      Dogtown, USA
                    </span>
                  </div>
                  <div className="d-flex">
                    <img src="images/call.svg" alt="Phone" />
                    <span>(555) 123-4567</span>
                  </div>
                  <div className="d-flex">
                    <img src="images/sms.svg" alt="Email" />
                    <span>support@aurelia.com</span>
                  </div>
                </div>
              </div>
            </div>
      
          </div>
        </div>
        <div className="copy-right text-center"><p>©2025 Aurelia. All Rights Reserved.</p></div>
      </div>
      
        
    )
}

export default Footer