import { useContext } from "react";
import { AuthContext } from "../../../utils/AuthProvider";
import { FollowersContext } from '../../../utils/FollowersProvider';
import { FollowingContext } from '../../../utils/FollowingProvider';
import { FavoriteContext } from '../../../utils/FavoriteProvider';
import { useNavigate } from "react-router-dom";
import MyRecipeList from "./MyRecipeList";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const { followers } = useContext(FollowersContext);
  console.log("\n\nprofile.jsx followers are : ",followers);
  const { following } = useContext(FollowingContext);
  const { favorites } = useContext(FavoriteContext);
  const navigate = useNavigate();
  console.log(user);

  return (
    <section className="pt-16 bg-blueGray-50">
      <div className="w-full mt-[80px] lg:w-4/12 px-4 mx-auto">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
          <div className="px-6">
            <div className="flex flex-wrap justify-center">
              <div className="w-full px-4 flex justify-center">
                <div className="relative">
                  {/* ✅ Fixed image styling */}
                  <img
                    alt="Profile"
                    src="https://i.pinimg.com/474x/8a/62/78/8a62782208b6e286936b6f12e8feaf77.jpg"
                    className="shadow-xl rounded-full h-40 w-40 object-cover border-4 border-white -mt-16"
                  />
                </div>
              </div>
              <div className="w-full px-4 text-center mt-4">
                <div className="flex justify-center py-4 lg:pt-4 pt-8">
                  <div onClick={()=>navigate('/followings')} className="mr-4 p-3 text-center cursor-pointer">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      {following?.length || "0"}
                    </span>
                    <span  className="text-sm text-blueGray-400">following</span>
                  </div>
                  <div onClick={()=>navigate('/followers')} className="mr-4 p-3 text-center cursor-pointer">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      {followers?.length || "0"}
                    </span>
                    <span className="text-sm text-blueGray-400">followers</span>
                  </div>

                  <div className="mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      {favorites?.length || "0"}
                    </span>
                    <span className="text-sm text-blueGray-400">favorites</span>
                  </div>
                  
                </div>
              </div>
            </div>

            <div className="text-center mt-6">
              <h3 className="text-xl font-semibold leading-normal text-blueGray-700">
                {user?.name || "loading.."} {/* USER NAME */}
              </h3>
              <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                {user?.email || "loading..."}
              </div>
              
            </div>

            <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-9/12 px-4">
                  <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                    {user.bio}
                  </p>
                  <a href="#!" className="font-normal text-pink-500">
                    Show more
                  </a>
                </div>
              </div>
            </div>
            {/* USER'S POSTS */}
            <MyRecipeList/>
          </div>
        </div>
      </div>

      
    </section>
  );
};

export default Profile;

