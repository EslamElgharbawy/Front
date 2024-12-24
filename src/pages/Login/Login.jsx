
import axios from "axios"
import { Formik, useFormik } from "formik"
import { useContext, useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import { object, string } from "yup"
import { Usercontext } from "../../components/Context/User.context"

const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/

export default function Login() {
  const navigate = useNavigate()
  const [invalidEmailorPasswordErro, setinvalidEmailorPasswordErrorr] = useState(null)
  let { setToken } = useContext(Usercontext)



  const validationSchema = object({
    email: string().required("Email is required").email("Email is invalid"),
    password: string().required("Password is required").matches(passwordRegex, "Password Should be Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"),

  })

  async function sendData(values) {
    let loadingtoast = toast.loading("Waiting...")
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "POST",
        data: values,
      }
      let { data } = await axios.request(options)
      if (data.message == "success") {
        localStorage.setItem("token", data.token)
        setToken(data.token)
        toast.success("User Logged in Successfully")
        setTimeout(() => {
          navigate("/")
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.message)
      setinvalidEmailorPasswordErrorr(error.response.data.message)
    } finally {
      toast.dismiss(loadingtoast)
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: sendData,
  })


  return <>
    <section className="py-10">
      <div className="container">
        <h1 className="text-3xl mb-5">
          Login Now :
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
            {formik.errors.email && formik.touched.email && <p className="text-red-600 mt-1">* {formik.errors.email}</p>}
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
          {invalidEmailorPasswordErro && <p className="text-red-600 mt-1">* {invalidEmailorPasswordErro}</p>}

          <div className="flex justify-between">
            <button type="submit" className="btn bg-green-500 hover:bg-green-600 hover:duration-300 px-4 text-lg">Login</button>
            <Link to={'/forgetpassword'}
            className="font-semibold text-xl hover:text-green-600 transition-all duration-300 ">forget your password ?</Link>
          </div>
        </form>
      </div>
    </section>





  </>
}
