import { useContext, useEffect } from "react"
import { WishlistContext } from "../Context/Wishlist.context"
import { CartContext } from "../Context/Cart.context"

export default function Wishlistitem({ productInfo }) {
  const { price, id, imageCover, title } = productInfo
  let { RemoveWishlistProduct, getWishlistProduct } = useContext(WishlistContext)
  let { AddProductToCart } = useContext(CartContext)

  useEffect(() => {
    getWishlistProduct()
  },[])
  
  return <>
    <div className="whishlist_item flex  md:flex-row gap-2">

      <div className="grid grid-cols-12 md:max-lg:grid-cols-10 bg-gray-100 border-b-2 rounded-lg">
        <div className=" xl:col-span-5 sm:max-md:col-span-11 sm:max-md:text-center md:max-lg:col-span-10 md:max-lg:flex-col md:max-lg:text-center lg:max-xl:col-span-8  flex sm:max-md:flex-col justify-center items-center gap-5 p-5 ms-10">
          <div className="image w-2/4 sm:max-md:w-3/4">
            <img src={imageCover} alt="" className="w-full" />
          </div>
          <div className="w-full space-y-5">
            <h2 className="font-semibold text-2xl">{title}</h2>
            <span className="text-green-700 text-lg font-semibold text-opacity-90">{price} EGP</span>

          </div>
        </div>

        <div className=" lg:max-xl:col-span-4 sm:max-xl:mb-5 sm:max-md:col-span-11 md:max-lg:col-span-8 text-end sm:max-md:pr-10 xl:pr-32 2xl:col-span-6 sm:max-xl:pr-20 md:max-lg:pr-10 flex justify-end items-center ">
          <button
            onClick={() => {
              AddProductToCart({ productId: id })
            }}
            className="btn border-2 border-green-400 text-black text-2xl font-semibold p-3 hover:bg-green-500 hover:text-white transition-all duration-300 ">Add To Cart</button>
        </div>

      </div>

      <button
        onClick={() => {
          RemoveWishlistProduct({ productId: id })
        }}
        className="bg-gray-100 hover:bg-gray-200 transition-all duration-200 p-3 rounded-lg">
        <i className="fa-solid fa-xmark"></i></button>
    </div>


{/* <div className="wishlist_item flex sm:max-2xl:flex-col md:flex-row gap-2">
  <div className="grid grid-cols-1 md:grid-cols-12 bg-gray-100 border-b-2 rounded-lg">
    <div className="col-span-12 md:col-span-5 flex justify-center items-center p-5 ms-10">
      <div className="image 2xl:w-2/4 md:max-2xl:w-full">
        <img src={imageCover} alt="" className="w-full" />
      </div>
    </div>

    <div className="w-full space-y-5 px-5 md:max-2xl:px-0 md:max-2xl:col-span-7">
      <h2 className="font-semibold text-xl md:text-2xl">{title}</h2>
      <span className="text-green-700 text-lg font-semibold text-opacity-90">
        {price} EGP
      </span>
    </div>

    <div className="flex flex-wrap gap-2 justify-end items-center mt-4 md:mt-0 px-5 md:pr-32">
      <button
        onClick={() => {
          AddProductToCart({ productId: id });
        }}
        className="btn border-2 border-green-400 text-black text-xl font-semibold p-3"
      >
        Add To Cart
      </button>
    </div>
  </div>

  <div className="flex justify-end">
    <button
      onClick={() => {
        RemoveWishlistProduct({ productId: id });
      }}
      className="bg-gray-100 hover:bg-gray-200 transition-all duration-200 p-3 rounded-lg"
    >
      <i className="fa-solid fa-xmark"></i>
    </button>
  </div>
</div> */}

  </>
}
