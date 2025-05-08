import {
  deleteUser,
  EmailAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  signOut,
} from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase.js";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile.jsx";
import EditProfile from "./EditProfile.jsx";
import LeftBar from "./LeftBar.jsx";

const Profile1 = () => {
  const navigate = useNavigate();
  const [profile,SetProfile] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [Displayname, setDisplayname] = useState("");
  const [image, setImage] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [userDocId, setUserDocId] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(""); // clear error after 3 seconds
      }, 3000);

      return () => clearTimeout(timer); // cleanup if component unmounts or error changes
    }
  }, [error]);
  useEffect(() => {
    const fetchUserData = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const q = query(
              collection(db, "users"),
              where("uid", "==", user.uid)
            );
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
              console.log("run");
              const userDoc = querySnapshot.docs[0];
              const data = userDoc.data();
              setUserDocId(userDoc.id); // <-- store document ID
              setEmail(data.email);
              setUsername(data.username);
              setPhotoUrl(data.photoUrl);
              if (data.Displayname) {
                setDisplayname(data.Displayname);
              }
            }
          } catch (err) {
            console.error("Error fetching user from Firestore:", err);
          }
        }
      });
    };
    fetchUserData();
  }, []);
  const dataremove = () => {
    localStorage.clear();
    navigate("/");
  };

  // Sign Out

  const SignOut = async () => {
    try {
      await signOut(auth);
      alert("account signout successfully");
      dataremove();
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

  // Image Upload

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    const objectUrl = URL.createObjectURL(file);
    setPhotoUrl(objectUrl);
  };
// Upload Image In Cloudinary
  const uploadImageToCloudinary = async () => {
    if (photoUrl && photoUrl.startsWith("https://res.cloudinary.com/")) {
      console.log("Image already uploaded, skipping re-upload...");
      return photoUrl;
    }
    if (!image) {
      alert("Please select an image first");
      return null;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "Quiizy");
    formData.append("folder", "Quizzy");

    try {
      const response = await fetch(import.meta.env.VITE_Cloudinary_API_KEY, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      alert("image upload succesfully");

      return data.secure_url;
    } catch (error) {
      console.log("Cloudinary upload failed", error);
      alert("Image upload failed");
      return null;
    }
  };
  // Update Profile
  const updateProfile = async () => {
    try {
      if (Displayname.trim() === "") {
        alert("Please provide a display name first");
        return;
      }

      if (!auth.currentUser) {
        throw new Error("User is not logged in");
      }

      if (!userDocId) {
        throw new Error("User Firestore document not found");
      }

      let finalPhotoUrl = photoUrl;

      if (image) {
        const uploadedUrl = await uploadImageToCloudinary();
        if (uploadedUrl) {
          finalPhotoUrl = uploadedUrl;
          setPhotoUrl(uploadedUrl);
        }
      }

      const userRef = doc(db, "users", userDocId);
      await updateDoc(userRef, {
        Displayname: Displayname,
        photoUrl: finalPhotoUrl,
      });
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          displayName: Displayname,
          photoURL: finalPhotoUrl,
          username: username,
        })
      );
      navigate("/home");
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };
  return (
    <div className="h-screen  w-screen overflow-hidden flex ">
      {/* hamburger  */}
      {/* <div></div> */}
      {/* left-Part */}
      <LeftBar SignOut={SignOut} DeleteAcc={Deleteacc} SetProfile={SetProfile} />
      {/* right-part  */}
      <Profile Profile={profile} PhotoURL={photoUrl} Email={email} Username={username} />
      <EditProfile Profile={profile} UpdateProfile={updateProfile} up />
    </div>
  );
};

export default Profile1;
