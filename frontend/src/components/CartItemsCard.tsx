import { AiFillDelete } from 'react-icons/ai'
import { CartItem } from '../types/types';
import { server } from '../redux/store';

type CartItemProps = {
  cartItem: CartItem;
  incrementHandler: (cartItem: CartItem) => void;
  decrementHandler: (cartItem: CartItem) => void;
  removeHandler: (id: string) => void;
};
const CartItemsCard = ({cartItem,
  incrementHandler,
  decrementHandler,
  removeHandler}:CartItemProps) => {
    const { photo, productId, name, price, quantity } = cartItem;
  return (
    <>
     <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
            <img
              src={`${server}/${photo}`}
              alt={name}
              className="w-full rounded-lg sm:w-40"
            />
            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
              <div className="mt-5 sm:mt-0">
                <h2 className="text-lg font-bold text-gray-900 ">{name}</h2>
                <p className="mt-1 text-2xl text-gray-700">${price}</p>
              </div>
              <div className="mt-4 flex flex-col items-center sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                <div className="flex items-center border-gray-100">
                  <span onClick={() => decrementHandler(cartItem)} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                
                  <p>{quantity}</p>
                  <span onClick={() => incrementHandler(cartItem)} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
                 
                </div>
                <button onClick={() => removeHandler(productId)} className="mt-2 text-red-500 hover:text-red-700 text-2xl"><AiFillDelete /></button>
              </div>
            </div>
          </div>
          
    </>
  )
}

export default CartItemsCard