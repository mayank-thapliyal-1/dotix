import { FaEye } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { MdOutlineReplay } from "react-icons/md";
import leaderboard from "../assets/leaderboard.png";
import arrow from "../assets/arrow.png";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../backend/firebase";
import { onAuthStateChanged } from "firebase/auth";

const Score = ({ resetScores }) => {
  const navigate = useNavigate();
  const correct = parseInt(localStorage.getItem("quizcorrect")) || 0;
  const wg = parseInt(localStorage.getItem("quizwrong")) || 0;
  const time = parseInt(localStorage.getItem("totaltime")) || 0;
  const attempts = ((correct + wg) / 10) * 100;
  const scores = correct * 10;
  useEffect(() => {
    const find = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          scoreupdation(user.uid);
          console.log("user uid", user.uid);
        }
      });
    };
    return () => find();
  }, [find]);
  useEffect(() => {
    const timer = setTimeout(() => {
      resetScores(); // This should update right & wrong in the parent component
    }, 1000);

    return () => clearTimeout(timer); // Cleanup timer
  }, []);
  const scoreupdation = async (userId) => {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("uid", "==", userId));
      const scoreRef = collection(db, "scores");
      const p = query(scoreRef, where("uid", "==", userId));
      const snapshotscore = await getDocs(p);
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const userDoc = snapshot.docs[0];
        const userDocRef = doc(db, "users", userDoc.id);
        const prev = userDoc.data();
        console.log("userdata =>", prev);
        await updateDoc(userDocRef, {
          score: prev.score + scores,
          totalattempt: prev.totalattempt + 1,
        });
      }
      if (!snapshotscore.empty) {
        console.log("userdata score=>", snapshotscore.docs[0]);
        const scoreDoc = snapshotscore.docs[0];
        const scoreDocRef = doc(db, "scores", scoreDoc.id);
        console.log("scoredata", scoreDoc.data());
        await updateDoc(scoreDocRef, {
          score: arrayUnion({
            score: scores,
            time: time,
            timestamp: new Date().toISOString(),
          }),
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div id="Score" className=" h-screen">
        <div className="h-[40%] bg-primary w-full relative overflow-hidden rounded-b-[3rem] px-24 py-12">
          <div className="absolute bg-secondary rounded-full h-32 w-32 -top-12 left-24" />
          <div className="absolute bg-secondary rounded-full h-16 w-16 top-10 right-20" />
          <div className="absolute bg-secondary rounded-full h-32 w-32 top-20 -left-16" />
          <div className="absolute bg-secondary rounded-full h-32 w-32 top-28 -right-10" />
          <div className="relative -top-5 -left-16 ">
            {" "}
            <button onClick={() => navigate("/")}>
              {" "}
              <img src={arrow} alt="arrow" />
            </button>
          </div>
          <div className=" bg-white/30  h-40 w-40  lg:ml-[35rem] flex justify-center items-center rounded-full ">
            {" "}
            <div className=" bg-white rounded-full  h-32 w-32  flex flex-col justify-center items-center">
              <h1 className="text-primary text-xl font-semibold">
                Your Score{" "}
              </h1>
              <div className="flex justify-center items-center">
                {" "}
                <h1 className="text-primary font-bold text-3xl">{scores}</h1>
                <h1 className="relative text-xl font-semibold text-primary top-2">
                  pt
                </h1>{" "}
              </div>
            </div>
          </div>
        </div>

        <div className=" relative grid grid-cols-2 grid-rows-2 gap-4 bg-white  p-2 pl-10 py-5 rounded-3xl -top-16 left-5 lg:left-[35rem] w-[22rem] shadow-2xl">
          <div className="flex flex-col ">
            <div className="flex items-center gap-2">
              <div className="bg-primary h-3 w-3 rounded-full"></div>
              <span className="text-primary text-2xl ">{attempts}%</span>
            </div>
            <span className="text-lg pl-4">Completion</span>
          </div>
          <div className="flex flex-col ">
            <div className="flex items-center gap-2">
              <div className="bg-primary h-3 w-3 rounded-full"></div>
              <span className="text-primary text-2xl">10</span>
            </div>
            <span className="text-lg pl-4">Total Question</span>
          </div>
          <div className="flex flex-col ">
            <div className="flex items-center gap-2">
              <div className="bg-[#1F8435] h-3 w-3 rounded-full"></div>
              <span className=" text-[#1F8435] text-2xl">{correct}</span>
            </div>
            <span className="text-lg pl-4">Correct</span>
          </div>
          <div className="flex flex-col ">
            <div className="flex items-center gap-2">
              <div className="bg-[#FA3939] h-3 w-3 rounded-full"></div>
              <span className="text-[#FA3939] text-2xl">{wg}</span>
            </div>
            <span className="text-lg pl-4">Wrong</span>
          </div>
        </div>
        <div className="  grid grid-cols-3 grid-rows-2 gap-3  p-4 py-6 justify-center items-center h-fit">
          <div className="flex flex-col justify-center  items-center pb-5">
            {" "}
            <div className=" text-white bg-secondary h-14 w-14 rounded-full  flex justify-center items-center  ">
              <button onClick={() => navigate("/test")}>
                {" "}
                <MdOutlineReplay className="text-4xl cursor-pointer " />
              </button>
            </div>
            <div className="pt-2 ">Play Again</div>
          </div>
          <div className="flex flex-col justify-center  items-center pb-5">
            {" "}
            <div className="text-white bg-primary h-14 w-14 rounded-full  flex justify-center items-center ">
              <FaEye className="text-3xl cursor-pointer" />
            </div>
            <div className="pt-2">Review Answer</div>
          </div>
          <div className="flex flex-col justify-center  items-center pb-5 ">
            {" "}
            <div className="text-white bg-primary h-14 w-14 rounded-full  flex justify-center items-center">
              <FaShareAlt className="text-3xl cursor-pointer" />{" "}
            </div>
            <div className="pt-2">Share Score</div>
          </div>
          <div className="flex flex-col justify-center  items-center pt-5 ">
            <div className="text-white bg-primary h-14 w-14 rounded-full  flex justify-center items-center">
              <FaFilePdf className="text-2xl cursor-pointer" />
            </div>
            <div className="pt-2">Genrate Pdf</div>
          </div>
          <div className="flex flex-col justify-center  items-center pt-5 ">
            <div className="text-white bg-primary h-14 w-14 rounded-full  flex justify-center items-center">
              <button onClick={() => navigate("/")}>
                <FaHome className="text-3xl cursor-pointer" />
              </button>
            </div>{" "}
            <div className="pt-2">Home</div>
          </div>
          <div className="flex flex-col justify-center  items-center pt-5 ">
            <div className="bg-primary h-14 w-14 rounded-full flex justify-center items-center">
              <button onClick={() => navigate("/leaderboard")}>
                {" "}
                <img
                  className="h-7 w-7 cursor-pointer "
                  src={leaderboard}
                  alt=""
                />
              </button>
            </div>
            <div className="pt-2"> Leaderboard</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Score;
