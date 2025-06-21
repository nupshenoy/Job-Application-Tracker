import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useState } from "react";

function SignUpPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const res = await fetch('http://localhost:5000/auth/register', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         name: fullName,
  //         email,
  //         password
  //       })
  //     });

  //     const data = await res.json();

  //     if (!res.ok) {
  //       alert(data.message || 'Signup failed');
  //       return;
  //     }

  //     // Save token and redirect
  //     localStorage.setItem('token', data.token);
  //     localStorage.setItem("username", res.data.user.name);
  //     navigate('/dashboard');
  //   } catch (err) {
  //     alert('Something went wrong');
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/register", {
        name,
        email,
        password,
      });

      console.log("Signup response:", res.data);

      login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert("Signup failed. User with this email already exists.");
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen w-full pt-16">
      <div className="container mx-auto w-1/3 p-4 bg-white shadow-md rounded-lg">
        <p className="text-4xl font-bold mb-2">Get Started</p>
        <p className="text-sm text-gray-500 mb-8 pb-3 border-b border-gray-300">
          Create your job tracker account
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-3">
            <div className="flex flex-col flex-1">
              <label className="text-md m-1 font-semibold">
                Full Name
                <span className="text-red-700"> *</span>
              </label>
              <input
                type="text"
                placeholder="First and last name, e.g John Doe"
                className="border border-gray-300 rounded-md p-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              ></input>
            </div>
          </div>
          <div className="flex flex-col mt-5">
            <label className="text-md m-1 font-semibold">
              Email
              <span className="text-red-700"> *</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 rounded-md p-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>
          </div>

          <div className="flex flex-col mt-5">
            <label className="text-md m-1 font-semibold">
              Password
              <span className="text-red-700"> *</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-300 rounded-md p-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></input>
          </div>

          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-black text-white p-3  rounded w-full cursor-pointer hover:bg-gray-300 hover:text-black"
            >
              Submit
            </button>
          </div>

          <div className="text-center m-6 text-xs font-semibold cursor-pointer">
            <NavLink to="/login">Already have an account? Sign in</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
