import React from "react";
import profilePic from "../assets/profile.png";
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

const Home = ({ setQuizApi, setScreen }) => {
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
    <div id="Home" className="h-screen">
      <div className="h-[40%] bg-primary w-full relative overflow-hidden rounded-b-[3rem] p-6">
        <div className="absolute bg-secondary rounded-full h-32 w-32 -top-12 left-24" />
        <div className="absolute bg-secondary rounded-full h-16 w-16 top-10 right-20" />
        <div className="absolute bg-secondary rounded-full h-32 w-32 top-20 -left-16" />
        <div className="absolute bg-secondary rounded-full h-32 w-32 top-28 -right-10" />
        <div className="z-[10] relative flex flex-col justify-between h-full">
         ` {/* <div className="flex justify-between text-white items-center">
            <span className="text-2xl font-medium">Hello Kirat</span>
            <div className="w-14 h-14 p-[3px] bg-white rounded-full">
              <img src={profilePic} alt="profile pic" />
            </div>
          </div>` */}
          <div className="flex flex-col gap-6">
            <span className="text-gray-700 font-semibold ">Popular</span>
            <div className="grid grid-cols-3 gap-3">
              <div
                onClick={() => {
                  setScreen("test");
                  setQuizApi(
                    "https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple"
                  );
                }}
                className="w-full sm:p-6 p-3 bg-white flex flex-col gap-3 rounded-2xl"
              >
                <span>Space</span>
                <span className=" h-14  flex justify-center">
                  <img src={shuttle} className="h-11  sm:h-16  " alt="" />
                </span>
              </div>
              <div
                onClick={() => {
                  setScreen("test");
                  setQuizApi(
                    "https://opentdb.com/api.php?amount=10&category=23&difficulty=easy&type=multiple"
                  );
                }}
                className="w-full p-3 sm:p-6 bg-white flex flex-col gap-3 rounded-2xl"
              >
                <span>History</span>
                <span className="sm:h-14 h-11  flex justify-center">
                  <img src={pillar} className="h-16" alt="" />
                </span>
              </div>
              <div
                onClick={() => {
                  setScreen("test");
                  setQuizApi(
                    "https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple"
                  );
                }}
                className="w-full p-4 sm:p-6 bg-white flex flex-col gap-3 rounded-2xl"
              >
                <span>Sport</span>
                <span className="h-14 flex justify-center">
                  <img src={basketball} className="h-11 sm:h-16" alt="" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
      <div>
        <div className="flex justify-between p-6">
          <div className=" font-bold text-lg">Explore</div>
          <div>view all</div>
        </div>
        <div className="grid grid-cols-3 grid-rows-3 gap-2 px-8">
          {object.map((ob,item) => (
            <div
            key={item}
              onClick={() => {
                setScreen("test");
                setQuizApi(ob.api);
              }}
              className=" cursor-pointer w-full sm:p-6 p-3 flex flex-col items-center justify-center gap-3 rounded-2xl border-solid border-2 border-secondary"
            >
              <span className=" text-gray-700 font-semibold" >{ob.topic}</span>
              <span className=" h-14  flex justify-center">
              <img className=" h-11 sm:h-16" src={ob.icon} alt="profile pic" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
