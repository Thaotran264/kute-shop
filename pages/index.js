import { BeakerIcon } from "@heroicons/react/24/solid";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import Login from "../components/Login";
import { selectAuth } from "../features/auth/authSlice";
import { data } from "../data";
import Image from "next/image";
import { formatter } from "../utils/common";
import { useState } from "react";
import Topping from "../components/Topping";

export default function Home() {
  const auth = useSelector(selectAuth);
  const { isLogin } = auth;
  const [showTopping, setShowTopping] = useState({
    show: false,
    data: {},
  });

  const handleShowTopping = (data) => {
    setShowTopping({ show: !showTopping.show, data });
  };

  return (
    <Layout
      className={`${showTopping.show ? "overflow-hidden, min-h-screen" : ""}`}
    >
      {/* {isLogin && <Login />} */}
      {/* {!isLogin && <h1>Login</h1>} */}
      <section className="container mx-auto">
        <div className="w-[50vw] mx-auto">
          {data.map((item) => (
            <div key={item.id} className="w-full">
              <h2 className="text-2xl font-bold mb-2 border-0 border-b-2 border-b-black">
                {item.name}
              </h2>
              <ul>
                {item.items.map((it) => (
                  <li key={it.id} className="mb-2 border-b-2 border-b-red-500">
                    <div className="flex gap-2">
                      <div className="w-1/4 h-20">
                        <Image
                          src={it.image}
                          width={80}
                          height={80}
                          alt={it.name}
                        />
                      </div>
                      <div className="w-3/4 flex">
                        <div className="w-3/4">
                          <p>{it.name}</p>
                          <p className="text-xs text-slate-400 mb-2">
                            {it.description || ""}
                          </p>
                          <p className="text-red-500 text-xs mb-2">
                            {formatter.format(it.price)}
                          </p>
                          {/* <input
                          type="checkbox"
                          onChange={(e) => handleChange(e.target.checked, it)}
                        /> */}
                        </div>
                        <div className="w-1/4 flex items-center">
                          <button
                            onClick={() => handleShowTopping(it)}
                            className="  rounded px-2 py-1 self-start bg-red-500 text-white ml-auto mr-2 mt-1"
                          >
                            <PlusIcon className="h-6 w-6" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      {showTopping.show && (
        <Topping data={showTopping} setShowTopping={setShowTopping} />
      )}
    </Layout>
  );
}
