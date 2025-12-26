import React from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import { assets } from "../../assets/assets";
import texts from "../../languages/en.json";

const ProductIndex = () => {
  const { id } = useParams();
  const { products, currency } = React.useContext(ShopContext);
  const [productData, setProductData] = React.useState([]);
  const [image, setImage] = React.useState("");
  const [size, setSize] = React.useState("");
  const rating = 3;
  const starIcons = Array.from({ length: 5 }, (_, index) =>
    index < rating ? assets.star_icon : assets.star_dull_icon
  );

  const fetchProductData = async () => {
    if (!products?.length) return;

    const foundProduct = products.find((item) => item._id === id);

    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct?.image?.[0]);
    } else {
      setProductData(null);
    }
  };

  React.useEffect(() => {
    fetchProductData();
  }, [id, products]);

  //fucntion to handle image click
  const handleImageClick = (clickedImage) => {
    setImage(clickedImage);
  };

  //funtion to handle size clicks
  const handleSizeClick = (productSize) => {
    setSize((prev) => (prev === productSize ? "" : productSize));
  };

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/*-------------------------------- 
      *             Product Data 
      -----------------------------------*/}
      <div className="flex gap-12 flex-col sm:flex-row">
        {/*---------------------------------------
        *           Product Images 
        -----------------------------------------*/}

        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-between sm:justify-normal w-full sm:w-[18.7%]">
            {productData?.image?.map((imageItem, idx) => (
              <img
                onClick={() => handleImageClick(imageItem)}
                src={imageItem}
                key={idx}
                alt={`image-${idx}`}
                className="w-[24%] sm:w-full sm:mb-3 shrink-0 cursor-pointer"
              />
            ))}
          </div>
          {image && (
            <img src={image} alt="main-img" className="w-full h-auto" />
          )}
        </div>

        {/*---------------------- 
        * Product Information 
        -------------------------*/}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">
            {productData?.name || texts.product.nameNA}
          </h1>
          <div className="flex items-center gap-1 mt-2">
            {starIcons.map((icon, idx) => (
              <img key={idx} src={icon} alt={`star-${idx}`} className="w-3.5" />
            ))}
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {productData?.price && currency}{" "}
            {productData?.price || texts.notAvailable}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData?.description ||
              `${texts.product.desc} ${texts.notAvailable}`}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>{texts.product.selectSize}</p>
            <div className="flex gap-2 flex-wrap">
              {productData?.sizes?.map((productSize) => (
                <button
                  key={productSize} // ✅ better key than index
                  className={`border border-gray-300 px-4 py-2 rounded-md ${
                    size === productSize
                      ? "border-black bg-black text-white"
                      : ""
                  } hover:border-black hover:bg-black hover:text-white
                  transition-all duration-200 cursor-pointer`}
                  onClick={() => handleSizeClick(productSize)}
                >
                  {productSize}
                </button>
              ))}
            </div>
          </div>
          <button className="bg-black text-white px-8 py-3 text-sm hover:bg-gray-800 active:bg-gray-700 cursor-pointer">
            {texts.product.addCart.toUpperCase()}
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-600 mt-5 flex flex-col gap-2 animate-fade-in">
            {[
              {
                text: texts.product.originalText,
                highlight: "100%",
              },
              {
                text: texts.product.cod,
                highlight: "Cash On Delivery",
              },
              {
                text: texts.product.easyReturn,
                highlight: "Easy Return",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 opacity-0 animate-slide-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <svg
                  className="w-4 h-4 text-black mt-0.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>

                {/* ✅ Highlighted Text */}
                <p>
                  {item.highlight && item.text.includes(item.highlight)
                    ? item.text.split(item.highlight).map((part, i, arr) => (
                        <span key={i}>
                          {part}
                          {i < arr.length - 1 && (
                            <span className="font-semibold text-black">
                              {item.highlight}
                            </span>
                          )}
                        </span>
                      ))
                    : item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/*--------------------------------
            Description & Review Section 
        ---------------------------------*/}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">{texts.product.desc}</b>
          <p className="border px-5 py-3 text-sm">
            {texts.product.reviews} (122)
          </p>
        </div>
        <div className="flex flex-col gap-4 border p-6 text-sm text-gray-500">
          <p>{texts.product.descSectionOne}</p>
          <p>{texts.product.descSectionTwo}</p>
        </div>
      </div>
      {/* --------------------------------
            DISPLAY RELATED PRODUCTS
      ------------------------------------*/}

        

    </div>

  ) : (
    <div className="opacity-0"></div>
  );
};

export default ProductIndex;
