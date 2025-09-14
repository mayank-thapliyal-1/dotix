import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { collection, query, where, getDocs, addDoc, setDoc,doc } from "firebase/firestore";
import { auth, db } from "../backend/firebase.js";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import image  from "../assets/profile.png"
import Logo from "../assets/logo.jpeg"
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUp, setSignUp] = useState(true);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (signUp) {
        const userRef = collection(db, "users");
        const e = query(userRef, where("email", "==", email));
        const u = query(userRef, where("username", "==", username));
        const emailSnap = await getDocs(e);
        const usernameSnap = await getDocs(u);
        if (!emailSnap.empty) {
          setError("Email already in use!");
          return;
        }

        if (!usernameSnap.empty) {
          setError("Username already taken!");
          return;
        }
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        // Add user to Firestore
        const score =[];
      await setDoc(doc(db, "scores", user.uid), {
  uid: user.uid,
  email,
  score,
});
     await setDoc(doc(db, "users", user.uid), {
      uid : user.uid,
      username: username,
      email: user.email,
      photoUrl: {image},
      score: 0,
      totalattempt: 0,
      data:[],
    });
        navigate("/edit-profile");
        setError("");
        setComp("User created successfulluy!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setError("");
        const q = query(collection(db, "users"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          console.log("run");
          const userDoc = querySnapshot.docs[0];
          const data = userDoc.data();
          navigate("/");
        }
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex font-poppins overflow-hidden h-screen w-screen justify-between bg-slate-100 items-center ">
      <img
        src={Logo}
        className="hidden sm:block w-1/2 h-screen"
        alt="Logo"
      />
      <div className="flex justify-center items-center w-screen sm:w-1/2  h-screen">
        <form
          className="flex  flex-col p-12 bg-white rounded-3xl gap-6 shadow-md items-center"
          onSubmit={handleSubmit}
        >
          <h1 className="font-bold text-3xl text-[#10183c]">
            {signUp ? "Sign Up" : "Sign In"}
          </h1>
          <div className="flex flex-col items-center gap-6 ">
            <div className="flex flex-col gap-4 w-full">
              {signUp && (
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  type="text"
                  placeholder="UserName"
                  className="bg-slate-300 p-3 rounded-xl outline-none w-60 sm:w-full text-gray-600 hover:scale-105 delay-150 duration-500"
                />
              )}

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                placeholder="Email"
                className="bg-slate-300 p-3 rounded-xl outline-none w-60 sm:w-full text-gray-600 hover:scale-105 delay-150 duration-500"
              />

              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                placeholder="Password"
                className="bg-slate-300 p-3 rounded-xl outline-none w-60 sm:w-full text-gray-600 hover:scale-105 delay-150 duration-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <button
                type="submit"
                className="bg-secondary w-full hover:bg-primary hover:scale-105 duration-500 py-3 font-bold rounded-xl text-white"
              >
                Submit
              </button>
              <span className="flex gap-3 text-sm">
                <span>
                  {signUp
                    ? "Already have an account?"
                    : "Don't have an Account?"}
                </span>
                <span
                  className="cursor-pointer hover:scale-110 text-blue-400"
                  onClick={() => setSignUp((prev) => !prev)}
                >
                  {signUp ? "Sign In" : "Sign Up"}
                </span>
              </span>
            </div>
          </div>
          {error && <p className="text-red-600">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default SignIn;
