import React from "react";
import { PiSignOut } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import logo from "../../assets/logoicon.jpeg";
const LeftBar = ({Profile,SignOut, DeleteAcc, SetProfile }) => {
  return (
    <div className=" h-screen w-72   font-serif bg-[#D97706] hidden  sm:block z-100 ">
      <div className=" flex flex-col h-screen justify-between   ">
        <h1 className=" flex items-center gap-2 text-4xl text-[#FFF7ED]  py-10 px-6 border-b-[1px]   ">
          <img
            className="rounded-full object-fit h-14 w-14"
            src={logo}
            alt=""
          />
          Quizzy
        </h1>
        <div className="flex flex-col justify-between  h-[80%] ">
          <div className="flex flex-col gap-4 mt-5">
            <h1
              className={`font-semibold ${
                Profile ? "bg-[#FBBF24] scale-105" : ""
              } uppercase text-[#FFF7ED] text-xl cursor-pointer hover:bg-[#FBBF24] hover:scale-105 p-3 pl-5`}
              onClick={() => SetProfile(true)}
            >
              Profile
            </h1>
            <h1
              className={`font-semibold ${Profile?"":"bg-[#FBBF24] scale-105"} uppercase text-[#FFF7ED] text-xl cursor-pointer hover:bg-[#FBBF24] hover:scale-105 p-3 pl-5`}
              onClick={() => SetProfile(false)}
            >
              Edit Profile
            </h1>
          </div>
          <div className="flex flex-col gap-2">
            <button
              className="flex gap-1 text-2xl items-center p-4 hover:bg-orange-400 text-white"
              onClick={SignOut}
            >
              {" "}
              <PiSignOut /> Sign-out
            </button>
            <button
              className="flex gap-1 text-xl items-center p-4 hover:bg-orange-400 text-white"
              onClick={DeleteAcc}
            >
              {" "}
              <MdDelete /> Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
