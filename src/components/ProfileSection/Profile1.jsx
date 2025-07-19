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
import { useNavigate } from "react-router-dom";

const Profile1 = ({
  username,
  data,
  setData,
  image,
  setImage,
  photoUrl,
  setPhotoUrl,
  email,
  userDocId,
  error,
}) => {
  const navigate = useNavigate();
  const [profile, SetProfile] = useState(true);
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
  if(!data || data.length ===0){
    return (
      <p>Loading......</p>
    )
  }
  return (
    <div className="h-screen  w-screen  flex items-start">
      {/* hamburger  */}
      {/* <div></div> */}
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
        PhotoURL={photoUrl}
        email={email}
        Username={username}
        data={data}
      />
      <EditProfile
        username={username}
        data={data}
        setData={setData}
        image={image}
        setImage={setImage}
        photoUrl={photoUrl}
        setPhotoUrl={setPhotoUrl}
        userDocId={userDocId}
        Profile={profile}
      />
    </div>
  );
};

export default Profile1;
