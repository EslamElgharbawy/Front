import axios from "axios"
import { useState } from "react";
import { useEffect } from "react";
import Loading from "../../components/Loading/Loading";
import { Helmet } from "react-helmet";

export default function Categories() {
    const [allGategories, setallGategories] = useState(null)
    const [SubCategories, setSubCategories] = useState(null)

    async function getAllGategories() {
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/categories",
                method: "GET"
            }
            let { data } = await axios.request(options)
            setallGategories(data.data)

        } catch (error) {
            console.log(error);

        }
    }

    async function getSubCategories(categoryId) {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`,
                method: "GET"
            }
            let { data } = await axios.request(options)
            console.log("ssss", data);
            setSubCategories(data.data)
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getAllGategories()
    }, [])
    return <>
        <Helmet><title>Categories</title></Helmet>
        <section className="mb-10">
            {allGategories ?
                <div className="grid grid-cols-3 text-center gap-5 ">
                    {allGategories.map((category) =>

                        <div onClick={() => {
                            getSubCategories(category._id)
                        }}
                            key={category._id} className="group/category border-2 rounded-lg col-span-1 ">
                            <div className="category_item group-hover/category:shadow-xl group-hover/category:shadow-green-700 transition-all duration-300">
                                <div>
                                    <img src={category.image} alt="" className="w-full h-96 img-fluid ratio-4x3" />
                                </div>
                                <div className="p-8 text-4xl font-semibold text-green-600 border-2">
                                    {category.name}
                                </div>
                            </div>

                        </div>

                    )}
                </div>

                : <Loading />}

        </section>

        <section>
            <h2 className="text-4xl text-green-600 font-semibold text-center">Electronics subcategories</h2>
            {SubCategories ? <div className="grid grid-cols-3">
                {SubCategories.map((category) =>
                    <div key={category._id} className="group/subgategory p-3">
                        <h2 className=" group-hover/subgategory:shadow-xl  group-hover/subgategory:shadow-green-700 transition-all duration-300 text-3xl font-semibold border-2 p-6 text-center rounded-lg">{category.name}</h2>
                    </div>
                )}



            </div>
                : null}

        </section>

    </>
}
