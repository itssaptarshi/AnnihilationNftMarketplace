import React from 'react';
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import img1 from "../images/blog-1-760x560.jpg";
import img2 from "../images/blog-2-760x560.jpg";
import img3 from "../images/blog-3-760x560.jpg";
import img4 from "../images/blog-4-760x560.jpg";
import img5 from "../images/blog-5-760x560.jpg";
import { Link } from "react-router-dom";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';


const Home = () => {
    
    return (
        <div>
        <Header />
          <div className="content-wrap" onLoad={ window['initPluginSwiper'] }>
                <div className="mpl-box-md">
                    <div className="container">
                        <div className="row">
                        <div className="col-lg-12 text-center">
                            <h2 className="display-1">
                                Welcome to the NFT Marketplace of Annihilation
                            </h2>
                            <p>
                                Hello Testing....
                            </p>
                        </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col-lg-8">
                                <h2 className="display-2 text-uppercase">NFT Collections</h2>
                                
                            </div>
                        </div>
                        
                        
                    </div>
                    
                    <div className='container'>
                    
                    </div>

                    <div className='container'>
                        <div className="mpl-carousel" data-gap="30" data-loop="true" data-arrows="true" data-autoplay="5000" data-slides="1" data-breakpoints="992:3,767:2">
                            
                            <Link to="/collection/dummyAddress" className="mpl-post-item mpl-post-overlay">
                                <span className="mpl-post-image">
                                    <span className="mpl-image">
                                    <img src={img1} alt="" />
                                    </span>
                                </span>
                                <span className="mpl-post-content">
                                    <span className="mpl-post-title h4">Black Mesa</span>
                                    <div className="mpl-hexagon-rating mpl-hexagon-rating-small" data-hexagon="91"><span>9.1</span></div>
                                </span>
                            </Link>
                            
                            <Link to="/collection/dummyAddress" className="mpl-post-item mpl-post-overlay">
                                <span className="mpl-post-image">
                                <span className="mpl-image">
                                <img src={img2} alt="" />
                                </span>
                                </span>
                                <span className="mpl-post-content">
                                <span className="mpl-post-title h4">Nioh 2</span>
                                <div className="mpl-hexagon-rating mpl-hexagon-rating-small" data-hexagon="90"><span>9</span></div>
                                </span>
                            </Link>
                            <Link to="/collection/dummyAddress" className="mpl-post-item mpl-post-overlay">
                                <span className="mpl-post-image">
                                <span className="mpl-image">
                                <img src={img3} alt="" />
                                </span>
                                </span>
                                <span className="mpl-post-content">
                                <span className="mpl-post-title h4">Death Stranding</span>
                                <div className="mpl-hexagon-rating mpl-hexagon-rating-small" data-hexagon="38"><span>3.8</span></div>
                                </span>
                            </Link>
                            <Link to="/collection/dummyAddress" className="mpl-post-item mpl-post-overlay">
                                <span className="mpl-post-image">
                                <span className="mpl-image">
                                <img src={img4} alt="" />
                                </span>
                                </span>
                                <span className="mpl-post-content">
                                <span className="mpl-post-title h4">Cyberpunk 2077</span>
                                <div className="mpl-hexagon-rating mpl-hexagon-rating-small" data-hexagon="98"><span>9.8</span></div>
                                </span>
                            </Link>
                            <Link to="/collection/dummyAddress" className="mpl-post-item mpl-post-overlay">
                                <span className="mpl-post-image">
                                <span className="mpl-image">
                                <img src={img5} alt="" />
                                </span>
                                </span>
                                <span className="mpl-post-content">
                                <span className="mpl-post-title h4">Sekiro: Shadows Die Twice</span>
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>

                <Footer /> 

          </div>

           
        </div>
    );
};

export default Home;