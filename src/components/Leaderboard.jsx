import React from "react";
import one from "../assets/01.png";
import two from "../assets/02.png";
import three from "../assets/03.png";
import arrow from "../assets/arrow.png";
import four from "../assets/04.png";
import five from "../assets/05.png";
import six from "../assets/06.png";
import seven from "../assets/07.png";
import eighteen from "../assets/18.png";
import { useNavigate } from "react-router-dom";

const Leaderboard = () => {
  const navigate = useNavigate();
  const data = [
    { image: four, name: "Moni", point: "233pt" },
    { image: five, name: "Esha", point: "160pt" },
    { image: six, name: "Kaosar", point: "140pt" },
    { image: seven, name: "Sam", point: "130pt" },
  ];
  return (
    <div className="h-screen">
      <div className="h-[51%] bg-primary w-full relative overflow-hidden rounded-b-[3rem] p-8">
        <div className="absolute bg-secondary rounded-full h-32 w-32 -top-12 left-24" />
        <div className="absolute bg-secondary rounded-full h-16 w-16 top-10 right-20" />
        <div className="absolute bg-secondary rounded-full h-32 w-32 top-20 -left-16" />
        <div className="absolute bg-secondary rounded-full h-32 w-32 top-28 -right-10" />
        <div>
          {" "}
          <button onClick={() => navigate("/score")}>
            {" "}
            <img src={arrow} alt="arrow" />
          </button>
        </div>
        <div className="flex flex-col gap-5 lg:gap-3">
          <div className="relative top-8 left-3 flex gap-5 text-white lg:justify-center lg:top-5">
            {" "}
            <span className="">
              <h1 className="text-3xl hover:font-bold ">Today</h1>
            </span>
            <span className="hover:font-bold">
              <h1 className="text-3xl">Month</h1>
            </span>
            <span className="hover:font-bold">
              <h1 className="text-3xl">All Times</h1>
            </span>
          </div>

          <div className="flex px-5 lg:justify-center  gap-16 z-0">
            <img className="h-14 w-14 mt-5" src={two} alt="" />
            <img className="h-14 w-14 mt-4" src={one} alt="" />
            <img className="h-14 w-14 mt-6" src={three} alt="" />
          </div>
          <div className="flex mb-3 gap-2 justify-center">
          <div className="flex flex-col items-center bg-[#D8A800] py-0 px-4 pb-8 -rotate-[25deg] ">
            <h1 className="text-[4rem] text-white font-extrabold py-0">2</h1>
            <p className="text-white ">442pt</p>
          </div>
          <div className="flex flex-col items-center bg-[#D8A800] pt-1 px-4 z-[1] h-[10rem]">
            <h1 className="text-[4rem] text-white font-extrabold">1</h1>
            <p className="text-white">443pt</p>
          </div>
          <div className="flex flex-col items-center bg-[#D8A800] px-4 py-1  rotate-[25deg]">
            <h1 className="text-[4rem] text-white font-extrabold">3</h1>
            <p className="text-white ]">433pt</p>
          </div>
          </div>
        </div>
      </div>
      <div className=" z-10 relative bottom-20  w-[100%] flex flex-col gap-2 rounded-[3rem] bg-white   ">
        {data.map((d, i) => (
          <div
            key={i}
            className="flex justify-between pr-7 py-2  items-center "
          >
            <div className="flex justify-between items-center px-7 gap-5 lg:gap-[25rem] p-2">
              <p className=" font-light">{i+4}</p>
              <img className=" h-14 w-14" src={d.image} alt="moni" />
              {d.name}
            </div>
            <p className="bg-primary/60 px-3 py-1 rounded-2xl">{d.point}</p>
          </div>
        ))}

        <div className="flex justify-between items-center  pr-7 py-4 border border-t-2 w-full ">
          <div className="flex justify-between items-center px-7 gap-5 lg:gap-[24rem] p-2">
            <p className="font-light">18</p>
            <img className="h-14 w-14" src={eighteen} alt="you" />
            you
          </div>
          <p className="bg-primary/60 px-3 py-1 rounded-2xl">120pt</p>
        </div>
      </div>{" "}
    </div>
  );
};

export default Leaderboard;
