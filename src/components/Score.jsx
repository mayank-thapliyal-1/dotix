import { FaEye } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { MdOutlineReplay } from "react-icons/md";
import leaderboard from "../assets/leaderboard.png";
import arrow from "../assets/arrow.png";
import React, { useState,useEffect } from "react";

const Score = ({ setScreen,right,wrong,resetScores}) => {
  const [correct, setCorrect] = useState(right);
  const [wg,setWg] = useState(wrong);

  const attempts = ((correct + wg) / 10) * 100;
  const score = correct * 10;

  useEffect(() => {
    // Reset scores after 1 second
    const timer = setTimeout(() => {
      resetScores(); // This should update right & wrong in the parent component
    }, 1000);

    return () => clearTimeout(timer); // Cleanup timer
  }, []); 


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
            <button onClick={() => setScreen("home")}>
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
                <h1 className="text-primary font-bold text-3xl">{score}</h1>
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
              <button onClick={() => setScreen("test")}>
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
              <button onClick={() => setScreen("home")}>
                <FaHome className="text-3xl cursor-pointer" />
              </button>
            </div>{" "}
            <div className="pt-2">Home</div>
          </div>
          <div className="flex flex-col justify-center  items-center pt-5 ">
            <div className="bg-primary h-14 w-14 rounded-full flex justify-center items-center">
              <button onClick={() => setScreen("leaderboard")}>
                {" "}
                <img className="h-7 w-7 cursor-pointer " src={leaderboard} alt="" />
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
