import { useNavigate } from "react-router-dom";
import api from "../../../config/axiosConfig";
import { useState } from "react";

const Signup = () => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, password } = e.target;
    const input = {
      name: name.value,
      email: email.value,
      phone: phone.value,
      password: password.value,
    };

    try {
      const response = await api.post("/user/signup", input);
      const loginResponse = await api.post("/user/login", {
        email: input.email,
        password: input.password,
      });

      const { message, token } = loginResponse.data;
      
      if (loginResponse.status === 200) {
        if (token) {
          localStorage.setItem("token", token);
          setTimeout(() => {
            navigate("/");
          }, 100);
        } else {
          navigate("/login");
          return;
        }
      }

      setMessage(loginResponse.data.message);
      setError(null);
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
      setMessage(null);
    }
  };

  return (
    <div className="bg-white relative lg:py-20">
      <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl xl:px-5 lg:flex-row">
        <div className="flex flex-col items-center w-full pt-5 pr-10 pb-20 pl-10 lg:pt-20 lg:flex-row">
          <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12">
            <div className="flex flex-col items-center justify-center w-full h-full relative lg:pr-10">
              <img
                src="https://res.cloudinary.com/macxenon/image/upload/v1631570592/Run_-_Health_qcghbu.png"
                alt="Signup Illustration"
                className="hidden lg:inline-block btn-"
              />
            </div>
          </div>

          <div className="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
            <form
              onSubmit={handleFormSubmit}
              className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10"
            >
              <p className="w-full text-4xl font-medium text-center leading-snug font-serif">
                Sign up for an account
              </p>

              <div className="w-full mt-6 space-y-8">
                <div className="relative">
                  <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 ml-2 font-medium text-gray-600 absolute">
                    Username
                  </p>
                  {/* *** */}
                  <input
                    placeholder="John"
                    name="name"
                    type="text"
                    className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 text-base block bg-white border-gray-300 rounded-md"
                  />
                </div>

                <div className="relative">
                  <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 ml-2 font-medium text-gray-600 absolute">
                    Email
                  </p>
                  {/* *********** */}
                  <input
                    placeholder="123@ex.com"
                    name="email"
                    type="email"
                    className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 text-base block bg-white border-gray-300 rounded-md"
                  />
                </div>

                <div className="relative">
                  <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 ml-2 font-medium text-gray-600 absolute">
                    Phone Number
                  </p>
                  {/* ************ */}
                  <input
                    placeholder="(123) 456-7890"
                    name="phone"
                    type="tel"
                    className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 text-base block bg-white border-gray-300 rounded-md"
                  />
                </div>

                <div className="relative">
                  <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 ml-2 font-medium text-gray-600 absolute">
                    Password
                  </p>
                  {/* ********** */}
                  <input
                    placeholder="Password"
                    name="password"
                    type="password"
                    className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 text-base block bg-white border-gray-300 rounded-md"
                  />
                </div>

                <div className="relative">
                  <button
                    type="submit"
                    className="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500 rounded-lg transition duration-200 hover:bg-indigo-600 ease"
                  >
                    Submit
                  </button>
                </div>
              </div>
              {error && <span className="mt-[5px] text-red-500">{error}</span>}
              {message && (
                <span className="mt-[5px] text-green-400">{message}</span>
              )}
            </form>

            
            <svg
              viewBox="0 0 91 91"
              className="absolute top-0 left-0 z-0 w-32 h-32 -mt-12 -ml-12 text-yellow-300 fill-current"
            >
              
            </svg>

            <svg
              viewBox="0 0 91 91"
              className="absolute bottom-0 right-0 z-0 w-32 h-32 -mb-12 -mr-12 text-indigo-500 fill-current"
            >
              
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
