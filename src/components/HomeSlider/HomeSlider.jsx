import img4 from '../../assets/images/51YVzuGNl1L._SX1500_.jpg'
import img5 from '../../assets/images/17334664530eb52ae6fc00e541ce72406b2e68dc1f_thumbnail_2000x.jpg'
import img6 from '../../assets/images/1733466470f5952a01926eb9eb827c64d6ea7905f1_thumbnail_2000x.webp'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';


export default function HomeSlider() {
    return <>
        <div className='w-4/5 m-auto'>
        <div className="grid grid-cols-12 mb-8 ">
            <div className="col-span-12 ">
                <Swiper loop={true} slidesPerView={1}  style={{height:"100%"}}>
                    <SwiperSlide ><img src={img5} className='w-full h-full object-cover'/></SwiperSlide>
                    <SwiperSlide ><img src={img6} className='w-full h-full object-cover'/></SwiperSlide>
                </Swiper>
            </div>
            
        </div>
        </div>
    </>
}
