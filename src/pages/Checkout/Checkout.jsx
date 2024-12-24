import { Formik, useFormik } from "formik"
import { useContext, useState } from "react"
import { CartContext } from "../../components/Context/Cart.context"
import axios from "axios"
import { Usercontext } from "../../components/Context/User.context"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export default function Checkout() {
    let { cartInfo } = useContext(CartContext)
    let { token } = useContext(Usercontext)
    let navigate = useNavigate()
    let [paymentorder, setpaymentorder] = useState(null)

    async function cashorder(values) {
        let toastid = toast.loading("Waiting...")
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
                method: "POST",
                headers: {
                    token
                },
                data: values
            }
            let { data } = await axios.request(options)
            if (data.status == "success") {
                toast.success("Your Order Created");
                setTimeout(() => {
                    navigate("/allorders")
                }, 2000)
            }
        } catch (error) {
            console.log(error);

        } finally {
            toast.dismiss(toastid)
        }
    }

    async function onlineorder(values) {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.cartId}?url=${location.origin}`,
                method: "POST",
                headers: {
                    token
                },
                data: values
            }
            let { data } = await axios.request(options)
            if (data.status == "success") {
            toast.loading("Waiting...")
                setTimeout(() => {
                    setTimeout(() => {
                        location.href = data.session.url
                    }, 2000)
                }, 2000)
            }
        } catch (error) {
            console.log(error);

        } 
    }


    const formik = useFormik({
        initialValues: {
            shippingAddress: {
                details: "",
                phone: "",
                city: ""
            }
        },

        onSubmit: (values) => {
            if (paymentorder == "cash") { cashorder(values) }
            else { onlineorder(values) }

        }

    })




    return <>
        <section>
            <h1 className="text-2xl text-gray-600 mb-6 font-semibold">Shipping Address</h1>
            <form className="space-y-4" onSubmit={formik.handleSubmit}>
                <div className="city">
                    <input type="text" placeholder="City" className="form-control w-full"
                        value={formik.values.shippingAddress.city}
                        onChange={formik.handleChange}
                        name="shippingAddress.city"
                    />
                </div>

                <div className="phone">
                    <input type="tel" placeholder="Phone" className="form-control w-full"
                        value={formik.values.shippingAddress.phone}
                        onChange={formik.handleChange}
                        name="shippingAddress.phone"
                    />
                </div>

                <div className="details">
                    <textarea type="text" placeholder="Details" className="form-control w-full"
                        value={formik.values.shippingAddress.details}
                        onChange={formik.handleChange}
                        name="shippingAddress.details"
                    />
                </div>
                
                <button onClick={()=>{
                    setpaymentorder("cash")
                }} type="submit" className="btn font-semibold bg-blue-500 hover:bg-blue-600 transition-all duration-200 mr-3">Cash Order</button>
                <button onClick={()=>{
                    setpaymentorder("online")
                }} type="submit" className="btn font-semibold bg-green-500 hover:bg-green-600 transition-all duration-200 ">Online Payment</button>
            </form>



        </section>


    </>
}
