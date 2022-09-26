import React, { useState } from "react";
import { userApi } from "../api/user";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";

const Login = () => {
  const notify = (err) => toast.error(err);

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!phone) return   notify("Invalid value");
    if(!password) return   notify("Invalid value");
    const res = await userApi.login({ email: phone, password });
    if (res.successful && res.data) {
      notify("Login Success!!!");
      dispatch(login(res.data))
      localStorage.setItem('token',res.data.token)
    } else {
      notify(res.message);
    }
  };
  return (
    <section className="flex flex-col items-center">
         <ToastContainer />
      <article className="w-96 mx-auto bg-red-500 p-5 flex flex-col gap-5">
        <h2 className="text-center font-bold text-3xl">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label>Email/Phone:</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="rounded-md p-2 text-sm"
              type="text"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label>Password:</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-md p-2 text-sm"
              type="password"
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white h-10 w-full rounded"
          >
            Login
          </button>
        </form>
      </article>
    </section>
  );
};

export default Login;
