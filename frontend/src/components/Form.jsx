import React from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { Link } from "react-router-dom";

function Form({ route, method }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [ishidden, setHidden] = React.useState("hidden");

  const navigate = useNavigate();
  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();

    try {
      const res = await api.post(route, { username, password });

      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };
  function handleChange(event) {
    const newUsername = event.target.value;
    setUsername(newUsername);
  }

  return (
    <div className="w-full max-w-xs ">
      <form
        onSubmit={handleSubmit}
        className=" shadow-md rounded-xl  px-8 pt-6 pb-8 mb-4 bg-gradient-to-r from-slate-800 to-gray-900"
      >
        <h2 className=" text-center text-4xl font-bold text-gray-900 leading-tight mb-2 pb-4 relative">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            {name}
          </span>
          <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 "></span>
        </h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-md font-bold mb-2 pt-2"
            for="username"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
              Username
            </span>
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline bg-gradient-to-r from-slate-600 to-gray-600"
            id="username"
            type="text"
            placeholder="Username"
            onChange={handleChange}
            value={username}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-md font-bold mb-2"
            for="password"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
              Password
            </span>
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-400 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-gradient-to-r from-slate-600 to-gray-600"
            id="password"
            type="password"
            placeholder="******************"
            value={password}
            onChange={(event) => {
              const newpassword = event.target.value;
              setPassword(newpassword);
            }}
          />
          <p
            className="text-red-500 text-xs italic"
            style={{ visibility: ishidden }}
          >
            Please choose a password.
          </p>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-gradient-to-r from-pink-500 hover:to-yellow-500  hover: from-green-400 to-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={() => {
              if (password === "") {
                setHidden("visible");
              }
            }}
          >
            {name}
          </button>
          {method === "register" ? (
            <p className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              <Link to="/login">Already Signed In?</Link>
            </p>
          ) : (
            <p className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              <Link to="/register">Register</Link>
            </p>
          )}
        </div>
      </form>
      <p
        className="text-center  text-gray-500 text-xs"
        style={{ fontFamily: "sans-serif" }}
      >
        copyright &copy; 2024
      </p>
    </div>
  );
}

export default Form;
