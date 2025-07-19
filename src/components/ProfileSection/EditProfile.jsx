import React, { useEffect, useRef, useState } from "react";
import profileImg from "../../assets/profile.png";
import profileImg1 from "../../assets/profile-icons/3d-boy1.jpg";
import profileImg2 from "../../assets/profile-icons/3d-boy-2.jpg";
import profileImg3 from "../../assets/profile-icons/3d-boy-3.jpg";
import profileImg4 from "../../assets/profile-icons/3d-girl.jpg";
import profileImg5 from "../../assets/profile-icons/white-tiger.jpg";
import profileImg6 from "../../assets/profile-icons/eagle.jpg";
import profileImg7 from "../../assets/profile-icons/bunny.jpg";
import profileImg8 from "../../assets/profile-icons/wolf&cap.jpg";
import profileImg9 from "../../assets/profile-icons/green-tiger.jpg";
import profileImg10 from "../../assets/profile-icons/wolf.jpg";
import profileImg11 from "../../assets/profile-icons/monkey.jpg";
import profileImg12 from "../../assets/profile-icons/loin.jpg";
import profileImg13 from "../../assets/profile-icons/2d-image1.jpg";
import profileImg14 from "../../assets/profile-icons/profile2.jpeg";
import profileImg15 from "../../assets/profile-icons/profile3.jpeg";
import { MdEdit } from "react-icons/md";
import { auth, db } from "../../backend/firebase.js";
import { updateDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
const EditProfile = ({
  username,
  data,
  setData,
  image,
  setImage,
  photoUrl,
  setPhotoUrl,
  userDocId,
  Profile,
}) => {
  //   const value = new Date(data[0].dob.seconds * 1000);
  // const formattedDob = value.toISOString().split("T")[0];
  const [firstname, setFirstname] = useState(
    data[0] != null || data[0] != undefined ? data[0].Firstname : ""
  );
  const [lastname, setLastname] = useState(
    data[0] != null || data[0] != undefined ? data[0].Lastname : ""
  );
  const [Dob, setDob] = useState(
    data[0] != null || data[0] != undefined ? data[0].Dob : ""
  );
  const [Phone, setPhone] = useState(
    data[0] != null || data[0] != undefined ? data[0].Phone : ""
  );
  const [location, setLocation] = useState(
    data[0] != null || data[0] != undefined ? data[0].Location : ""
  );
  const [gender, setGender] = useState(
    data[0] != null || data[0] != undefined ? data[0].Gender : "Male");
  const [profileimage, setProfileimage] = useState( photoUrl || profileImg);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const FileInputRef = useRef();

  useEffect(() => {
    const timer = setInterval(() => {
      setError("");
      return () => clearTimeout(timer);
    }, 5000);
  }, []);

  // Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    const objectUrl = URL.createObjectURL(file);
    setProfileimage(objectUrl);
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
  const UpdateProfile = async () => {
    try {
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
        photoUrl: finalPhotoUrl,
        username: username,
        data: data,
      });
      console.log(data);
      setPhotoUrl(finalPhotoUrl);
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          displayName: firstname,
          photoURL: finalPhotoUrl,
          username: username,
        })
      );
       Profile == null || Profile == undefined ? navigate("/") : "";
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };
  const ob = [
    {
      icon: `${profileImg1}`,
    },
    {
      icon: `${profileImg2}`,
    },
    {
      icon: `${profileImg3}`,
    },
    {
      icon: `${profileImg4}`,
    },
    {
      icon: `${profileImg5}`,
    },
    {
      icon: `${profileImg6}`,
    },
    {
      icon: `${profileImg7}`,
    },
    {
      icon: `${profileImg8}`,
    },
    {
      icon: `${profileImg9}`,
    },
    {
      icon: `${profileImg10}`,
    },
    {
      icon: `${profileImg11}`,
    },
    {
      icon: `${profileImg12}`,
    },
    {
      icon: `${profileImg13}`,
    },
    {
      icon: `${profileImg14}`,
    },
    {
      icon: `${profileImg15}`,
    },
  ];
  const showvalue = () => {
    try {
      if (firstname.trim() === "") {
        setError("Please provide a display name first");
        return;
      }
      const value = [
        {
          Firstname: firstname,
          Lastname: lastname,
          Dob: Dob,
          Phone: Phone,
          Location: location,
          Gender: gender,
        },
      ];
      setData(value);
      console.log("data = "+data);
      UpdateProfile();
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div
      className={`${
        Profile ? "hidden" : "block"
      } flex-2 flex items-center flex-col gap-10 w-full h-screen p-5 bg-[#FFFBF0]`}
    >
      <div className="sm:flex hidden  justify-between py-2 px-4 shadow-lg rounded-lg w-full bg-white items-center  ">
        <h1>Edit Profie</h1>
        <input
          type="file"
          hidden
          ref={FileInputRef}
          onChange={(e) => handleImageUpload(e)}
        />
        <img
          src={profileimage}
          alt="profilepic"
          className="h-10 w-10 rounded-full "
        />
      </div>
      <div className="flex flex-col w-full sm:w-1/2  p-4 gap-3 bg-white shadow-lg rounded-md">
        <div className="flex gap-3 items-center">
          <div className="flex items-end ">
            <img
              src={profileimage}
              alt=""
              className=" h-20 w-20 sm:h-48 sm:w-48 rounded-full  object-fit flex justify-center"
            />{" "}
            <MdEdit
              className="text-blue-800 h-5 w-7 sm:h-7 sm:w-7 p-[3px] sm:p-1 rounded-full bg-amber-400 relative font-bold cursor-pointer text-4xl sm:text-xl  right-8 sm:right-16 "
              onClick={() => {
                FileInputRef.current.click();
              }}
            />
          </div>
          <div className="grid grid-cols-5 gap-3 overflow-hidden">
            {ob.map((items, i) => (
              <div
                key={i}
                onClick={() => {
                  setProfileimage(items.icon);
                  setPhotoUrl(items.icon);
                }}
              >
                <img
                  src={items.icon}
                  alt="imgages"
                  className=" cursor-pointer hover:scale-105 h-8 w-8 sm:h-12 sm:w-12 rounded-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <span className="flex gap-5 w-full">
          <fieldset className="p-2 border-[1px] w-full focus:border-2 rounded-md border-slate-500 bg-slate-50">
            <legend>First-Name</legend>
            <input
              className="outline-none bg-transparent w-full"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              type="text"
            />
          </fieldset>
          <fieldset className="p-2 border-[1px] w-full focus:border-2 rounded-md border-slate-500 bg-slate-50">
            <legend>Last-Name</legend>
            <input
              className="outline-none bg-transparent w-full"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              type="text"
            />
          </fieldset>
        </span>
        <fieldset className="p-2 border-[1px] focus:border-2 rounded-md border-slate-500 bg-slate-50">
          <legend>Username</legend>
          <input
            className="outline-none bg-transparent w-full"
            value={username}
            readOnly
            type="text"
          />
        </fieldset>
        <fieldset className="p-2 border-[1px] focus:border-2 rounded-md border-slate-500 bg-slate-50">
          <legend>Location</legend>
          <input
            className="outline-none bg-transparent w-full"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type="text"
          />
        </fieldset>
        <fieldset className="p-2 border-[1px] focus:border-2 rounded-md border-slate-500 bg-slate-50">
          <legend>Phone</legend>
          <input
            className="outline-none bg-transparent w-full"
            value={Phone}
            onChange={(e) => setPhone(e.target.value)}
            pattern="[0-9]{10}"
            type="tel"
          />
        </fieldset>
        <span className="flex flex-col sm:flex-row justify-between w-full items-center pr-5 ">
          <div className="flex gap-3 items-center">
            <fieldset className="p-2 border-[1px] focus:border-2 rounded-md border-slate-500 bg-slate-50">
              <legend>Dob</legend>
              <input
                className="outline-none bg-transparent w-full"
                value={Dob}
                onChange={(e) => setDob(e.target.value)}
                type="date"
              />
            </fieldset>
            <fieldset className="p-2 border-[1px] focus:border-2 rounded-md border-slate-500 bg-slate-50">
              <legend>Gender</legend>
              <select
                name=""
                id=""
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="outline-none bg-transparent"
              >
                <option value="male">MALE</option>
                <option value="female">FEMALE</option>
                <option value="trans">TRANS</option>
                <option value="other">OTHER</option>
              </select>
            </fieldset>
          </div>
          <button
            className="hover:bg-amber-400 border-amber-400 border-2 text-amber-400 hover:text-white hover:shadow-lg duration-200 text-xl rounded-lg mt-2 px-4 py-3 "
            onClick={showvalue}
          >
            Save Changes
          </button>
        </span>
        <p className="text-rose-500 ">{error}</p>
      </div>
    </div>
  );
};

export default EditProfile;
