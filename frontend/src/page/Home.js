import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import CardFeature from "../component/CardFeature";
import HomeCard from "../component/HomeCard";
import AllProduct from "../component/AllProduct";
import { Link } from "react-router-dom";

const Home = () => {
  const productData = useSelector((state) => state.product.productList);
  const homeProductCartList = productData.slice(1, 7);
  const homeProductCartListVegetables = productData.filter(
    (el) => el.category === "vegetable"
  );

  const slideProductRef = useRef();

  useEffect(() => {
    const timer = setInterval(() => {
      slideProductRef.current.scrollLeft += 2; // Smooth scroll
      if (
        slideProductRef.current.scrollLeft >=
        slideProductRef.current.scrollWidth -
          slideProductRef.current.clientWidth
      ) {
        slideProductRef.current.scrollLeft = 0; // Jump back to the beginning
      }
    }, 30); // Adjust the interval time as needed

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-5 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 text-gray-800 overflow-hidden m-0">
      <div className="md:flex gap-3 py-2">
        <div className="md:w-1/4">
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

        <div className="md:w-1/2 grid grid-cols-2 md:grid-cols-10 lg:grid-cols-3 gap-10">
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
        <h2 className="text-2xl font-bold pt-7 text-center">
          Fresh Vegetables
        </h2>
        <div className="flex gap-4 p-6 overflow-x-hidden" ref={slideProductRef}>
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
          {/* Duplicate the cards to create the circular effect */}
          {homeProductCartListVegetables.map((el) => (
            <CardFeature
              key={el._id + "-copy"}
              id={el._id + "-copy"}
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
