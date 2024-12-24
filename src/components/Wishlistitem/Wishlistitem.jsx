import { useContext } from "react"
import { WishlistContext } from "../Context/Wishlist.context"
import { CartContext } from "../Context/Cart.context"

export default function Wishlistitem({ productInfo }) {
  const { price, id, imageCover, title } = productInfo
  let { RemoveWishlistProduct } = useContext(WishlistContext)
  let { AddProductToCart } = useContext(CartContext)




  return <>
    <div className="whishlist_item flex gap-2">

      <div className="grid grid-cols-12 bg-gray-100 border-b-2 rounded-lg">

        <div className="col-span-5 flex justify-center items-center gap-5 p-5 ms-10">
          <div className="image w-2/4">
            <img src={imageCover} alt="" className="w-full" />
          </div>
          <div className="w-full space-y-5">
            <h2 className="font-semibold text-2xl">{title}</h2>
            <span className="text-green-700 text-lg font-semibold text-opacity-90">{price} EGP</span>

          </div>
        </div>

        <div className=" col-span-7 text-end pr-32 flex justify-end items-center ">
          <button
            onClick={() => {
              AddProductToCart({ productId: id })
            }}
            className="btn border-2 border-green-400 text-black text-2xl font-semibold p-3 ">Add To Cart</button>
        </div>

      </div>

      <button
        onClick={() => {
          RemoveWishlistProduct({ productId: id })
        }}
        className="bg-gray-100 hover:bg-gray-200 transition-all duration-200 p-3 rounded-lg">
        <i className="fa-solid fa-xmark"></i></button>
    </div>

  </>
}
