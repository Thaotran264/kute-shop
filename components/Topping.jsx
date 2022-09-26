import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { formatter } from "../utils/common";

const Topping = ({ data, setShowTopping }) => {
  const { id, name, price, image, description, toppings, groupToppings } =
    data.data;
  const [note, setNote] = useState("");
  const [count, setCount] = useState(1);
  const [selectRadioBtn, setSelectRadioBtn] = useState("");
  const [listTopping, setListTopping] = useState([]);
  const [items, setItems] = useState([]);
  const [listGroupTopping, setListGroupTopping] = useState([]);
  const handleCloseTopping = () => {
    setShowTopping({ ...data, show: !data.show });
  };

  const handleRadioClick = (e) => {
    setSelectRadioBtn(e.target.value);
  };
  const handleAddCart = () => {
    let toppingsPrice = items.reduce((cal, item) => cal+ item.price, 0)
    console.log(toppingsPrice);
    const data = {
      name,
      image,
      id,
      price,
      count,
      totalPrice: (price +toppingsPrice )* count,
      note,
      toppings: items
    };
    console.log(data);
  };
  const handleChange = (value, data) => {
    const { id } = data;
    let item = items.filter((item) => item.id === id);
    if (!item.length && value) setItems([...items, { id,name: data.name, price: data.price }]);
    if (item.length && !value) {
      setItems(items.filter((item) => item.id !== id));
    }
  };
  const handleRadioBtn  = (value, data, parentID) => {
    console.log(value, data, parentID)
    setSelectRadioBtn(value)
  }
  return (
    <section className="fixed inset-0 min-h-screen flex flex-col">
      <div className="topping container mx-auto h-[90vh]  bg-white mt-auto ">
        <div className="w-[50vw] mx-auto shadow-lg h-full overflow-y-auto flex flex-col relative rounded">
          {/* Topping Title */}
          <div className="fixed p-2 w-[50vw] bg-white shadow-lg">
            <h2 className="text-center">Thêm topping</h2>
            <button
              onClick={handleCloseTopping}
              className="absolute top-[0.5rem] left-[0.5rem] bg-slate-50 rounded-full"
            >
              <XMarkIcon className="h-6 w-6 bg-slate-100" />
            </button>
          </div>
          {/* TOpping Background */}
          <div
            className="w-full h-40"
            style={{
              backgroundImage: `url('https://i.pinimg.com/564x/2a/33/82/2a3382a71c6139c33a11415849165460.jpg')`,
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "fixed",
              backgroundPosition: " center",
              minHeight: 250,
              backgroundSize: "cover",
            }}
          ></div>
          {/* Topping Menu List */}
          <div className="mb-[72px]">
            <div className="">
              <div className="px-2 flex justify-between items-center">
                <h2 className="text-2xl font-bold">{name}</h2>
                <p className="text-sm text-slate-700">
                  {formatter.format(price)}
                </p>
              </div>
              <p className="px-2 text-slate-500 text-sm">{description}</p>
              <input
                type="text"
                className="text-green-500 text-sm px-3 py-2 
                active:border-0 active:outline-none
                focus:border-0 focus:outline-none w-full"
                placeholder="Lời nhắn cho cửa hàng"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <div>
                {groupToppings.map((item) => (
                  <div key={item.id}>
                    <h2 className="bg-slate-50 py-4 font-bold px-2">
                      {item.name}
                    </h2>
                    {item.toppings.map((menuItem) => (
                      <div
                        key={menuItem.id}
                        className="p-3 border-b-2 flex items-center"
                      >
                        <input
                          type="radio"
                          name={menuItem.name}
                          id={menuItem.id}
                          value={menuItem.name}
                          checked={selectRadioBtn == menuItem.name}
                          onChange={(e) => handleRadioBtn(e.target.value, menuItem, item.id)}
                          className="mr-2"
                        />
                        <label>{menuItem.name}</label>
                        <p className="ml-auto">
                          {formatter.format(menuItem.price)}
                        </p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div>
                <h2 className="bg-slate-50 py-4 font-bold px-2">
                  Thêm Topping
                </h2>

                {toppings.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 border-b-2 flex items-center"
                  >
                    <input type="checkbox" onChange={(e)=>handleChange(e.target.checked, item)} id={item.id} className="mr-2" />
                    <label>{item.name}</label>
                    <p className="ml-auto">{formatter.format(item.price)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Topping Group Button */}
          <div className="flex gap-2 py-4 px-1 shadow-lg fixed bottom-0 w-[50vw] bg-white">
            <div className="flex items-center">
              <button
                className="w-8 h-8 bg-slate-100 rounded"
                onClick={() => setCount(count - 1)}
                disabled={count == 1}
              >
                -
              </button>
              <span className="w-8 text-center">{count}</span>
              <button
                className="w-8 h-8 bg-slate-100 rounded"
                onClick={() => setCount(count + 1)}
              >
                +
              </button>
            </div>
            <button
              className="bg-red-500 h-10 px-2 py-1 text-white w-full rounded"
              onClick={handleAddCart}
            >
              Thêm
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Topping;
