import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  signOut,
} from "firebase/auth";
import {
  doc,
  deleteDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../backend/firebase.js";
import Profile from "./Profile.jsx";
import EditProfile from "./EditProfile.jsx";
import LeftBar from "./LeftBar.jsx";
import { GiHamburgerMenu } from "react-icons/gi";
import { PiSignOut } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useUSerStore } from "../../backend/useUSerstore.js";

const Profile1 = () => {
  const navigate = useNavigate();
  const currentUser = useUSerStore((state)=>state.currentUser);
  const fetchUser = useUSerStore((state)=>state.fetchUser);
  useEffect(()=>{
    fetchUser();
  },[])
  // console.log(currentUser)
  const [profile, SetProfile] = useState(true);
  const [option,setOption] = useState(false);
  //handleoption 
  const handleoption =()=>{
     setOption((perv)=>!perv);
  }
  //sign out
  const SignOut = async () => {
    try {
      await signOut(auth);
      alert("account signout successfully");
      dataremove();
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  // Delete Account

  const Deleteacc = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("No user Found");
      setError("No user Found");
      return;
    }
    const password = prompt("Please enter your password");
    if (!password) return;

    try {
      const credentials = EmailAuthProvider.credential(user.email, password);
      if (!credentials) {
        setError("password is incorrect");
      }
      await reauthenticateWithCredential(user, credentials);
      console.log("reauthenticate done nicely");
      const userRef = doc(db, "users", userDocId);
      await deleteDoc(userRef);
      await deleteUser(user);
      alert("account delete successFully");
      dataremove();
    } catch (error) {
      setError(error.message);
    }
  };
const dataremove = () => {
    localStorage.clear();
    navigate("/");
  };
  if(currentUser==null){
    return (
      <p>Loading......</p>
    )
  }
  return (
    <div className="h-screen  w-screen  flex items-start">
      {/* hamburger  */}
     <GiHamburgerMenu className="lg:hidden block absolute right-2  text-primary top-3 cursor-pointer" onClick={handleoption} />
     {option && <div className="absolute flex flex-col gap-4 items-center bg-secondary text-white opacity-70 right-3 top-6 py-4 rounded-lg">
      <h1 className={`cursor-pointer hover:bg-primary w-full  hover:text-slate-200 px-5`} onClick={()=>SetProfile(true)}>Profile</h1>
      <h1 className={`cursor-pointer hover:bg-primary px-5 w-full hover:text-slate-200`} onClick={()=>SetProfile(false)}>Edit Proffile</h1>
      <h1 className="flex gap-2 items-center cursor-pointer hover:bg-primary px-5 w-full hover:text-slate-200" onClick={SignOut}> <PiSignOut/> Sign Out </h1>
      <h1 className="flex gap-2 items-center cursor-pointer hover:bg-primary px-5 w-full hover:text-slate-200" onClick={Deleteacc}><MdDelete/> Delete Account</h1>
      </div>}
      {/* left-Part */}
      <LeftBar
        Profile={profile}
        SignOut={SignOut}
        DeleteAcc={Deleteacc}
        SetProfile={SetProfile}
      />
      {/* right-part  */}
      <Profile
        Profile={profile}
        PhotoURL={currentUser.photoUrl}
        email={currentUser.email}
        Username={currentUser.username}
        data={currentUser.data}
      />
      <EditProfile
        Profile={profile}
      />
    </div>
  );
};

export default Profile1;
