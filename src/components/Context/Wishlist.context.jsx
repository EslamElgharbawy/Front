import { createContext, useContext, useState } from "react";
import { Usercontext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";

export const WishlistContext = createContext(null);
export default function CartProvider({ children }) {
    let { token } = useContext(Usercontext)
    const [wishlistProduct, setwishlistProduct] = useState(null)

    async function RemoveWishlistProduct({ productId }) {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
                method: "DELETE",
                headers: {
                    token
                }
            }
            let { data } = await axios.request(options)
            console.log(data);
            if (data.status == "success") {
                toast.success("Product has been deleted")}
            setwishlistProduct(data)
        } catch (error) {
            console.log(error);

        }
    }
    async function AddProductToWishlist({ productId }) {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/wishlist`,
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
            }
            setwishlistProduct(data)
        } catch (error) {
            console.log(error);
        }
    }
    async function getWishlistProduct() {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/wishlist`,
                method: "GET",
                headers: {
                    token
                },
            }
            let { data } = await axios.request(options)
            setwishlistProduct(data)
        } catch (error) {
            console.log(error);
        }
    }

    console.log("lll",wishlistProduct);

    return <>
        <WishlistContext.Provider value={{ AddProductToWishlist, RemoveWishlistProduct, wishlistProduct,getWishlistProduct }}>
            {children}
        </WishlistContext.Provider>
    </>
}