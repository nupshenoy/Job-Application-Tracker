import  { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const res = await fetch("http://localhost:5000/auth/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     const data = await res.json();

  //     if (!res.ok) {
  //       alert(data.message || "Login failed");
  //       return;
  //     }

  //     // ✅ Save token and redirect
  //     localStorage.setItem("token", data.token);
  //     localStorage.setItem("username", res.data.user.name);
  //     navigate("/dashboard");
  //   } catch (error) {
  //     alert("Something went wrong");
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      // Call login to store token and user
      login(res.data.user, res.data.token);

      navigate("/dashboard"); // ✅ Redirect to homepage
    } catch (error) {
      alert("Login failed. Check your credentials.");
      console.error(error);
    }
  };

  return (
    <>
    {/* // <div className=" pt-6 bg-gray-100 overflow-hidden"> */}

      {/* Login Form */}
      <div className="container mx-auto w-1/4 p-4 bg-white shadow-md rounded-lg">
        <p className="text-4xl font-bold mb-2">Welcome Back</p>
        <p className="text-sm text-gray-500 mb-8 pb-3 border-b border-gray-300">
          Sign in to your job tracker
        </p>
        <form onSubmit={handleLogin}>
          <div className="flex flex-col">
            <label className="text-md m-1 font-semibold">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 rounded-md p-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>

          <div className="flex flex-col mt-5">
            <label className="text-md m-1 font-semibold">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-300 rounded-md p-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>

          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-black text-white p-3  rounded w-full cursor-pointer hover:bg-gray-300 hover:text-black"
            >
              Sign In
            </button>
          </div>

          <div className="text-center m-6 text-xs font-semibold cursor-pointer">
            <NavLink to="/register">Don't have an account? Sign Up</NavLink>
          </div>
        </form>
      </div>
    {/* // </div> */}
    </>
  );
}

export default LoginPage;
