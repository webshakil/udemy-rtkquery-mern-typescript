import React from "react";
import Button from "../Shared/Button";
import {  CartItem, Product } from "../../../types/types";
import { server } from "../../../redux/store";
import { addToCart } from "../../../redux/reducer/cartReducer";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

interface ProductCardProps {
  data: Product[];
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const dispatch = useDispatch()
 const addToCartHandler = (cartItem:CartItem) => {
  
   if(cartItem.stock<1) return toast.error("Out of Stock")
    dispatch(addToCart(cartItem));
    toast.success("Added to Cart")
  };
  return (
    <div className="mb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 place-items-center">
        {/* card section */}
        {data.map((product) => (
          <div
            data-aos="fade-up"
            data-aos-delay="400"
            className="group flex flex-col"
            key={product._id}
          >
            <div className="relative mb-3">
              <img
                src={`${server}/${product.photo}`}
                alt="product"
                className="h-[180px] w-[260px] object-cover rounded-md"
              />
              {/* hover button */}
              <div className="hidden group-hover:flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-full w-full text-center group-hover:backdrop-blur-sm justify-center items-center duration-200 rounded-md">
                <Button
                  text={"Add to cart"}
                  bgColor={"bg-primary"}
                  textColor={"text-white"}
                  onClick={() =>
                    addToCartHandler({productId:product._id, price: product.price,name: product.name,photo:product.photo,stock:product.stock,quantity:1})
                  }
                />
              </div>
            </div>
            <div className="leading-7 flex justify-between">
              <div>
                <h2 className="font-semibold">{product.name}</h2>
                <h2 className="font-bold">${product.price}</h2>
              </div>
              <div>
                <h2 className="font-bold">Stock: {product.stock}</h2>
                <h2 className="font-bold">{product.category}</h2>
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
