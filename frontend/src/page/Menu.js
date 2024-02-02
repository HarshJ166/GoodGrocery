import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AllProduct from "../component/AllProduct.js";
import { addCartItem } from "../redux/productSlide";

const Menu = () => {
  const { filterby } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product.productList);

  const productDisplay = productData.find((el) => el._id === filterby);

  // if (!productDisplay) {
  //   // Handle the case where the product with the given ID is not found.
  //   navigate("/not-found"); // Redirect to a not-found page or handle it differently.
  //   return null; // Return null to prevent rendering the rest of the component.
  // }

  const handleAddCartProduct = () => {
    dispatch(addCartItem(productDisplay));
  };

  const handleBuy = () => {
    dispatch(addCartItem(productDisplay));
    navigate("/cart");
  };

  return (
    <div className="p-2 md:p-4">
      <AllProduct heading={"Our menu"} />
    </div>
  );
};

export default Menu;
