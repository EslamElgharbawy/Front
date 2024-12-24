import img1 from "../../assets/images/amazon-pay.png"
import img2 from "../../assets/images/American-Express-Color.png"
import img3 from "../../assets/images/mastercard.webp"
import img4 from "../../assets/images/paypal.png"
import img5 from '../../assets/images/get-apple-store.png'
import img6 from '../../assets/images/get-google-play.png'


export default function Footer() {
  return <>
    <footer className="bg-gray-100 py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <header className="sm:max-xl:text-center">
          <h2 className="sm:text-2xl font-semibold mb-2">
            Get the FreshCart app
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            We will send you a link, open it on your phone to download the app.
          </p>
        </header>

        <div className="flex sm:flex-row items-center gap-4">
          <input
            className="form-control w-full sm:w-auto flex-grow rounded-md border border-gray-300 focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
            type="email"
            placeholder="Email.."
          />
          <button className="btn bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition w-full sm:w-auto">
            Share App Link
          </button>
        </div>

        <div className="sm:max-xl:space-y-4 xl:flex xl:justify-between xl:items-center py-8 border-y-2">
          <div className="sm:max-xl:text-center xl:flex xl:items-center xl:gap-5 sm:max-xl:space-y-2">
            <h2 className="text-lg ">Payment Partners</h2>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <img src={img1} className="w-16 sm:max-xl:w-12" alt="Amazon Pay" />
              <img src={img2} className="w-16 sm:max-xl:w-12" alt="American Express" />
              <img src={img3} className="w-16 sm:max-xl:w-12" alt="Mastercard" />
              <img src={img4} className="w-16 sm:max-xl:w-12" alt="PayPal" />
            </div>
          </div>

          <div className=" sm:max-xl:text-center xl:flex xl:justify-end xl:items-center xl:gap-5 sm:max-xl:space-y-2">
            <h2 className="text-lg ">
              Get deliveries with FreshCart
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <img src={img5} className="w-24 sm:max-xl:w-24" alt="Apple Store" />
              <img src={img6} className="w-24 sm:max-xl:w-24" alt="Google Play" />
            </div>
          </div>
        </div>
      </div>
    </footer>

  </>
}
