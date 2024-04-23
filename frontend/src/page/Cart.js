import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartProduct from "../component/cartProduct";
import emptyCartImage from "../assest/empty.gif";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Correct Axios import
import CardFeature from "../component/CardFeature";

const Cart = () => {
  const productCartItem = useSelector((state) => state.product.cartItem);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [xresponse, setXResponse] = useState([]);
  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  const handleClick = async (totalPrice) => {
    try {
      const responseCheckout = await axios.post(
        "http://localhost:4000/checkout",
        {
          totalPrice,
        }
      );
      const data = responseCheckout.data;

      const options = {
        key: "rzp_test_opGcWDIchDi3sI",
        amount: data.order.amount,
        currency: "INR",
        name: "Good Grocery",
        description: "Test Transaction",
        order_id: data.order.id,
        callback_url: `http://localhost:4000/payment-verification`,
        prefill: {
          name: "Harsh",
          email: "harshjajal786@gmail.com",
          contact: "9892152003",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#ff7e01",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/contentBasedFiltering",
          { button: productCartItem[0].product_id }
        );
        setXResponse(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (productCartItem.length > 0) {
      fetchData();
    }
  }, [productCartItem]); // Added dependency array
  console.log(xresponse);
  return (
    <>
      <div className="p-2 md:p-4">
        {productCartItem.length > 0 ? (
          <div className="my-4 flex gap-3">
            <div className="w-full max-w-3xl ">
              {productCartItem.map((el) => (
                <CartProduct key={el._id} {...el} price={Number(el.price)} />
              ))}
            </div>

            <div className="w-full max-w-md  ml-auto">
              <h2 className="bg-blue-500 text-white p-2 text-lg">Summary</h2>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Total Qty :</p>
                <p className="ml-auto w-32 font-bold">{totalQty}</p>
              </div>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Total Price</p>
                <p className="ml-auto w-32 font-bold">
                  <span className="text-red-500">₹</span> {totalPrice}
                </p>
              </div>
              <button
                onClick={() => handleClick(totalPrice)}
                className="bg-red-500 w-full text-lg font-bold py-2 text-white"
              >
                Payment
              </button>
            </div>
          </div>
        ) : (
          <div className="flex w-full justify-center items-center flex-col">
            <img
              src={emptyCartImage}
              className="w-full max-w-sm"
              alt="Empty Cart"
            />
            <p className="text-slate-500 text-3xl font-bold">Empty Cart</p>
          </div>
        )}
      </div>

      {xresponse.length > 0 && (
        <div className="flex flex-wrap justify-center gap-4 my-4">
          <CardFeature
            key={xresponse[0].product_id}
            id={xresponse[0].product_id}
            image={xresponse[0].image}
            name={xresponse[0].product_name_x}
            category={xresponse[0].category}
            price={xresponse[0].price}
            description={xresponse[0].description}
            aisle_id={xresponse[0].aisle_id}
            department_id={xresponse[0].department_id}
            product_id={xresponse[0].product_id} // Example price
          />
          <CardFeature
            key={xresponse[1].product_id}
            id={xresponse[1].product_id}
            image={xresponse[1].image}
            name={xresponse[1].product_name_x}
            category={xresponse[1].category}
            price={xresponse[1].price}
            description={xresponse[1].description}
            aisle_id={xresponse[1].aisle_id}
            department_id={xresponse[1].department_id}
            product_id={xresponse[1].product_id} // Example price
          />
          <CardFeature
            key={xresponse[2].product_id}
            id={xresponse[2].product_id}
            image={xresponse[2].image}
            name={xresponse[2].product_name_x}
            category={xresponse[2].category}
            price={xresponse[2].price}
            description={xresponse[2].description}
            aisle_id={xresponse[2].aisle_id}
            department_id={xresponse[2].department_id}
            product_id={xresponse[2].product_id} // Example price
          />
          <CardFeature
            key={xresponse[3].product_id}
            id={xresponse[3].product_id}
            image={xresponse[3].image}
            name={xresponse[3].product_name_x}
            category={xresponse[3].category}
            price={xresponse[3].price}
            description={xresponse[3].description}
            aisle_id={xresponse[3].aisle_id}
            department_id={xresponse[3].department_id}
            product_id={xresponse[3].product_id} // Example price
          />
        </div>
      )}
    </>
  );
};

export default Cart;
