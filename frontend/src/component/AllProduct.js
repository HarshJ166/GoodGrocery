import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardFeature from "./CardFeature";
import FilterProduct from "./FilterProduct";
import DefaultImage from "../assest/default.jpg";

const AllProduct = ({ heading }) => {
  const productData = useSelector((state) => state.product.productList);
  const categoryList = [...new Set(productData.map((el) => el.category))];

  // Filter state
  const [filterBy, setFilterBy] = useState(""); // Currently selected category
  const [filteredData, setFilteredData] = useState([]); // Filtered product data

  useEffect(() => {
    // Initially set filtered data to all products
    setFilteredData(productData);
  }, [productData]);

  // Function to handle category filtering
  const handleFilterProduct = (category) => {
    // Set the currently selected category
    setFilterBy(category);
    // Filter products based on the selected category
    const filteredProducts = productData.filter(
      (el) => el.category.toLowerCase() === category.toLowerCase()
    );
    // Update the filtered data state
    setFilteredData(filteredProducts);
  };

  const loadingArrayFeature = new Array(15).fill(null);

  return (
    <div className="my-5">
      <h2 className="font-bold text-center text-slate-10000 text-2xl mb-5">
        {heading}
      </h2>

      {/* <div className="flex gap-4 justify-center overflow-scroll scrollbar-none">
        {categoryList[0] ? (
          categoryList.map((el) => {
            console.log(el);
            return (
              <FilterProduct
                category={el}
                key={el}
                isActive={el.toLowerCase() === filterBy.toLowerCase()}
                onClick={() => handleFilterProduct(el)}
              />
            );
          })
        ) : (
          <div className="min-h-[150px] flex justify-center items-center">
            <p>Loading...</p>
          </div>
        )}
      </div> */}

      <div className="flex flex-wrap justify-center gap-4 my-4">
        {filteredData.length > 0 // Check if there are products to display
          ? filteredData.map((el) => {
              return (
                <CardFeature
                  key={el._id}
                  id={el._id}
                  image={DefaultImage}
                  name={el.product_name}
                  category={el.category}
                  price={parseInt(el.price)}
                  description={el.description}
                  aisle_id={el.aisle_id}
                  department_id={el.department_id}
                  product_id={el.product_id}
                />
              );
            })
          : loadingArrayFeature.map((_, index) => (
              <CardFeature loading="Loading..." key={index + "allProduct"} />
            ))}
      </div>
    </div>
  );
};

export default AllProduct;
