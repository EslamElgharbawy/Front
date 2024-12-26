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
            <h2 className="font-semibold text-xl mb-3 py-1">Shop Popular Categories</h2>
            <Swiper
                loop={true}
                breakpoints={{
                    340: { slidesPerView: 1 }, 
                    500: { slidesPerView: 2 }, 
                    1280: { slidesPerView: 6 }, 
                }}
            >
                {data.data.data.map((category) => (
                    <SwiperSlide className="text-center" key={category._id}>
                        <div className="h-64 mb-2">
                            <img
                                src={category.image}
                                className="w-full h-full sm:max-2xl:object-contain 2xl:object-cover"
                                alt={category.name}
                            />
                        </div>
                        <h2 className="font-semibold">{category.name}</h2>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>



    </>
}
