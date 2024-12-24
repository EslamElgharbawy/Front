import { useContext, useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { Usercontext } from "./User.context";
import toast from "react-hot-toast";

export const CartContext = createContext(null);
export default function CartProvider({ children }) {

    let { token } = useContext(Usercontext)
    const [cartInfo, setcartInfo] = useState(null)

    async function AddProductToCart({ productId }) {
        let Toastid = toast.loading("Adding Product...")
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                method: "POST",
                headers: {
                    token
                },
                data: {
                    productId
                }
            }
            let { data } = await axios.request(options)
            if (data.status == "success") {
                toast.success(data.message)
                GetCartProducts()
            }

        } catch (error) {
            console.log(error);

        } finally {
            toast.dismiss(Toastid)
        }
    }

    async function GetCartProducts() {
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                method: "GET",
                headers: {
                    token
                }
            }
            let { data } = await axios.request(options)
            setcartInfo(data);
        } catch (error) {
            console.log(error);

        }

    }
    async function RemoveProduct({ productId }) {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                method: "DELETE",
                headers: {
                    token
                }
            }
            let { data } = await axios.request(options)
            if (data.status == "success") {
                toast.success("Product has been deleted")
                setcartInfo(data)
            }
        } catch (error) {
            console.log(error);

        }
    }
    async function ClearCart() {
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                method: "DELETE",
                headers: {
                    token
                }
            }
            let { data } = await axios.request(options)
            if (data.message == "success") {
                toast.success("Cart has been Empty")
                setcartInfo({
                    numOfCartItems: 0
                })
            }
        } catch (error) {
            console.log(error);

        }
    }
    async function ProductCount({ productId, count }) {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                method: "PUT",
                headers: {
                    token
                },
                data: {
                    count
                }
            }
            let { data } = await axios.request(options)
            if (data.status == "success") {
                setcartInfo(data)
            }
        } catch (error) {
            console.log(data);
        }
    }

    console.log(cartInfo);
    
    return <>
        <CartContext.Provider value={{ AddProductToCart, GetCartProducts, cartInfo, RemoveProduct, ClearCart, ProductCount }}>
            {children}
        </CartContext.Provider>
    </>
}