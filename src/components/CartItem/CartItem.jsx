import { useContext } from "react"
import { CartContext } from "../Context/Cart.context"
import { Link } from "react-router-dom"

export default function CartItem({ productInfo }) {
    const { count, price, product } = productInfo
    const { id, category, imageCover, title } = product
    let { RemoveProduct, ProductCount } = useContext(CartContext)
    return <>
        <div className="flex gap-2">
            <div className="bg-gray-100 flex items-center justify-between gap-28 px-10 py-5 rounded-lg grow">

                <img src={imageCover} className="w-24 h-24 object-cover rounded-full border-4 border-white" />

                <Link to={`/product/${id}`} className="font-semibold text-lg">{title}</Link >
                <h3 className="ms-auto text-lg">{category.name}</h3>
                <div className="counter flex justify-center items-center text-xl">
                    <span className="mr-3">{count}</span>
                    <div className=" flex flex-col gap-3">
                        <i
                            onClick={() => {
                                ProductCount({ productId: id, count: count + 1 })
                            }}
                            className="fa-solid cursor-pointer fa-circle-plus"></i>
                        <i 
                        onClick={() => {
                            ProductCount({ productId: id, count: count - 1 })
                        }}
                        className="fa-solid cursor-pointer fa-circle-minus"></i>
                    </div>
                </div>
                <div className="price text-xl">
                    <h3>{price} L.E</h3>
                </div>
            </div>

            <button
                onClick={() => {
                    RemoveProduct({ productId: id })
                }}
                className="bg-gray-100 hover:bg-gray-200 transition-all duration-200 p-3 rounded-lg">
                <i className="fa-solid fa-xmark"></i>
            </button>
        </div >

    </>
}
