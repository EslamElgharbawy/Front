import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import freshcartlogo from "../../assets/images/freshcart-logo.svg";
import { Usercontext } from "../Context/User.context";
import { CartContext } from "../Context/Cart.context";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { token, logout } = useContext(Usercontext)
  const { cartInfo, GetCartProducts } = useContext(CartContext)


  useEffect(() => {

    GetCartProducts()
  }, [])

  return (
    <nav className="bg-gray-100 shadow-sm p-5 fixed top-0 right-0 left-0 z-50">
      <div className="container mx-auto flex items-center gap-10">
        <Link to="/">
          <img src={freshcartlogo} alt="FreshCart Logo" className="w-32" />
        </Link>



        {token &&
          <>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-2xl ml-auto"
            >
              ☰
            </button>
            <ul
              className={`${isMenuOpen ? "block" : "hidden"
                } lg:flex gap-5 absolute lg:static bg-gray-100 w-full lg:w-auto top-full left-0 p-5 lg:p-0`}
            >
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `relative before:absolute before:bg-green-600 hover:before:w-full before:transition-[width] before:duration-300 before:w-0 before:h-0.5 before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold" : ""}`
                  }
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    `relative before:absolute before:bg-green-600 hover:before:w-full before:transition-[width] before:duration-300 before:w-0 before:h-0.5 before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold" : ""}`
                  }
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/categories"
                  className={({ isActive }) =>
                    `relative before:absolute before:bg-green-600 hover:before:w-full before:transition-[width] before:duration-300 before:w-0 before:h-0.5 before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold" : ""}`
                  }
                >
                  Categories
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/wishlist"
                  className={({ isActive }) =>
                    `relative before:absolute before:bg-green-600 hover:before:w-full before:transition-[width] before:duration-300 before:w-0 before:h-0.5 before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold" : ""}`
                  }
                >
                  Wish List
                </NavLink>
              </li>

              <li>
                <NavLink

                  to="/brands"
                  className={({ isActive }) =>
                    `relative before:absolute before:bg-green-600 hover:before:w-full before:transition-[width] before:duration-300 before:w-0 before:h-0.5 before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold" : ""}`
                  }
                >
                  Brands
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/allorders"
                  className={({ isActive }) =>
                    `relative before:absolute before:bg-green-600 hover:before:w-full before:transition-[width] before:duration-300 before:w-0 before:h-0.5 before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold" : ""}`
                  }
                >
                  Orders
                </NavLink>
              </li>
            </ul>


            <div className="hidden lg:flex gap-5 items-center ml-auto">

              <Link to={'/cart'} className="cart cursor-pointer text-lg ml-auto relative mr-5">
                <i className="fa-solid fa-cart-shopping"></i>
                <div className="cart_counter text-white h-5 w-5 absolute right-0 top-0 rounded-full translate-x-1/2 -translate-y-1/2 bg-green-600 flex justify-center items-center ">
                  {cartInfo == null ? <i className="fa-solid fa-spinner fa-spin text-sm"></i> : <span className="text-sm">{cartInfo.numOfCartItems}</span>}
                </div>
              </Link>


              <Link to={"https://facebook.com"} target="_blank" >
                <i className="fa-brands fa-facebook text-lg"></i>
              </Link>
              <Link to={"https://instagram.com"} target="_blank">
                <i className="fa-brands fa-instagram text-lg"></i>
              </Link>
              <Link to={"https://twitter.com"} target="_blank">
                <i className="fa-brands fa-twitter text-lg"></i>
              </Link>
              <Link to={"https://linkedin.com"} target="_blank">
                <i className="fa-brands fa-linkedin text-lg"></i>
              </Link>
              <Link to={"https://youtube.com"} target="_blank">
                <i className="fa-brands fa-youtube text-lg"></i>
              </Link>
            </div>

          </>
        }



        {/* Authentication Links */}
        {!token &&
          <div className={`sm:flex gap-5 ms-auto`}>
            <NavLink to="/login" className={({ isActive }) =>
              `relative before:absolute before:bg-green-600 hover:before:w-full before:transition-[width] before:duration-300 before:w-0 before:h-0.5 before:left-0 before:-bottom-1  ${isActive ? "before:!w-full font-semibold" : ""}`
            }>
              Login
            </NavLink>
            <NavLink to="/signup" className={({ isActive }) =>
              `relative before:absolute before:bg-green-600 hover:before:w-full before:transition-[width] before:duration-300 before:w-0 before:h-0.5 before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold" : ""}`
            }>
              Sign Up
            </NavLink>
          </div>
        }

        {/* Logout */}
        {token &&
          <li
            className="list-none text-lg"
            onClick={logout}
          >
            <a href="">
              <i className="fa-solid fa-right-from-bracket cursor-pointer "></i>
            </a>
          </li>
        }
      </div>
    </nav>
  );
}


