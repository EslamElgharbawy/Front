import axios from "axios"
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { CartContext } from "../../components/Context/Cart.context";
import ReactImageGallery from "react-image-gallery";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Card from "../../components/Card/Card";
import useOnline from "../../Hooks/useOnline";
import { Helmet } from "react-helmet";
import { WishlistContext } from "../../components/Context/Wishlist.context";

export default function ProductDetails() {
    let { id } = useParams()
    const [detailsproduct, setdetailsproduct] = useState(null)
    const [relatedproducts, setrelatedproducts] = useState(null)
    let { AddProductToCart } = useContext(CartContext)
    let { AddProductToWishlist } = useContext(WishlistContext)


    async function getproductsdetails() {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
                method: "GET",
            };
            console.log("Requesting URL:", options.url); // Debugging the URL
            let { data } = await axios.request(options)
            setdetailsproduct(data.data)
        } catch (error) {
            console.log(error);

        }
    }

    async function getrelatedproducts() {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${detailsproduct.category._id}`,
                method: "GET"
            }
            let { data } = await axios.request(options)
            setrelatedproducts(data.data)

        } catch (error) {
            console.log(error);
        }
    }
    const [isWishlisted, setIsWishlisted] = useState(false);

    const toggleWishlist = () => {
        AddProductToWishlist({ productId: id });
        setIsWishlisted(!isWishlisted);
    };

    useEffect(() => {
        getproductsdetails()
    }, [id])

    useEffect(() => {
        if (detailsproduct == null) return;
        getrelatedproducts()
    }, [detailsproduct])

    let isOnline = useOnline()
    return <>
        <Helmet>
            <meta name="description" content="Cart| Home Page,........."></meta>
            <title>Product Details</title>
            <meta charSet="utf-8" />
        </Helmet>
        {detailsproduct ?
            <>
                <Helmet><title>{detailsproduct.title}</title></Helmet>
                <section>
                    <div className="grid gap-5  grid-cols-12">
                        <div className="col-span-3">
                            <ReactImageGallery
                                showFullscreenButton={false}
                                showPlayButton={false}
                                showNav={false}
                                items={detailsproduct.images.map((image) => {
                                    return {
                                        original: image,
                                        thumbnail: image
                                    }
                                })}>

                            </ReactImageGallery>

                        </div>
                        <div className="col-span-9 space-y-3">
                            <h2 className="text-3xl">{detailsproduct.title}</h2>
                            <h3 className="font-semibold text-green-500">{detailsproduct.category.name} </h3>
                            <p className="text-gray-400">{detailsproduct.description}</p>
                            <div className="flex justify-between items-center ">
                                <span>{detailsproduct.price} L.E</span>
                                <span><i className="fa-solid fa-star" style={{ color: "#ffc800" }}></i>{detailsproduct.ratingsAverage}</span>
                            </div>
                            {isOnline ? <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        AddProductToCart({ productId: id })
                                    }}
                                    className="btn bg-green-500 w-full hover:bg-green-600 transition-all duration-200">Add To Cart</button>
                                <div onClick={toggleWishlist} className="text-2xl cursor-pointer">
                                    <i
                                        className={`fa-solid fa-heart ${isWishlisted ? "text-black" : "text-green-500"
                                            }`}
                                    ></i>
                                </div>
                            </div> : ""}
                        </div>
                    </div>
                </section>

                <section>
                    <h2>Related Products</h2>
                    {relatedproducts ?
                        <Swiper slidesPerView={5} spaceBetween={15} loop={true} >
                            {relatedproducts.map((product) =>
                                <SwiperSlide key={product.id}>
                                    <Card productInfo={product} />
                                </SwiperSlide>)}
                        </Swiper>
                        : <Loading />}


                </section>

            </>
            : <Loading />}

    </>
}
