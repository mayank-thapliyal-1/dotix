import React from "react";
import profilePic from "../assets/profile.png";
import shuttle from "../assets/shuttle.png";
import basketball from "../assets/basketball.png";
import pillar from "../assets/pillar.png";

const Home = ({ setQuizApi, setScreen }) => {
  return (
    <div id="Home" className="h-screen">
      <div className="h-[40%] bg-primary w-full relative overflow-hidden rounded-b-[3rem] p-8">
        <div className="absolute bg-secondary rounded-full h-32 w-32 -top-12 left-24" />
        <div className="absolute bg-secondary rounded-full h-16 w-16 top-10 right-20" />
        <div className="absolute bg-secondary rounded-full h-32 w-32 top-20 -left-16" />
        <div className="absolute bg-secondary rounded-full h-32 w-32 top-28 -right-10" />
        <div className="z-[10] relative flex flex-col justify-between h-full">
          <div className="flex justify-between text-white items-center">
            <span className="text-2xl font-medium">Hello Kirat</span>
            <div className="w-14 h-14 p-[3px] bg-white rounded-full">
              <img src={profilePic} alt="profile pic" />
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <span className="text-white">Popular</span>
            <div className="grid grid-cols-3 gap-3">
              <div
                onClick={() => {
                  setScreen("test");
                  setQuizApi(
                    "https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple"
                  );
                }}
                className="w-full p-3 bg-white flex flex-col gap-3 rounded-2xl"
              >
                <span>Space</span>
                <span className=" h-14  flex justify-center">
                  <img src={shuttle} className="h-11 w-11 " alt="" />
                </span>
              </div>
              <div
                onClick={() => {
                  setScreen("test");
                  setQuizApi(
                    "https://opentdb.com/api.php?amount=10&category=23&difficulty=easy&type=multiple"
                  );
                }}
                className="w-full p-3 bg-white flex flex-col gap-3 rounded-2xl"
              >
                <span>History</span>
                <span className="h-14  flex justify-center">
                  <img src={pillar} className="h-11 w-11" alt="" />
                </span>
              </div>
              <div
                onClick={() => {
                  setScreen("test");
                  setQuizApi(
                    "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple"
                  );
                }}
                className="w-full p-3 bg-white flex flex-col gap-3 rounded-2xl"
              >
                <span>Sport</span>
                <span className="h-14 flex justify-center">
                  <img src={basketball} className="h-11 w-11" alt="" />
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
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
            <div
              key={d}
              className="w-full p-3 bg-white flex flex-col gap-3 rounded-2xl border border-[#FFAD00]"
            >
              <span>
                {d % 3 === 1 ? "Space" : d % 3 === 2 ? "History" : "Sport"}
              </span>
              <span className=" h-14  flex justify-center">
                <img
                  src={
                    d % 3 === 1 ? shuttle : d % 3 === 2 ? pillar : basketball
                  }
                  className=" h-11 w-11 "
                  alt=""
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
