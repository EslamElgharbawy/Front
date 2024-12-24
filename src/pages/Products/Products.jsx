import { useEffect, useState } from "react"
import Loading from "../../components/Loading/Loading";
import Card from "../../components/Card/Card";
import axios from "axios";
import { Helmet } from "react-helmet";

export default function Products() {
    const [products, setproducts] = useState(null)
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState(null);


  
    async function getAllProducts() {
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/products",
                method: "GET",
            };

            let { data } = await axios.request(options);
            setproducts(data.data);
            setFilteredProducts(data.data);
        } catch (error) {
            console.log(error);
        }

    }

    function search(e) {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = products.filter((product) =>
            product.name && product.name.includes(query)
        );
        setFilteredProducts(filtered);
        console.log(setFilteredProducts(filtered));

    };

    useEffect(() => {
        getAllProducts()
    }, [])

    return <>
    <Helmet><title>Products</title></Helmet>
        <section>
            <div className="container m-auto">

                <div
                    onChange={search}
                    value={searchQuery}
                    className="w-3/4 mx-auto mt-10 mb-20">
                    <input type="text" placeholder="Search..." className="form-control w-full" />
                </div>

                <div>
                    {filteredProducts.length > 0 ? <div className="grid grid-cols-12 gap-4 sm:max-md:space-y-10 lg:max-xl:gap-2  lg:max-xl:space-y-10 ">
                        {filteredProducts.map((product) => <Card productInfo={product} key={product.id} />)}
                    </div> : <Loading />}
                </div>

            </div>
        </section>

    </>
}

