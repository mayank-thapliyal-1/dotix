import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../backend/firebase";
import badge1 from "../assets/badge1.svg";
import badge2 from "../assets/badge2.svg";
import badge3 from "../assets/badge3.svg";
import profilepic from "../assets/profile.png";
import arrow from "../assets/arrow.png";
import { useUSerStore } from "../backend/useUSerstore";

const Leaderboard = () => {
  const currentUser = useUSerStore((state) => state.currentUser);
  const fetchUser = useUSerStore((state) => state.fetchUser);
  const [accuracy,setAccuracy] = useState(-1);
  if(currentUser!=null && accuracy==-1){
const val = currentUser.totalattempt > 0
      ? Math.round(
          (currentUser.score / 10 / (currentUser.totalattempt * 10)) * 100
        )
      : 0;
      setAccuracy(val)
  }
  useEffect(() => {
    fetchUser();
  }, []);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    const learderdata = async () => {
      try {
        const snapshot = await getDocs(collection(db, "users"));
        const userdata = snapshot.docs.map((doc) => {
          const dataset = doc.data();
          return {
            name: dataset.username || unKnown,
            photo: dataset.photoUrl,
            score: dataset.score,
            totalattempt: dataset.totalattempt || 1,
            accuracy:
              dataset.totalattempt > 0
                ? Math.round(
                    (dataset.score / 10 / (dataset.totalattempt * 10)) * 100
                  )
                : 0,
            average:
              dataset.totalattempt > 0
                ? Math.round(dataset.score / dataset.totalattempt)
                : 0,
          };
        });
        userdata.sort((a, b) => b.average - a.average);
        setData(userdata);
      } catch (error) {
        console.log("this is the error" + error);
      }
    };
    learderdata();
  }, []);
  if (currentUser === null || data.length === 0) {
    return <div>loading</div>;
  }
  return (
    <div className="h-screen bg-primary font-poppins">
      <div className="h-[37%] flex flex-col justify-between bg-primary w-full relative overflow-hidden  px-8 pt-8">
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
        <div className="flex relative bottom-5 flex-row justify-center sm:gap-4  p-5">
          <div className="relative bottom-9 group flex gap-2 justify-center items-center flex-col mt-2 sm:px-5 h-full w-full sm:w-max duration-500 ">
            <img
              src={badge2}
              className="relative sm:left-9 sm:top-9 left-7 top-7 rotate-[-10deg]  h-6 w-6 sm:h-8 sm:w-8 group-hover:scale-105 z-50"
              alt="rank2"
            />
            <img
              src={data[1].photo}
              alt="second-rank pic"
              className="  border-2 border-secondary/50 rounded-full h-20 w-20 sm:h-28 sm:w-28 shadow-lg shadow-black group-hover:scale-105 cursor-pointer"
            />
            <h1 className="text-white">{data[1].name}</h1>
          </div>
          <div className=" relative bottom-16 flex gap-2 justify-center items-center flex-col mt-2 sm:px-5 h-full w-full sm:w-max  duration-500 group ">
            <img
              src={badge1}
              className="relative left-10 top-10 sm:left-11 sm:top-11 rotate-[-10deg] filter drop-shadow-2xl h-8 w-8 sm:h-12 sm:w-12  group-hover:scale-105 z-50"
              alt="rank1"
            />
            <img
              src={data[0].photo}
              alt="first-postion pic"
              className="  border-2 border-secondary/50 rounded-full h-24 w-24  sm:h-36 sm:w-36 shadow-xl shadow-black group-hover:scale-105 cursor-pointer"
            />
            <h1 className="text-white">{data[0].name}</h1>
          </div>
          <div className="relative bottom-7 flex gap-2 justify-center items-center flex-col mt-2 sm:px-5 h-full w-full sm:w-max duration-500 group">
            <img
              src={badge3}
              className="relative left-7 top-7 sm:left-8 sm:top-8 rotate-[-10deg] h-5 w-5 sm:h-7 sm:w-7 group-hover:scale-105 z-50"
              alt=""
            />
            <img
              src={data[2].photo}
              alt=""
              className="  border-2 border-secondary/50 rounded-full h-16 w-16 sm:h-24 sm:w-24 shadow-md shadow-black group-hover:scale-105"
            />
            <h1 className="text-white">{data[2].name}</h1>
          </div>
        </div>
      </div>
      <div className="z-10 w-[100%] h-[56%] overflow-x-auto flex flex-col  gap-2 rounded-xl overflow-hidden bg-secondary ">
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-x-1 sm:gap-x-5 pr-7 py-2 sm:py-5  items-center   px-4 ">
          <h1 className="text-center">Rank</h1>
          <h1 className="text-center">Username</h1>
          <h1 className="hidden sm:block text-center">Accuracy</h1>
          <h1 className="text-center">Plays</h1>
          <h1 className="text-center">Points</h1>
        </div>
        <div className="h-[73%] overflow-scroll border border-white/60">
        {data.map((d, i) => (
          <div
            key={i}
            className="grid grid-cols-4 sm:grid-cols-5 gap-x-1 sm:gap-x-5 gap-y-0 pr-2 sm:pr-7 py-[10px]   items-center border-t-[1px]   border-b-[1px] border-white/60  sm:px-5  overflow-hidden hover:shadow-sm hover:shadow-black cursor-pointer "
          >
            <p className=" font-light text-center">{i + 1}</p>
            <div className="flex gap-2 items-center justify-center">
              <img className=" h-14 w-14 rounded-full" src={d.photo} />
              <h1> {currentUser.username === d.name ? `You` : d.name}</h1>
            </div>
            <p className="hidden sm:block text-center">{d.accuracy}%</p>
            <p className="text-center">{d.totalattempt}</p>
            <p className="bg-primary/60 px-3 py-1 rounded-2xl text-center">
              {d.average}pt
            </p>
          </div>
        ))}
</div>
        <div className=" grid grid-cols-5 items-center gap-5 px-5  pr-7 py-4 border fixed bottom-1 border-t-2 w-full rounded-xl bg-secondary z-50 shadow-lg shadow-black hover:scale-[1.001]">
          <p className="font-light text-center">
            {data.findIndex((user) => user.name === currentUser.username) + 1}
          </p>
          <div className="flex items-center justify-center gap-2">
            <img
              className="h-14 w-14 rounded-full"
              src={currentUser.photoUrl}
              alt="user profile pic"
            />
            You
          </div>
          <p className="text-center">{accuracy}</p>
          <p className="text-center">{currentUser.totalattempt}</p>
          <p className="bg-primary/60 px-3 py-1 rounded-2xl text-center ">
            {" "}
            {currentUser.score / currentUser.totalattempt}pt
          </p>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
