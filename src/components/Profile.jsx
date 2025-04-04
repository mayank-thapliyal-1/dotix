import React,{useEffect, useState} from "react";
import {auth} from "../firebase.js";
import { onAuthStateChanged } from "firebase/auth";
const Profile = () => {
  const [email,setEmail]= useState('');
  const [username,setUsername]= useState('');
  const [password,setPassword] = useState('');
  const [newpassword,setNewpassword]=useState('');
  const [profilepic,setProfilepic]=useState("src/assets/profile.png");

   useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email || '');
        setUsername(user.displayName || '');
        setProfilepic(user.photoURL || '');
        setPassword(user.password);
      }
    });
    return () => unsubscribe(); 
  },);
  const updateProfile= async (username,newpassword,email,password,profilepic)=>{
   try{
    const user =  auth.currentUser;
    if(!user){
      throw new Error("User is not logged in");
    }
    
   }
   catch(eror){

   }
  };
  return (
    <div className=" bg-gradient-to-br from-[#ee9750] via-[#FF9D00] to-[#FF7500]  bg-transparent h-screen flex justify-center items-center font-serif ">
      <div className="flex flex-col gap-11 items-center  bg-gradient-to-bl from-orange-500 via-orange-700 to-orange-500 shadow-2xl p-8 rounded-lg ">
        <h1 className="text-white font-bold text-3xl uppercase  p-2 rounded-lg ">Profile</h1>
        <div className="flex justify-between items-center gap-10">
          <div className="flex flex-col gap-5">
            <input
               value={username}
               onChange={(e)=>setUsername(e.target.value)}
              type="text"
              placeholder="Username"
              className="w-72 px-3 py-2 outline-none bg-amber-100 rounded-lg hover:scale-110 hover:shadow-lg duration-500"
            />
            <input
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Email"
              className="px-3 py-2 outline-none bg-amber-100 rounded-lg hover:scale-110 hover:shadow-lg duration-500"
            />
            <input
              type="Password"
              value={newpassword}
              onChange={(e)=>setNewpassword(e.target.value)}
              placeholder="Password"
              className="px-3 py-2 outline-none bg-amber-100 rounded-lg hover:scale-110 hover:shadow-lg duration-500"
            />
          </div>
          <img
            className="h-40 object-cover rounded-full"
            src={profilepic}
            alt=""
          />
        </div>
        <div className="flex justify-between w-full">
          <button
            className="bg-gradient-to-r from-green-500 to-green-600 shadow-lg px-3 py-2 font-semibold text-white rounded-lg"
          >
            Logout
          </button>
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg px-4 py-2 font-semibold text-white w-32 rounded-lg" onClick={updateProfile}>
            Save
          </button>
          <button className="bg-gradient-to-r from-red-500 to-red-600 shadow-lg px-3 py-2 font-semibold text-white rounded-lg">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
