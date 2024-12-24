import axios from "axios"
import { Formik, useFormik } from "formik"
import { useState } from "react"
import toast from "react-hot-toast"
import { Navigate, useNavigate } from "react-router-dom"
import { object, ref, string } from "yup"

const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
const phoneRegex = /^(02)?01[125][0-9]{8}$/

export default function SignUp() {
  const [accountExist, setaccountExist] = useState(null)
  const navigate = useNavigate()
  const validationSchema = object({
    name: string().required("Name is required").min(3, "Name must be at least 3 characters").max(20, "Name can not be more than 20 characters"),
    email: string().required("Email is required").email("Email is invalid"),
    password: string().required("Password is required").matches(passwordRegex, "Password Should be Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"),
    rePassword: string().required("Confirm password is required").oneOf([ref("password")], "Password and Confirm password should be the same"),
    phone: string().required("Phone number is required").matches(phoneRegex, "Sorry,we accept egyption phone numbers only"),

  })

  async function sendData(values) {
    const loadingtoast = toast.loading("Waiting...")
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "POST",
        data: values,
      }
      let { data } = await axios.request(options)
      if (data.message == "success") {
        toast.success("User Created Successfully");
        setTimeout(() => {
          navigate("/login")
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.message)
      setaccountExist(error.response.data.message)
    } finally {
      toast.dismiss(loadingtoast)
    }

  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    validationSchema,
    onSubmit: sendData,
  })


  return <>
    <section className="py-10">
      <div className="container">
        <h1 className="text-3xl mb-5">
          Register Now :
        </h1>

        <form className="space-y-5" onSubmit={formik.handleSubmit}>
          <div>
            <input
              className="form-control w-full"
              type="text"
              placeholder="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="name"
            />
            {formik.errors.name && formik.touched.name && <p className="text-red-600 mt-1">* {formik.errors.name}</p>}
          </div>

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
            {formik.errors.email && formik.touched.email && <p className="text-red-600 mt-1">* {formik.errors.email}</p>}
            {accountExist && <p className="text-red-600 mt-1">* {accountExist}</p>}
          </div>

          <div>
            <input
              className="form-control w-full"
              type="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="password"
            />
            {formik.errors.password && formik.touched.password && <p className="text-red-600 mt-1">* {formik.errors.password}</p>}
          </div>

          <div>
            <input
              className="form-control w-full"
              type="password"
              placeholder="confirm password"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="rePassword"
            />
            {formik.errors.rePassword && formik.touched.rePassword && <p className="text-red-600 mt-1">* {formik.errors.rePassword}</p>}
          </div>

          <div>
            <input
              className="form-control w-full"
              type="tel"
              placeholder="Phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="phone"
            />
            {formik.errors.phone && formik.touched.phone && <p className="text-red-600 mt-1">* {formik.errors.phone}</p>}
          </div>
          <button type="submit" className="btn bg-green-500 hover:bg-green-600 hover:duration-300 text-lg">Register</button>
        </form>
      </div>
    </section>





  </>
}
