import Home from "./components/Home";
import Test from "./components/Test";
import Score from "./components/Score";
import Leaderboard from "./components/Leaderboard";
import { useEffect, useState } from "react";

const App = ({}) => {
  const [screen, setScreen] = useState("home");
  const [quizData, setQuizData] = useState([]);
  const [quizOptions, setQuizOptions] = useState([]);
  const [quizApi, setQuizApi] = useState("");
  const [right, setRight] = useState(0);
  const [wrong, setWrong] = useState(0);
  const resetScores = () => {
    setRight(0);
    setWrong(0);
  };
  const Fetchdata = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      const options = data.results.map((d) => {
        return [
          decodeURI(d.correct_answer),
          ...d.incorrect_answers.map((item) => decodeURI(item)),
        ]
          .map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value);
      });
      setQuizData(data.results);
      setQuizOptions(options);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    Fetchdata(quizApi);
  }, [quizApi]);

  return (
    <div className="">
      {screen === "home" && (
        <Home setQuizApi={setQuizApi} setScreen={setScreen} />
      )}
      {screen === "test" && (
        <Test
          quizData={quizData}
          quizOptions={quizOptions}
          setScreen={setScreen}
          setRight={setRight}
          setWrong={setWrong}
          right={right}
          wrong={wrong}
        />
      )}
      {screen === "score" && (
        <Score
          setScreen={setScreen}
          right={right}
          wrong={wrong}
          resetScores={resetScores}
        />
      )}
      {screen === "leaderboard" && <Leaderboard setScreen={setScreen} />}
    </div>
  );
};

export default App;
