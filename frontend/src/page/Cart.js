import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../component/cartProduct";
import emptyCartImage from "../assest/empty.gif";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const productCartItem = useSelector((state) => state.product.cartItem);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  const handleClick = async (totalPrice) => {
    console.log(window);
    try {
      console.log(typeof totalPrice);

      const responseCheckout = await fetch(`http://localhost:4000/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ totalPrice }),
      });
      const data = await responseCheckout.json();

      console.log(data.order.amount);

      const options = {
        key: "rzp_test_opGcWDIchDi3sI",
        amount: data.order.amount,
        currency: "INR",
        name: "Good Grocery",
        description: "Test Transaction",
        // image: smallLogo,
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
      console.log(data.order.amount);
      const rzp1 = new window.Razorpay(options);

      rzp1.open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="p-2 md:p-4">
        {productCartItem[0] ? (
          <div className="my-4 flex gap-3">
            {/* display cart items  */}
            <div className="w-full max-w-3xl ">
              {productCartItem.map((el) => {
                return (
                  <CartProduct
                    key={el._id}
                    id={el._id}
                    name={el.name}
                    image={el.image}
                    category={el.category}
                    qty={el.qty}
                    total={el.total}
                    price={el.price}
                  />
                );
              })}
            </div>

            {/* total cart item  */}
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
          <>
            <div className="flex w-full justify-center items-center flex-col">
              <img
                src={emptyCartImage}
                className="w-full max-w-sm"
                alt="Empty Cart"
              />
              <p className="text-slate-500 text-3xl font-bold">Empty Cart</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

const Cancel = () => {
  return (
    <div className="bg-red-200 w-full max-w-md m-auto h-36 flex justify-center items-center font-semibold text-lg">
      <p>Payment is Cancel</p>
    </div>
  );
};

export default Cart;
