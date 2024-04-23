import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// import AllProduct from "../component/AllProduct.js";
import { addCartItem } from "../redux/productSlide";

const ProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product.productList);

  const productDisplay = productData.find((el) => el._id === productId);

  if (!productDisplay) {
    // Handle the case where the product with the given ID is not found.
    navigate("/not-found"); // Redirect to a not-found page or handle it differently.
    return null; // Return null to prevent rendering the rest of the component.
  }

  const handleAddCartProduct = () => {
    dispatch(addCartItem(productDisplay));
  };

  const handleBuy = () => {
    dispatch(addCartItem(productDisplay));
    navigate("/cart");
  };

  return (
    <div className="p-2 md:p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={productDisplay.image}
            alt={productDisplay.name}
            className="w-full h-64 object-cover object-center"
          />
          <div className="p-4">
            <h2 className="text-2xl font-semibold">{productDisplay.name}</h2>
            <p className="text-gray-600">{productDisplay.description}</p>
            <div className="flex justify-between items-center mt-4">
              <p className="text-gray-800 font-bold">${productDisplay.price}</p>
              <div>
                <button
                  onClick={handleAddCartProduct}
                  className="bg-yellow-500 text-black px-4 py-2 rounded-md mr-2"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuy}
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
