import axios from "axios";
import Card from "../../components/Card/Card";
import Loading from "../../components/Loading/Loading";
import HomeSlider from "../../components/HomeSlider/HomeSlider";
import CategorySlider from "../../components/CategorySlider/CategorySlider";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";

export default function Home() {

  async function getAllProducts() {
    const optins = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    }
    return axios.request(optins)
  }

  let { data, isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: getAllProducts,
    staleTime: 6 * 60 * 60 * 1000,
    refetchOnMount: false,
  })


  if (isLoading) return <Loading />

  return <>
    <Helmet>
      <title>Home</title>
      <meta name="description" content="FreshCart| Home Page,........."></meta>
      <meta charSet="utf-8" />
      <meta name="keywords" content="E-commerce| FreshCart,...."></meta>
    </Helmet>
    <HomeSlider />
    <CategorySlider />
    <div className="grid grid-cols-12 gap-4 sm:max-md:space-y-10 lg:max-xl:gap-2  lg:max-xl:space-y-10 ">
      {data.data.data.map((product) => <Card productInfo={product} key={product.id} />)}
    </div>



  </>
}
