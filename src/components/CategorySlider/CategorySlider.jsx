import axios from "axios"
import Loading from "../Loading/Loading";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useQuery } from "@tanstack/react-query";

export default function CategorySlider() {
    async function CategorySlider() {
        const options = {
            url: "https://ecommerce.routemisr.com/api/v1/categories",
            method: "GET"
        }
        return axios.request(options);
    }

    let { data, isLoading } = useQuery({
        queryKey: ["category"],
        queryFn: CategorySlider,
        staleTime: 6 * 60 * 60 * 1000,
        refetchOnMount: false,
    })
    if (isLoading) return <Loading />
    return <>
        <section className="mt-24 mb-16">
            <h2 className="font-semibold text-xl mb-3 py-1 ">Shop Popular Categories</h2>

            <Swiper slidesPerView={6} loop={true} >
                {data.data.data.map((category) => <SwiperSlide className="text-center" key={category._id}>
                    <div className="h-64 mb-2">
                        <img src={category.image} className="w-full h-full object-cover" />
                    </div>
                    <h2 className="font-semibold">{category.name}</h2>
                </SwiperSlide>)}
            </Swiper>

        </section>


    </>
}
