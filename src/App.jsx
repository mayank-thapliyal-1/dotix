import Home from "./components/Home";
import Test from "./components/Test";
import Score from "./components/Score";
import Leaderboard from "./components/Leaderboard";
import { useEffect, useState } from "react";
import SignIn from "./components/SignIn";
import Profile from "./components/ProfileSection/Profile";
import { BrowserRouter as Router , Routes,Route} from "react-router-dom";
import Profile1 from "./components/ProfileSection/Profile1";
const App = ({}) => {
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
    <Router className="">
      <Routes>
        <Route path="/" element={<SignIn/>  }/>
        <Route path="/profile1" element={<Profile1 />  }/>
        <Route path="/profile" element={<Profile />  }/>
        <Route path="/home" element={ <Home setQuizApi={setQuizApi} /> }/>
        <Route path="/test" element={ <Test
          quizData={quizData}
          quizOptions={quizOptions}
          setRight={setRight}
          setWrong={setWrong}
          right={right}
          wrong={wrong}
        /> }/>
        <Route path="/score" element={<Score
          right={right}
          wrong={wrong}
          resetScores={resetScores}
        />}/>
        <Route path="/leaderboard" element={<Leaderboard/>}/>
      </Routes>
    </Router>
  );
};

export default App;
