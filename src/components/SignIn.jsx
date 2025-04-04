import React, { useState } from "react";
// import { initializeApp  } from "firebase/app";
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "../firebase.js";
import { useNavigate } from "react-router-dom";


const SignIn = () => {
  const navigate = useNavigate();
  const [signUp, setSignUp] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const SignUp = async (email, username, password) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;

      await updateProfile(user, {
        displayName: username,
        photoURL: "src/assets/profile.png",
      });
     navigate("/profile");
    } catch (error) {
      console.error("Error Signing Up:", error.message);
    }
  };

  const SignIn = async (email, password) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      navigate("/home")
    } catch (error) {
      console.error("Error in SignIn:", error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp ? SignUp(email, username, password) : SignIn(email, password);
  };

  return (
    <div className="flex flex-col sm:flex-row overflow-hidden h-screen w-screen justify-center sm:justify-between items-center px-3 sm:p-44 bg-amber-500">
      <img src="src/assets/Logo.png" className="hidden sm:block w-1/2 bg-primary rounded-full p-10 shadow-md" alt="Logo" />
      
      <form className="flex flex-col bg-primary p-7  gap-5 rounded-2xl items-center" onSubmit={handleSubmit}>
        <h1 className="font-semibold text-3xl text-[#1E1741]">{signUp ? "Sign Up" : "Sign In"}</h1>

        {signUp && (
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            type="text"
            placeholder="UserName"
            className="bg-amber-200 p-3 rounded-lg outline-none w-60  sm:w-96 text-gray-600 hover:scale-105 delay-150 duration-500"
          />
        )}

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          placeholder="Email"
          className="bg-amber-200 p-3 rounded-lg outline-none w-60 sm:w-96 text-gray-600 hover:scale-105 delay-150 duration-500"
        />
        
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
          placeholder="Password"
          className="bg-amber-200 p-3 rounded-lg outline-none w-60 sm:w-96 text-gray-600 hover:scale-105 delay-150 duration-500"
        />
        
        <button type="submit" className="bg-secondary hover:bg-amber-500 hover:scale-105 duration-500 py-4 px-8 font-bold rounded-lg text-white border border-amber-500">
          Submit
        </button>

        <span className="flex gap-3">
          <p className="text-[#1E1741]">{signUp ? "Already have an account?" : "Don't have an Account?"}</p>
          <span className="cursor-pointer hover:scale-110 text-blue-600" onClick={() => setSignUp((prev) => !prev)}>
            {signUp ? "Sign In" : "Sign Up"}
          </span>
        </span>
      </form>
    </div>
  );
};

export default SignIn;
