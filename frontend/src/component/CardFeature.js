import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addCartItem } from "../redux/productSlide";
import PropTypes from "prop-types";
// import Default from "../assest/DefaultImage.jpg";

const CardFeature = ({
  image,
  name,
  price,
  category,
  loading,
  id,
  aisle_id,
  product_id,
  department_id,
}) => {
  const dispatch = useDispatch();
  // const DefaultImage = Default;

  const handleAddCartProduct = () => {
    dispatch(
      addCartItem({
        _id: id,
        name: name,
        price: price,
        category: category,
        image: image,
        aisle_id: aisle_id,
        department_id: department_id,
        product_id: product_id,
      })
    );
  };

  return (
    <div className="w-full min-w-[350px] max-w-[400px] bg-white hover:shadow-lg drop-shadow-lg py-5 px-4 cursor-pointer flex flex-col ninja">
      {image ? (
        <>
          <Link
            to={`/menu/${id}`}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="h-28 flex flex-col justify-center items-center">
              <img src={image} alt={name} className="h-full" />
            </div>
            <h3 className="font-bold text-slate-600 capitalize text-lg mt-6 whitespace-nowrap overflow-hidden">
              {name}
            </h3>
            <p className="text-slate-500 font-medium">{category}</p>
            <p className="font-bold">
              <span className="text-red-500">₹</span>
              <span>{price}</span>
            </p>
          </Link>
          <button
            className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 w-full"
            onClick={handleAddCartProduct}
          >
            Add to Cart
          </button>
        </>
      ) : (
        <div className="min-h-[150px] flex justify-center items-center">
          <p>{loading}</p>
        </div>
      )}
    </div>
  );
};

CardFeature.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  category: PropTypes.string,
  loading: PropTypes.string,
  id: PropTypes.string,
};

export default CardFeature;
