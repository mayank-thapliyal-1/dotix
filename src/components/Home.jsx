import React from "react";
import shuttle from "../assets/shuttle.png";
import basketball from "../assets/basketball.png";
import pillar from "../assets/pillar.png";
import Music from "../assets/icons/music-player.png";
import Books from "../assets/icons/book.png";
import Boardsgame from "../assets/icons/dice.png";
import Animal from "../assets/icons/animal.png";
import Math from "../assets/icons/math.png";
import Film from "../assets/icons/film.png";
import Mythology from "../assets/icons/mythology.png";
import Vehicle from "../assets/icons/car.png";
import Anime from "../assets/icons/cloud.png";
import { HiMiniTrophy } from "react-icons/hi2";

import { useNavigate } from "react-router-dom";

const Home = ({ setQuizApi }) => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const object = [
    {
      api: "https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple",
      topic: "Music",
      icon: Music,
    },
    {
      api: "https://opentdb.com/api.php?amount=10&category=10&difficulty=medium&type=multiple",
      topic: "Books",
      icon: Books,
    },
    {
      api: "https://opentdb.com/api.php?amount=10&category=16&difficulty=medium&type=multiple",
      topic: "Board games",
      icon: Boardsgame,
    },
    {
      api: "https://opentdb.com/api.php?amount=10&category=27&difficulty=medium&type=multiple",
      topic: "Animals",
      icon: Animal,
    },
    {
      api: "https://opentdb.com/api.php?amount=10&category=19&difficulty=medium&type=multiple",
      topic: "MathMatics",
      icon: Math,
    },
    {
      api: "https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple",
      topic: "Films",
      icon: Film,
    },
    {
      api: "https://opentdb.com/api.php?amount=10&category=20&difficulty=medium&type=multiple",
      topic: "Mythology",
      icon: Mythology,
    },
    {
      api: "https://opentdb.com/api.php?amount=10&category=28&difficulty=medium&type=multiple",
      topic: "Vehicles",
      icon: Vehicle,
    },
    {
      api: "https://opentdb.com/api.php?amount=10&category=31&difficulty=medium&type=multiple",
      topic: "Anime",
      icon: Anime,
    },
  ];
  return (
    <div id="Home" className="">
      <div className="h-[40%] bg-primary w-full relative overflow-auto rounded-b-[2rem] px-5 pb-5 pt-2 ">
        <div className="absolute bg-secondary rounded-full h-32 w-32 -top-12 left-24 " />
        <div className="absolute bg-secondary rounded-full h-16 w-16 top-10 right-20" />
        <div className="absolute bg-secondary rounded-full h-32 w-32 top-20 -left-16" />
        <div className="absolute bg-secondary rounded-full h-32 w-32 top-28 -right-10" />
        <div className="z-[10] relative flex flex-col justify-between h-full">
          <nav className="flex justify-between text-white items-center">
            {userInfo ? (
              <span className="text-2xl font-medium">
                Hello {userInfo.displayName}
              </span>
            ) : (
              <span></span>
            )}

            <div className=" flex items-center justify-between gap-6 ">
              <HiMiniTrophy
                className=" h-14 w-14 rounded-full p-2 bg-orange-600 cursor-pointer text-secondary hover:scale-105 hover:bg-orange-700"
                onClick={() => navigate("/leaderboard")}
              />
              {userInfo ? (
                <img
                  src={userInfo.photoURL}
                  alt="profile pic"
                  className=" object-cover cursor-pointer h-16 w-16 rounded-full "
                  onClick={() => navigate("/profile1")}
                />
              ) : (
                <h1
                  className="cursor-pointer text-2xl border-white rounded-lg mt-2 border-2 p-1 px-3 mr-3 hover:bg-blue-400 hover:border-blue-400 hover:scale-105"
                  onClick={() => navigate("/signin")}
                >
                  Log In
                </h1>
              )}
            </div>
          </nav>
          <div className="flex flex-col gap-2">
            <span className="text-gray-700 font-semibold ">Popular</span>
            <div className="grid grid-cols-3 gap-3">
              <div
                onClick={() => {
                  setQuizApi(
                    "https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple"
                  );
                  navigate("/test");
                }}
                className="group w-full sm:p-6 p-3 bg-white flex flex-col gap-3 rounded-2xl hover:bg-blue-600 hover:shadow-xl"
              >
                <span className="group-hover:text-white group-hover:text-xl">
                  Space
                </span>
                <span className=" h-14  flex justify-center">
                  <img
                    src={shuttle}
                    className="h-16  p-2 object-cover"
                    alt="shuttle"
                  />
                </span>
              </div>
              <div
                onClick={() => {
                  setQuizApi(
                    "https://opentdb.com/api.php?amount=10&category=23&difficulty=easy&type=multiple"
                  );
                  navigate("/test");
                }}
                className="group w-full p-3 sm:p-6  bg-white hover:bg-blue-600 hover:shadow-xl  flex flex-col gap-3 rounded-2xl"
              >
                <span className="group-hover:text-white group-hover:text-xl">
                  History
                </span>
                <span className="  sm:h-14 h-11  flex justify-center">
                  <img src={pillar} className="h-16  p-2" alt="piller" />
                </span>
              </div>
              <div
                onClick={() => {
                  setQuizApi(
                    "https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple"
                  );
                  navigate("/test");
                }}
                className="group w-full p-4 sm:p-6 bg-white flex flex-col gap-3 rounded-2xl hover:bg-blue-600 hover:shadow-xl"
              >
                <span className="group-hover:text-white group-hover:text-xl">
                  Sport
                </span>
                <span className="h-14 flex justify-center">
                  <img src={basketball} className="h-16 p-2" alt="basketball" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
      <div>
        <div className="flex justify-between p-2 ">
          <h1 className=" font-bold text-lg">Explore</h1>
        </div>
        <div className="grid grid-cols-3 grid-rows-3 gap-6 px-8 pb-7">
          {object.map((ob, item) => (
            <div
              key={item}
              onClick={() => {
                setQuizApi(ob.api);
                navigate("/test");
              }}
              className=" group cursor-pointer w-full sm:p-6 p-3 flex flex-col items-center justify-center gap-3 rounded-2xl border-solid border-2 border-secondary hover:scale-105 hover:shadow-lg"
            >
              <span className=" text-gray-700 font-semibold ">{ob.topic}</span>
              <span className=" h-14  flex justify-center">
                <img
                  className=" h-11 sm:h-16 object-fill "
                  src={ob.icon}
                  alt="profile pic"
                />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
