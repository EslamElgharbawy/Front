import { useContext, useEffect, useState } from "react"
import { WishlistContext } from "../../components/Context/Wishlist.context"
import Loading from "../../components/Loading/Loading"
import Wishlistitem from "../../components/Wishlistitem/Wishlistitem"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"

export default function Wishlist() {
  let { wishlistProduct, getWishlistProduct } = useContext(WishlistContext)

 

  useEffect(() => {
    getWishlistProduct()
  }, [])

  return <>
        <Helmet><title>Wish List</title></Helmet>
    <h1 className="font-semibold text-3xl mb-5">My Wish List :</h1>
    {wishlistProduct == null ? <Loading /> :
      <section>
        {
          wishlistProduct.count == 0 ? <>
            <div className="text-center bg-gray-200 p-5 rounded-lg shadow-md">
              <h2 className="mb-5">
                Oops! Your Wish List Is Empty.Start Shopping Now By Clicking The Button Below And Find Something You Love
              </h2>
              <Link to={'/'} className="btn bg-green-500 hover:bg-green-600 font-semibold">
                Back To Home
              </Link >
            </div>
          </> :
            <>
              <div className="space-y-8">
                {wishlistProduct.data.map((item) => <Wishlistitem key={item._id} productInfo={item} />)}
              </div>
            </>
        }
      </section>
    }






  </>
}
