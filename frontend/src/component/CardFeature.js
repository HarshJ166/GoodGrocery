import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addCartItem } from "../redux/productSlide";
import PropTypes from "prop-types";

const CardFeature = ({
  image,
  name,
  price,
  category,
  loading,
  id,
  description,
}) => {
  const dispatch = useDispatch();

  const handleAddCartProduct = () => {
    dispatch(
      addCartItem({
        _id: id,
        name: name,
        price: price,
        category: category,
        image: image,
        description: description,
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
              <img src={image} alt={name} className="h-full" />{" "}
              {/* Add alt text for accessibility */}
            </div>
            <h3 className="font-bold text-slate-600 capitalize text-lg mt-6 whitespace-nowrap overflow-hidden">
              {name}
            </h3>
            <p className="text-slate-500 font-medium">{category}</p>
            <p className="font-bold">
              <span className="text-red-500">₹</span>
              <span>{price}</span>
            </p>
            <h3 className="font-medium text-slate-1000 capitalize text-0.5g">
              {description}
            </h3>
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
  description: PropTypes.string,
};

export default CardFeature;
