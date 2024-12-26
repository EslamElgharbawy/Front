import axios from "axios"
import { useContext, useState } from "react"
import { useEffect } from "react"
import { Usercontext } from "../../components/Context/User.context"
import { jwtDecode } from "jwt-decode"
import Loading from "../../components/Loading/Loading"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"
import { useQuery } from "@tanstack/react-query"

export default function Orders() {
    let { token } = useContext(Usercontext)
    const { id } = jwtDecode(token)

    async function getorders() {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
                method: "GET"
            }
            return axios.request(options)

        } catch (error) {
            console.log(error);

        }
    }

    let { data, isLoading } = useQuery({
        queryKey: ["Orders"],
        queryFn: getorders,
        staleTime: 6 * 60 * 60 * 1000,
        refetchOnMount: false,
    })
    if (isLoading) return <Loading />
    return (
        <>
            <Helmet>
                <title>Orders</title>
                <meta charSet="utf-8" />
                <meta name="description" content="Cart| Home Page,........."></meta>
            </Helmet>
            <section>
                {data.data.map((order) => (
                    <div key={order.id} className="border-2 rounded-lg p-3 mb-10">
                        <header className="flex justify-between items-center mb-5">
                            <div>
                                <h3 className="">Order Id</h3>
                                <h3 className="">#{order.id}</h3>
                            </div>
                            <div>
                                {order.isPaid ? <span className="px-4 inline-block text-white py-1 font-cairo transition-all duration-200 bg-green-500 hover:bg-green-600 rounded-full me-2 ">تم الدفع</span> : <span className="px-4 inline-block text-white py-1 font-cairo transition-all duration-200 bg-red-500 hover:bg-red-600 rounded-full me-2 ">غير مدفوع</span>}
                                {order.isDelivered ? <span className="px-4 inline-block text-white py-1 font-cairo transition-all duration-200 bg-green-500 hover:bg-green-600 rounded-full">تم الاسنلام</span> : <span className="px-4 inline-block text-white py-1 font-cairo transition-all duration-200 bg-blue-500 hover:bg-blue-600 rounded-full">قيد التوصيل</span>}
                            </div>
                        </header>
                        <div className="grid md:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 ">
                            {order.cartItems.map((product) => (<div key={product._id} className="product_item overflow-hidden border-2 rounded-lg sm:max-md:mb-5">
                                <img src={product.product.imageCover} alt="" className="w-full" />

                                <div className="p-4">
                                    <h3 className="font-semibold text-lg"><Link to={`/product/${product.product._id}`}>{product.product.title}</Link></h3>
                                    <div className="flex justify-between items-center">
                                        <p><span className="font-bold">count:</span> {product.count}</p>
                                        <p><span>{product.price}</span>L.E</p>
                                    </div>
                                </div>

                            </div>))}
                        </div>

                        <p className="text-xl m-5 font-semibold">Your Total Order Price is <span className="font-semibold text-xl text-green-500">{order.totalOrderPrice}</span> L.E</p>

                    </div>
                ))}
            </section>

        </>
    );

}

