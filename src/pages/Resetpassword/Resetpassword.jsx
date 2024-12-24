import axios from "axios"
import { useFormik } from "formik"
export default function Resetpassword() {

    async function Verify(resetCode) {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
                method: "POST",
                data: resetCode

            }
            let { data } = await axios.request(options)
            console.log("ffff", data);
        } catch (error) {
            console.log(error);
        }
    }
    const formik = useFormik({
        initialValues: {
            resetCode: "",
        },
        onSubmit: Verify,
    })

    return <>
        <section className="py-10">
            <div className="container">
                <h1 className="text-3xl mb-5">
                    Reset Your Password :
                </h1>
                <form className="space-y-5" onSubmit={formik.handleSubmit}>
                    <div>
                        <input
                            className="form-control w-full"
                            type="number"
                            placeholder="Code"
                            value={formik.values.resetCode}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name="resetCode"
                        />
                    </div>
                    <button
                        onClick={Verify}
                        type="submit" className="btn bg-green-500 hover:bg-green-600 hover:duration-300 px-4 text-lg">Verify</button>
                </form>
            </div>
        </section>
    </>
}


