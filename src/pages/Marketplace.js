import React from 'react';
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import img1 from "../images/blog-1-760x560.jpg";
import img2 from "../images/blog-2-760x560.jpg";
import img3 from "../images/blog-3-760x560.jpg";

const Marketplace = () => {
    return (
        <div>
            <Header />
            <div className="content-wrap">
                <div className="mpl-box-md">
                    <div className="container text-center">
                        <h2>Marketplace</h2>
                    </div>

                    <div className="container">
                        <div className="row vgap-md">
                            <div className="col-12 col-sm-6 col-md-4">
                            <a href="blog-post-gallery.html" className="mpl-post-item mpl-post-vertical">
                            <span className="mpl-post-image">
                            <span className="mpl-image">
                            <img src={img1} alt="" />
                            </span>
                            </span>
                            <span className="mpl-post-title h4">Black Mesa</span>
                            <span className="mpl-post-date">
                            <span><svg className="icon" viewBox="0 0 24 24" stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 2V6M8 2V6M3 10H21M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4Z" />
                            </svg></span> January 18, 2021 </span>
                            </a>
                            </div>
                            <div className="col-12 col-sm-6 col-md-4">
                            <a href="blog-post-carousel.html" className="mpl-post-item mpl-post-vertical">
                            <span className="mpl-post-image">
                            <span className="mpl-image">
                            <img src={img2} alt="" />
                            </span>
                            </span>
                            <span className="mpl-post-title h4">Nioh 2</span>
                            <span className="mpl-post-date">
                            <span><svg className="icon" viewBox="0 0 24 24" stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 2V6M8 2V6M3 10H21M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4Z" />
                            </svg></span> January 17, 2021 </span>
                            </a>
                            </div>
                            <div className="col-12 col-sm-6 col-md-4">
                            <a href="blog-post-simple.html" className="mpl-post-item mpl-post-vertical">
                            <span className="mpl-post-image">
                            <span className="mpl-image">
                            <img src={img3} alt="" />
                            </span>
                            </span>
                            <span className="mpl-post-title h4">Death Stranding</span>
                            <span className="mpl-post-date">
                            <span><svg className="icon" viewBox="0 0 24 24" stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 2V6M8 2V6M3 10H21M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4Z" />
                            </svg></span> January 17, 2021 </span>
                            </a>
                            </div>

                        </div>

                        <ul className="pagination mt-60 mb-0">
                            <li className="page-item active">
                            <a href="#" className="page-link">1</a>
                            </li>
                            <li className="page-item" >
                            <a href="#" className="page-link">2</a>
                            </li>
                            <li className="page-item" >
                            <a href="#" className="page-link">3</a>
                            </li>
                            <li className="page-item" >
                            <a href="#" className="page-link">4</a>
                            </li>
                            <li className="page-item" >
                            <a href="#" className="page-link next">Next</a>
                            </li>
                        </ul>
                    </div>

                </div>
                
                
                    
                
            </div>
            <Footer />
        </div>
    );
};

export default Marketplace;