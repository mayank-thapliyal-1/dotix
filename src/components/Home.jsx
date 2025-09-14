import React, { useEffect, useState } from "react";
import shuttle from "../assets/icons/shuttle.svg";
import basketball from "../assets/icons/basketball.svg";
import pillar from "../assets/icons/pillar.svg";
import Music from "../assets/icons/music-player.svg";
import Books from "../assets/icons/book.svg";
import Boardsgame from "../assets/icons/dice.svg";
import Animal from "../assets/icons/animal.svg";
import Math from "../assets/icons/math.svg";
import Film from "../assets/icons/flim.svg";
import Mythology from "../assets/icons/mythology.svg";
import Vehicle from "../assets/icons/car.svg";
import Anime from "../assets/icons/cloud.svg";
import { HiMiniTrophy } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useUSerStore } from "../backend/useUSerstore";

const Home = ({ setQuizApi }) => {
  const navigate = useNavigate();
  const [attempt, setAttempt] = useState(0);
  const currentUser = useUSerStore((state) => state.currentUser);
  const fetchUser = useUSerStore((state) => state.fetchUser);
  useEffect(() => {
    fetchUser();
  }, []);
  // console.log(currentUser," username =>");
  // const userInfo = JSON.parse(localStorage.getItem("userInfo"));
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
    {
      api: "https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple",
      topic: "Space",
      icon: shuttle,
    },
    {
      api: "https://opentdb.com/api.php?amount=10&category=23&difficulty=easy&type=multiple",
      topic: "History",
      icon: pillar,
    },
    {
      api: "https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple",
      topic: "sport",
      icon: basketball,
    },
  ];
  if (!currentUser) {
    <div>loading...</div>;
  }
  return (
    <div id="Home" className="bg-primary pt-2 font-mono">
      <div className="h-[40%]  w-full relative overflow-auto  px-5 pb-3 ">
        <div className="z-[10] relative flex flex-col justify-between h-full">
          <nav className="flex justify-between text-white items-center py-2">
            {currentUser ? (
              <span className="text-2xl font-medium">
                Hello {currentUser.data[0].Firstname}
              </span>
            ) : (
              <span></span>
            )}

            <div className=" flex items-center justify-between gap-10 ">
              <HiMiniTrophy
                className=" h-14 w-14 rounded-full p-2 bg-[#dcd9d5]/50  text-yellow-500 hover:scale-105 hover:bg-[#dcd9d5]/60 cursor-pointer"
                onClick={() =>
                  currentUser == null
                    ? alert("sign in. first")
                    : navigate("/leaderboard")
                }
              />
              {currentUser ? (
                <img
                  src={currentUser.photoUrl}
                  alt="profile pic"
                  className=" object-cover cursor-pointer h-16 w-16 rounded-full "
                  onClick={() => navigate("/profile1")}
                />
              ) : (
                <h1
                  className="inline-flex items-center gap-2 text-xl rounded-2xl cursor-pointer backdrop-blur-xl shadow-secondary bg-secondary/30 border-[1px] hover:bg-secondary/70 hover:border-secondary/70 px-4 py-2 "
                  onClick={() => navigate("/signin")}
                >
                  Log In
                </h1>
              )}
            </div>
          </nav>
        </div>
      </div>
      <div></div>
      <div>
        <div className="bg-[#efece6] rounded-t-[2rem]">
          <h1 className=" pl-5 pt-2 ">Explore</h1>
          <div className="grid grid-cols-3 grid-rows-3 gap-3 sm:gap-6 px-8 pb-7  pt-5">
            {object.map((ob, item) => (
              <div
                key={item}
                onClick={() => {
                  setQuizApi(ob.api);
                  localStorage.setItem("attempt", false);
                  navigate("/test");
                }}
                className=" group cursor-pointer w-full  bg-white  sm:p-2 p-3 flex flex-col items-center justify-center gap-3 rounded-2xl border-solid border-2  hover:scale-101 hover:shadow-lg"
              >
                <span className=" text-gray-700 text-xs sm:text-lg font-thin ">
                  {ob.topic}
                </span>
                <span className=" h-max  flex justify-center">
                  <img
                    className=" h-15 sm:h-20 object-fill "
                    src={ob.icon}
                    alt="profile pic"
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
