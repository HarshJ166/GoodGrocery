import React, { useRef } from "react";
import { useSelector } from "react-redux";
import CardFeature from "../component/CardFeature";
import HomeCard from "../component/HomeCard";
import { GrPrevious, GrNext } from "react-icons/gr";
// import FilterProduct from "../component/FilterProduct";
import AllProduct from "../component/AllProduct";
// import Cart from "./Cart";
import { Link } from "react-router-dom";

const Home = () => {
  const productData = useSelector((state) => state.product.productList);
  const homeProductCartList = productData.slice(1, 5);
  const homeProductCartListVegetables = productData.filter(
    (el) => el.category === "vegetable"
  );

  const slideProductRef = useRef();
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };
  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };

  return (
    <div className="p-4 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 text-gray-800">
      <div className="md:flex gap-4 py-4">
        <div className="md:w-1/2">
          {/* <div className=">
            <p className="text-sm font-semibold">Deliver the Good in Food</p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
              className="h-7 ml-2"
              al
          </div> */}
          <h2 className="text-4xl md:text-5xl font-bold py-4">
            Fresh Grocery Delivered Fast
          </h2>
          <p className="text-lg py-2">
            Our mission is to provide fresh, high-quality groceries to your
            doorstep. We deliver fast and ensure you have a satisfying shopping
            experience. Shop with us and taste the freshness!
          </p>
          <button className="bg-red-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-600">
            <Link to="/menu">ORDER NOW</Link>
          </button>
        </div>

        <div className="md:w-1/2 grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 p-2">
          {homeProductCartList.map((el) => (
            <HomeCard
              key={el._id}
              id={el._id}
              image={el.image}
              name={el.name}
              price={el.price}
              category={el.category}
            />
          ))}
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Fresh Vegetables</h2>
          <div className="flex gap-4">
            <button
              onClick={preveProduct}
              className="bg-gray-200 hover:bg-gray-300 text-lg p-2 rounded-full"
            >
              <GrPrevious />
            </button>
            <button
              onClick={nextProduct}
              className="bg-gray-200 hover:bg-gray-300 text-lg p-2 rounded-full"
            >
              <GrNext />
            </button>
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto p-4" ref={slideProductRef}>
          {homeProductCartListVegetables.map((el) => (
            <CardFeature
              key={el._id}
              id={el._id}
              name={el.name}
              category={el.category}
              price={el.price}
              image={el.image}
            />
          ))}
        </div>
      </div>

      <AllProduct heading={"Browse Our Products"} />
    </div>
  );
};

export default Home;
