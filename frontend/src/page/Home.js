import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import CardFeature from "../component/CardFeature";
import HomeCard from "../component/HomeCard";
import AllProduct from "../component/AllProduct";
import { Link } from "react-router-dom";
import DefaultImage from "../assest/default.jpg";

const Home = () => {
  const productData = useSelector((state) => state.product.productList);
  const homeProductCartList1 = productData.slice(1, 5);
  const homeProductCartList2 = productData.slice(6, 8);
  const homeProductCartList = [
    ...homeProductCartList1,
    ...homeProductCartList2,
  ];
  // const homeProductCartListVegetables = productData.filter(
  //   (el) => el.department_id === 3 || el.department_id === 2
  // );
  const homeProductCartListVegetables = productData.slice(1, 21);

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
    <div className="p-5 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 text-gray-800 overflow-hidden m-0 custom-font">
      <div className="md:flex gap-3 py-2">
        <div className="md:w-1/2 lg:w-1/3 xl:w-1/4">
          <h2 className="text-4xl md:text-5xl font-bold py-4">
            Fresh Grocery Delivered Fast
          </h2>
          <p className="text-lg py-2">
            Our mission is to provide fresh, high-quality groceries to your
            doorstep. We deliver fast and ensure you have a satisfying shopping
            experience. Shop with us and taste the freshness!
          </p>
          <Link to="/menu">
            <button className="bg-red-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-600">
              ORDER NOW
            </button>
          </Link>
        </div>

        <div className="md:w-1/2 lg:w-2/3 xl:w-3/4 flex flex-wrap gap-4">
          {homeProductCartList.map((el) => (
            <HomeCard
              key={el._id}
              id={el._id}
              image={el.image === "default.jpg" ? DefaultImage : el.image}
              name={el.product_name}
              category={el.category}
              price={parseInt(el.price)}
              description={el.description}
              aisle_id={el.aisle_id}
              department_id={el.department_id}
              product_id={el.product_id}
            />
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold pt-7 text-center">Featured Items</h2>
        <div className="flex gap-4 p-6 overflow-x-auto" ref={slideProductRef}>
          {homeProductCartListVegetables.map((el) => (
            <CardFeature
              key={el._id}
              id={el._id}
              image={el.image === "default.jpg" ? DefaultImage : el.image}
              name={el.product_name}
              category={el.category}
              price={parseInt(el.price)}
              description={el.description}
              aisle_id={el.aisle_id}
              department_id={el.department_id}
              product_id={el.product_id}
            />
          ))}
          {/* Duplicate the cards to create the circular effect */}
          {homeProductCartListVegetables.map((el) => (
            <CardFeature
              key={el._id}
              id={el._id}
              image={el.image === "default.jpg" ? DefaultImage : el.image}
              name={el.product_name}
              category={el.category}
              price={parseInt(el.price)}
              description={el.description}
              aisle_id={el.aisle_id}
              department_id={el.department_id}
              product_id={el.product_id}
            />
          ))}
        </div>
      </div>

      <AllProduct heading={"Browse Our Products"} />
    </div>
  );
};

export default Home;
