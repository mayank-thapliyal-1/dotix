import React, { useEffect, useState } from "react";
import Arrow from "../assets/arrow.png";
import _ from "underscore";
import { FaTimes, FaCheck } from "react-icons/fa";

const Test = ({ setScreen, quizData, quizOptions,setRight,setWrong,right,wrong }) => {
  const [time, setTime] = useState(25);
  const [questionCount, setQuestionCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState(-1);
  const nextQuestion = () => {
    setSelectedOption(-1);
    if (questionCount === 9) setScreen("score");
    setQuestionCount(questionCount + 1);
    setTime(25);
  };

  const timer = () => {
    setTime((previous) => previous - 1);
  };

  const optionClickHandler = (i, option) => {
    if (selectedOption === -1) {
      setSelectedOption(i);
      if (quizData[questionCount].correct_answer === option) {
        setRight(right + 1);
      } else setWrong(wrong + 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => timer(), 1000);
    if (time < 0) {
      setTime(25);
      if (questionCount === 9) {
        setScreen("score");
        return;
      }
      setQuestionCount(questionCount + 1);
      setSelectedOption(-1);
    }
    return () => clearInterval(interval);
  }, [time]);

  if (quizData.length === 0) {
    return <div className="flex justify-center items-center h-screen">
    <div className="w-10 h-10 border-t-8 border-secondary rounded-full flex justify-center items-center animate-spin">
      <div className="p-4 w-5 h-5 border-b-4 border-[#1E293B] rounded-full flex justify-center items-center">
        <div className=" p-2 w-3 h-2 border-t-4 border-[#F43F5E] rounded-full"></div>
      </div>
    </div>
  </div>;
  }

  return (
    <div id="Test" className=" h-screen">
      <div className="h-[30%] bg-primary w-full relative overflow-hidden rounded-b-[2rem] p-8">
        <div className="absolute bg-secondary rounded-full h-32 w-32 -top-12 left-24" />
        <div className="absolute bg-secondary rounded-full h-16 w-16 top-10 right-20" />
        <div className="absolute bg-secondary rounded-full h-32 w-32 top-20 -left-16" />
        <div className="absolute bg-secondary rounded-full h-32 w-32 top-28 -right-10" />
        <div className="z-[10] relative flex flex-col gap-48">
          <div>
            {" "}
            <div>
              <button onClick={() => setScreen("home")}>
                <img src={Arrow} alt="arrow" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="z-30 min-h-[13rem] absolute top-[17%] bg-white p-6 rounded-3xl text-center gap-3 flex flex-col shadow-md left-[9%]  md:left-[30%] lg:left-[25%] w-80 lg:w-1/2">
        <div className="flex justify-between py-0">
          <div className="w-20 items-center h-fit flex gap-2">
            <span className="text-[#1F8435] font-semibold">
              {right < 10 ? "0" + right : right}
            </span>
            <div className="w-12 rounded-full h-2">
              <div
                style={{ width: right * 10 + "%" }}
                className="bg-[#1F8435] rounded-full h-full duration-200"
              />
            </div>
          </div>
          <div className="relative shadow-lg h-24 w-24 -top-[4rem] bg-white rounded-full flex items-center justify-center ">
            <h1 className="text-secondary z-30 text-4xl font-medium">{time}</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              width="160px"
              height="160px"
              className="absolute"
            >
              <circle
                style={{
                  strokeDasharray: 450,
                  strokeDashoffset: 250 * (time / 25) + 200,
                }}
                className="fill-none stroke-primary stroke-[0.35rem] duration-300"
                cx="80"
                cy="80"
                r="40"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="w-20 h-fit flex justify-end items-center gap-2">
            <div className="w-12 rounded-full h-2 relative flex justify-end">
              <div
                style={{ width: wrong * 10 + "%" }}
                className="bg-[#D05A04] rounded-full h-full duration-200"
              />
            </div>
            <span className="text-[#D05A04] font-semibold">
              {wrong < 10 ? "0" + wrong : wrong}
            </span>
          </div>
        </div>
        <div className="sticky -mt-[3.5rem] h-[7rem] flex flex-col">
          <div className="text-primary text-lg">
            Qustion {questionCount + 1}/10
          </div>
          <div className="flex-grow flex items-center justify-center">
            <p className=" font-semibold">
              {_.unescape(quizData[questionCount]?.question)}
            </p>
          </div>
        </div>
      </div>
      <div className=" mt-32 min-h-[20rem] relative flex flex-col gap-5 items-center">
        {quizOptions[questionCount].map((option, i) => (
          <div
            onClick={() => optionClickHandler(i, option)}
            key={i}
            className=" border-2 border-primary rounded-2xl py-2 gap-2 items-center w-72 flex justify-between px-4"
          >
            <span className="flex-grow">{option}</span>
            <div>
              {selectedOption !== -1 ? (
                selectedOption === i ? (
                  quizData[questionCount].correct_answer === option ? (
                    <div className="bg-primary w-5 h-5 flex justify-center items-center rounded-full border border-primary">
                      <FaCheck className="text-white text-xs" />
                    </div>
                  ) : (
                    <div className="bg-rose-500 w-5 h-5 flex justify-center items-center rounded-full border border-rose-500">
                      <FaTimes className="text-white text-sm" />
                    </div>
                  )
                ) : quizData[questionCount].correct_answer === option ? (
                  <div className="bg-primary w-5 h-5 flex justify-center items-center rounded-full border border-primary">
                    <FaCheck className="text-white text-xs" />
                  </div>
                ) : (
                  <div className="bg-[#F5F5F5] w-5 h-5 rounded-full border border-primary" />
                )
              ) : (
                <div className="bg-[#F5F5F5] w-5 h-5 rounded-full border border-primary" />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="px-10 mt-5">
        <button
          className="bg-primary py-2 w-full lg:w-[15rem] lg:ml-[35rem] rounded-xl font-semibold "
          onClick={() => nextQuestion()}
        >
          {" "}
          {questionCount !== 10 ? "Next Question" : "Submit Test"}{" "}
        </button>
      </div>
    </div>
  );
};
export default Test;
