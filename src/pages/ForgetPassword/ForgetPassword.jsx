import axios from "axios"
import { useFormik } from "formik"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { object, string } from "yup"

export default function ForgetPassword() {
    const navigate = useNavigate()

  const validationSchema = object({
      email: string().required("Email is required").email("Email is invalid"),
    })

    async function forgetpassword(email) {
        try {
            const options = {
                url: 'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
                method: 'POST',
                data: email
            };
            let { data } = await axios.request(options)
            console.log("ddd", data);
            if (data.statusMsg == "success") {
                toast.loading("Waiting...")
                setTimeout(() => {
                    navigate("/Resetpassword")
                    toast.dismiss()
                }, 2000);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema,
        onSubmit: forgetpassword
    });

    return <>
        <section className="py-10">
            <div className="container">
                <h1 className="text-3xl mb-5">
                    Enter Your Email :
                </h1>
                <form className="space-y-5" onSubmit={formik.handleSubmit}>
                    <div>
                        <input
                            className="form-control w-full"
                            type="email"
                            placeholder="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name="email"
                        />
                    </div>
                    <button
                        onClick={forgetpassword}
                        type="submit" className="btn bg-green-500 hover:bg-green-600 hover:duration-300 px-4 text-lg">Send</button>
                </form>
            </div>
        </section>
    </>
}
