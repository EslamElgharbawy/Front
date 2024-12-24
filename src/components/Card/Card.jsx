import { useContext, useState } from "react";
import { CartContext } from "../Context/Cart.context";
import { Link } from "react-router-dom";
import { WishlistContext } from "../Context/Wishlist.context";

export default function Card({ productInfo }) {
    const { imageCover, title, category, price, ratingsAverage, id } = productInfo;
    let { AddProductToCart } = useContext(CartContext)
    let { AddProductToWishlist } = useContext(WishlistContext)
    const [isWishlisted, setIsWishlisted] = useState(false);

    const toggleWishlist = () => {
        AddProductToWishlist({ productId: id });
        setIsWishlisted(!isWishlisted);
    };

    return <>
        <div className="group/card sm:col-span-12 sm:max-md:mx-3 md:max-lg:mx-2 lg:col-span-6 lg:max-xl:mx-3 xl:col-span-4 2xl:col-span-3  shadow-lg rounded-lg overflow-hidden p-5 ">
            <div className="icon_wishlist text-end ">
            </div>
            <div className="layout relative">

                <img src={imageCover} className="w-full mb-5 " />

                <div className="links group-hover/card:opacity-100 transition-opacity duration-300 absolute left-0 top-0 w-full h-full bg-slate-500 flex justify-center items-center gap-5  bg-opacity-40 opacity-0">
                    <div
                        onClick={() => {
                            AddProductToCart({ productId: id })
                        }}
                        className="icon w-10 cursor-pointer h-10 bg-green-500 flex justify-center items-center rounded-full text-white ">
                        <i className="fa-solid text-xl fa-cart-shopping"></i>
                    </div>
                    <Link to={`/product/${id}`}
                        className="icon w-10 cursor-pointer h-10 bg-green-500 flex justify-center items-center rounded-full text-white ">
                        <i className="fa-solid text-xl fa-eye "></i>
                    </Link>
                    <div onClick={toggleWishlist}
                        className="icon w-10 cursor-pointer h-10 bg-green-500 flex justify-center items-center rounded-full text-white ">
                        <i
                            className={`fa-solid fa-heart ${isWishlisted ? "text-black" : "text-white"
                                }`}
                        ></i>
                    </div>
                </div>



            </div>
            <div className="body space-y-4">
                <div className="div">
                    <h3 className='text-2xl text-green-500 text-center font-semibold mb-3 border-b-2'>{category.name}</h3>
                    <h3 className="text-lg line-clamp-2">{title}</h3>
                </div>
                <div className="flex justify-between items-center">
                    <p className=" text-lg">{price} L.E</p>
                    <div className="flex justify-center items-center">
                        <i className="fa-solid fa-star " style={{ color: "#FFD43B" }}></i>
                        <span className="text-lg ">{ratingsAverage}</span>
                    </div>
                </div>
            </div>
        </div>

    </>
}
