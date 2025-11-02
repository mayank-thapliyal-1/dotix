import React from "react";
import { useNavigate } from "react-router-dom";
import Progress from "./Progress";
const Profile = ({ Profile, PhotoURL, email, Username, data }) => {
  const navigate = useNavigate();
  
  console.log(data);
  return (
    <div
      className={`${Profile ? "block" : "hidden"} flex-2 w-full bg-[#FFFBF0] `}
    >
      <div className="h-screen overflow-scroll w-full flex flex-col gap-10 sm:justify-between items-center  p-0 sm:p-10">
        <div className="bg-[#FFFFFF] shadow-md sm:p-5 w-full flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row  gap-3 sm:gap-10 items-center bg-slate-200 p-5 sm:rounded-2xl w-full">
            <img
              src={PhotoURL}
              className="w-32 h-32 sm:w-40 sm:h-40  rounded-full object-fill overflow-hidden"
              alt=""
            />
            <div className="flex flex-col gap-3">
              <h1 className=" text-2xl sm:text-5xl ">{data[0].Firstname}</h1>
              <h2>{Username}</h2>
            </div>
          </div>
          <hr className="hidden sm:block" />
          <div className="flex flex-col sm:flex-row w-full gap-2 pl-12 sm:pl-0 sm:justify-evenly sm:items-center text-sm sm:text-base">
            <div className="grid grid-cols-2 gap-2 sm:gap-5 ">
              <h2 className=" font-bold">First Name:</h2>{" "}
              <h2 className=" font-light text-gray-600">{data[0].Firstname}</h2>
              <h2 className=" font-bold">Last Name:</h2>{" "}
              <h2 className=" font-light text-gray-600">{data[0].Lastname}</h2>
              <h2 className=" font-bold">Gender:</h2>{" "}
              <h2 className=" font-light text-gray-600">{data[0].Gender}</h2>
              <h2 className=" font-bold">Location:</h2>{" "}
              <h2 className=" font-light text-gray-600">{data[0].Location}</h2>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-5  ">
              {" "}
              <h2 className=" font-bold">Email:</h2>{" "}
              <h2 className=" font-light text-gray-600">{email}</h2>{" "}
              <h2 className=" font-bold">Username</h2>
              <h2 className="font-light text-gray-600">{Username}</h2>
              <h2 className=" font-bold">Phone:</h2>
              <h2 className=" font-light text-gray-600">{data[0].Phone}</h2>
              <h2 className=" font-bold">Dob</h2>
              <h2 className=" font-light text-gray-600">{data[0].Dob}</h2>
            </div>
          </div>
          <h1 className="text-center font-semibold text-3xl underline uppercase mt-5 text-gray-700">
            Progress Report
          </h1>
          <Progress/>
        </div>
        <button
          className="bg-secondary/70 font-white sm:p-5 p-2 text-base sm:text-xl text-white font-bold hover:bg-secondary rounded-lg"
          onClick={() => navigate("/")}
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default Profile;
