import axios from "axios"
import { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";

export default function Brands() {
    const [selectedBrand, setSelectedBrand] = useState(null); // لتخزين بيانات البراند المحدد
    const [showModal, setShowModal] = useState(false); // التحكم في عرض الـ Modal

    async function getAllBrands() {
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/brands",
                method: "GET"
            }
            return axios.request(options)

        } catch (error) {
            console.log(error);

        }
    }
    function handleBrandClick(brand) {
        setSelectedBrand(brand);
        setShowModal(true);
    }
    function handleCloseModal() {
        setShowModal(false);
    }

    let { data, isLoading } = useQuery({
        queryKey: ["Brands"],
        queryFn: getAllBrands,
        staleTime: 6 * 60 * 60 * 1000,
        refetchOnMount: false,
    })

    if (isLoading) return <Loading />

    return <>
        <Helmet><title>Brands</title></Helmet>
        <section className="text-center">
            <h1 className="text-5xl text-green-600 font-semibold mb-10">
                All Brands
            </h1>
            <div className="  grid grid-cols-4 gap-4">
                {data.data.data.map((product) =>
                    <div
                        onClick={() => handleBrandClick(product)}
                        className="group/item col-span-1 border-2 rounded-lg ">

                        <div key={product._id} className=" group-hover/item:shadow-xl  group-hover/item:shadow-green-700 transition-all duration-300 p-5">
                            <img src={product.image} alt="" className="w-full h-full object-cover " />
                        </div>
                    </div>)}
            </div>

        </section>
        {
            showModal && selectedBrand && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg  w-2/5">
                        <div className="p-4 text-end">
                            <button
                                className=" top-2 right-2 text-gray-500 text-3xl "
                                onClick={handleCloseModal}
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>

                        <div className="flex border-y-2 p-2 justify-between">
                            <h2 className="text-green-600 text-5xl font-bold ms-10 flex justify-center gap-6 flex-col">
                                {selectedBrand.name}
                                <p className="text-lg text-start text-gray-600"> {selectedBrand.name}</p>
                            </h2>
                            <img
                                src={selectedBrand.image}
                                alt={selectedBrand.name}

                            />
                        </div>

                        <div className="p-4 text-end">
                            <button
                                className=" top-2 right-2 bg-gray-500 text-white text-lg p-2 rounded-xl"
                                onClick={handleCloseModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )
        }

    </>
}












