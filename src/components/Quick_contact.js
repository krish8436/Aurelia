const Quick_contact = (()=>{
    return(
        <div className="quick_contact">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6 p-0">
                        <div className="con-img">
                            <img src="images/conimg.png"/>
                        </div>
                    </div>
                    <div className="col-sm-6 p-0">
                        <div className="con-form">
                            <form>
                                <div className="con-heading">
                                    <h1>Reach Out to Us Today! </h1>
                                    <p>We're here to help! Contact us now to speak
                                     with our friendly team and discover how we can assist you with all your pet-related needs.</p>
                                     <div className="mb-3">
                                        <input className="form-control" type="text" placeholder="Name"/>
                                     </div>
                                     <div className="mb-3">
                                        <input className="form-control" type="text"   placeholder="Email"/>
                                     </div>
                                     <div className="mb-3">
                                        <textarea placeholder="Message"></textarea>
                                     </div>
                                     <div className="con-btn">
                                        <button>SEND</button>
                                     </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default Quick_contact