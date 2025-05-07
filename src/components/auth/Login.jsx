import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../config/axiosConfig";


const LoginPage = () => {
  const backgroundImageUrl =
    "https://images.unsplash.com/photo-1525302220185-c387a117886e?auto=format&fit=crop&w=1950&q=80";

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = e.target;
    console.log("entered to send you login info")
    const input = {
      email: email.value,
      password: password.value,
    };

    try {
      console.log("sedning request to server next");
      const response = await api.post("/user/login", input);
      console.log("details sent successfully")
      const { message, token } = response.data;

      if (response.status === 200) {
        if (token) {
          localStorage.setItem("token", token);
          setTimeout(() => {
            navigate("/");
          }, 0);
        } else {
          setError("Very critical error bro");
          return;
        }
      }



      // console.log("loggedin user", response.data);
      // setUser({ id: response.data.userId });
      setMessage(response.data.message);
      setError(null);
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError(error.message);
      }
      setMessage(null);
    }
  };

  return (
    <>
      <div
        className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
        <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl z-10">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Welcome Back!
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please sign in to your account
            </p>
          </div>

          <div className="flex justify-center items-center space-x-3">
            <span className="w-11 h-11 flex items-center justify-center rounded-full bg-blue-900 text-white text-lg font-bold cursor-pointer hover:shadow-lg transition ease-in duration-300">
              
            </span>
            <span className="w-11 h-11 flex items-center justify-center rounded-full bg-blue-400 text-white text-lg font-bold cursor-pointer hover:shadow-lg transition ease-in duration-300">
              
            </span>
            <span className="w-11 h-11 flex items-center justify-center rounded-full bg-blue-500 text-white text-lg font-bold cursor-pointer hover:shadow-lg transition ease-in duration-300">
              {/* Add your SVG icon here */}
            </span>
          </div>

          {/* <div className="flex items-center justify-center space-x-2">
            <span className="h-px w-16 bg-gray-300"></span>
             <span className="text-gray-500 font-normal">OR</span> 
            <span className="h-px w-16 bg-gray-300"></span>
          </div> */}

          <form onSubmit={handleFormSubmit} className="mt-8 space-y-6">
            <div className="relative">
              <label className="text-sm font-bold text-gray-700 tracking-wide">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="mail@gmail.com"
                className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="mt-8">
              <label className="text-sm font-bold text-gray-700 tracking-wide">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                name="password"
                className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center bg-indigo-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg cursor-pointer transition ease-in duration-300"
              >
                Sign in
              </button>
            </div>

            <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
              
              <a
                href="/signup"
                className="text-indigo-500 hover:text-indigo-500 no-underline hover:underline cursor-pointer transition ease-in duration-300"
              >
                Sign up
              </a>
            </p>

            {error && <span className="mt-[5px] text-red-500">{error}</span>}
            {message && (
              <span className="mt-[5px] text-green-400">{message}</span>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
