import React, { Component,createRef } from "react";
import { Carousel } from "antd";
import "./swiper.scss";

import SwiperPic01 from "../../img/swiper_01@2x.png";
import SwiperPic02 from "../../img/swiper_02@2x.png";
import SwiperPic03 from "../../img/swiper_03@2x.png";

const swiperList = [
    {
        id: 1,
        src: SwiperPic01,
        alt: "swiper_01",
    },
    {
        id: 2,
        src: SwiperPic02,
        alt: "swiper_02",
    },
    {
        id: 3,
        src: SwiperPic03,
        alt: "swiper_03",
    },
];

class swiper extends Component {
    swiperRef = createRef()
    componentDidMount(){
        this.swiperRef.current.goTo(this.props.index)
    }
    render() {
        return (
            <div className="login-swiper" >
                <Carousel 
                  autoplay={true}
                  dots ref={this.swiperRef}>
                    {swiperList.map((item, index) => {
                        return (
                            <div className="swiper-item" key={index}>
                                <img src={item.src} alt={item.alt} style={{width: "100%", height: "100%",objectFit: 'contain'}}/>
                                <p className="introduction">Create A CRM with Your Personal Profile</p>
                            </div>
                        );
                    })}
                </Carousel>
            </div>
        );
    }
}

export default swiper;
