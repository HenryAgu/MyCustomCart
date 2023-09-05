import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../features/Items";

const ItemInput = ({ id, itemList }) => {
  const initialItem = JSON.parse(localStorage.getItem("item") || "");
  const initialPrice = JSON.parse(localStorage.getItem("price") || "");
  const initialImage = JSON.parse(localStorage.getItem("image") || "");

  const [item, setItem] = useState(initialItem);
  const [price, setPrice] = useState(initialPrice);
  const [image, setImage] = useState(initialImage);

  // ================ Local Storage =============================
  useEffect(() => {
    // storing form inputs
    localStorage.setItem("item", JSON.stringify(item));
  }, [item]);

  useEffect(() => {
    localStorage.setItem("price", JSON.stringify(price));
  }, [price]);

  useEffect(() => {
    localStorage.setItem("image", JSON.stringify(image));
  }, [image]);

  //  ================= Redux toolkit selector and dispatch =================
  const data = useSelector((state) => state.items.value);
  const dispatch = useDispatch();

  //  ================= Image submission =================
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setImage(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  // ========== Form Submission =================
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addItem({
        id: itemList[itemList.length - 1].id + 1,
        image: image,
        name: item,
        price: price.toLocaleString(),
      })
    );
    setItem("");
    setImage("");
    setPrice("");
    console.log(price);
  };
  return (
    <>
      <div className="mb-10">
        <h4 className="text-xl font-medium mb-5 xl:text-2xl">Fill This Form</h4>
        <form
          action=""
          className="flex flex-col gap-y-2.5 md:w-2/4 xl:w-1/3"
          onSubmit={handleSubmit}
        >
          <label htmlFor="" className="xl:text-base">
            Name Of Item
          </label>
          <input
            type="text"
            value={item}
            className="p-2 border-solid border-2  border-gray-400 rounded-xl"
            placeholder="Name of Item"
            onChange={(e) => {
              setItem(e.target.value);
            }}
            required
          />
          <label htmlFor="" className="xl:text-base">
            Item Image:
          </label>
          <input
            type="file"
            name=""
            accept="image/*"
            id=""
            onChange={handleImage}
            required
          />
          <label htmlFor="" className="xl:text-base">
            Price Of Item
          </label>
          <input
            type="number"
            value={price}
            className="p-2 border-solid border-2  border-gray-400 rounded-xl"
            placeholder="Price of Item"
            step="0.01"
            min="0"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            required
          />
          <button className="bg-slate-800 p-2 rounded-xl text-slate-100">
            Update Wishlist
          </button>
        </form>
      </div>
    </>
  );
};

export default ItemInput;
