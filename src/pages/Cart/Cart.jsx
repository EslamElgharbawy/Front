import { useContext, useEffect } from "react"
import { CartContext } from "../../components/Context/Cart.context"
import Loading from "../../components/Loading/Loading"
import CartItem from "../../components/CartItem/CartItem"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"

export default function Cart() {
  let { GetCartProducts, cartInfo, ClearCart } = useContext(CartContext)
  

  useEffect(() => {
    GetCartProducts()
  }, [])
  return <>
  <Helmet>
    <title>Cart</title>
    <meta charSet="utf-8"/>
    <meta name="description" content="Cart| Home Page,........."></meta>
    </Helmet>
    <div className="flex mb-7 font-semibold gap-5 items-center">
      <i className="fa-brands fa-opencart text-3xl pr-4"></i>
      <h2 className="text-slate-800 text-xl pl-4 relative before:absolute before:w-0.5 before:h-3/4 before:bg-slate-800 before:-left-3 before:top-1/2 before:-translate-y-1/2">Your Shopping Cart</h2>
    </div>
    {cartInfo == null ? <Loading /> :
      <section>
        {cartInfo.numOfCartItems == 0 ? 
          <div className="text-center bg-gray-200 p-5 rounded-lg shadow-md">
            <h2 className="mb-5">
              Oops! Your Cart Is Empty.Start Shopping Now By Clicking The Button Below And Find Something You Love
            </h2>
            <Link to={'/'} className="btn bg-green-500 hover:bg-green-600 font-semibold">
              Back To Home
            </Link >
          </div>
         :
          <>
            <div className="space-y-8">
              {cartInfo.data.products.map((product) => <CartItem key={product._id} productInfo={product} />)}
            </div>

            <div className="Cart_info mt-7 flex justify-between items-center">
              <div className="flex justify-center items-center">
                <i className="fa-solid fa-sack-dollar mr-3 text-3xl text-green-600"></i>
                <p className="font-semibold text-lg">Your Total Cart Price <span className="text-green-600 text-xl">{cartInfo.data.totalCartPrice}</span></p>
              </div>
              <button
                onClick={ClearCart}
                className="btn bg-red-500 hover:bg-red-600 transition-all duration-300 font-semibold text-lg">
                <i className="fa-solid fa-trash mr-2"></i>
                Clear Cart
              </button>

            </div>

            <Link to={'/checkout'} className="flex justify-center items-center mt-14">
            <button className="btn bg-green-500 hover:bg-green-600 transition-all duration-300 font-semibold w-3/5 text-xl">Next Stip (payment)</button>
            </Link >

          </>
        }
      </section>
    }

  </>
}

