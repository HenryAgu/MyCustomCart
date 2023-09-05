import {useState} from "react";
import { useDispatch, useSelector } from "react-redux";

// React icons
import { FcExpand } from "react-icons/fc";
import { GrFormEdit } from "react-icons/gr";
import { FaNairaSign } from "react-icons/fa6";
import { GrClose } from "react-icons/gr";

// Reducer actions
import { deleteItem, updateItem, updatePrice } from "../features/Items";

const SingleComponent = ({ name, price, id,image }) => {
  const [nameVisibility, setNameVisibility] = useState(false);
  const [priceVisibility, setPriceVisibility] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const dispatch = useDispatch();
  
  return(
    <div className="shadow-lg rounded-xl p-5" key={id}>
    <GrClose
      className="mb-5 font-black cursor-pointer text-red-950"
      onClick={() => {
        dispatch(deleteItem({ id: id }));
      }}
    />
    <img
      src={image}
      alt="item-image"
      className="rounded-xl w-full h-50"
    />
    <div className="flex flex-col gap-y-2.5 mt-5">
      <div className="flex items-center gap-x-1">
        <p className="font-medium text-xl">Item: {name}</p>
        <span>
          <GrFormEdit
            className="font-medium text-2xl cursor-pointer"
            onClick={() =>
              setNameVisibility(!nameVisibility)
            }
          />
        </span>
      </div>
      {nameVisibility && (
        <div className="flex flex-col gap-y-2.5">
          <input
            type="text"
            className="p-2 border-solid border-2  border-gray-400 rounded-xl"
            placeholder="Update Name Of Item"
            onChange={(e) => {
              setNewItem(e.target.value);
            }}
            required
          />
          <button
            className="bg-slate-800 p-2 rounded-xl text-slate-100"
            onClick={() => {
              dispatch(updateItem({ id: id, item: newItem }));
              setNameVisibility(false);
            }}
          >
            Update Item Name
          </button>
        </div>
      )}
      <div className="flex items-center gap-x-1">
        <p className="font-medium text-xl">Price:</p>
        <div className="flex items-center">
          <FaNairaSign className="text-green-400" />
          <p className="font-medium text-xl text-green-400">
            {price}
          </p>
        </div>
        <span>
          <GrFormEdit
            className="font-medium text-2xl cursor-pointer"
            onClick={() =>
              setPriceVisibility(!priceVisibility)
            }
          />
        </span>
      </div>
      {priceVisibility && (
        <div className="flex flex-col gap-y-2.5">
          <input
            type="number"
            className="p-2 border-solid border-2  border-gray-400 rounded-xl"
            placeholder="Update Price of Item"
            onChange={(e) => {
              setNewPrice(e.target.value);
            }}
            step="0.01"
            min="0"
            required
          />
          <button
            className="bg-slate-800 p-2 rounded-xl text-slate-100"
            onClick={() => {
              dispatch(updatePrice({ id: id, price: newPrice }));
              setPriceVisibility(false);
            }}
          >
            Update Price
          </button>
        </div>
      )}
    </div>
  </div>
  )
}

const ItemDisplay = () => {
  const [hideAccordion, setHideAccordion] = useState(true);

  const itemList = useSelector((state) => state.items.value);
  
  const data = useSelector((state)=> state.items.value)

  // Handle Accordion
  const handleAccordion = () => {
    setHideAccordion(!hideAccordion);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <span className="text-xl font-medium">View Cart Items</span>
        <FcExpand
          className="font-medium cursor-pointer"
          onClick={handleAccordion}
        />
      </div>
      {hideAccordion ? (
        <div className="grid gap-y-10 grid-cols-1 md:grid-cols-2 md:gap-x-10 xl:grid-cols-3 xl:gap-x-10">
          {itemList.map((item) => {
            return(
              <div key={item.id}>
              <SingleComponent 
              id={item.id}
              name={item.name}
              image={item.image}
              price={item.price}
              />
              </div>
            )
            })}
        </div>
      ) : null}
    </div>
  );
};

export default ItemDisplay;
