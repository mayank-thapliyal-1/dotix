import Home from "./components/Home";
import Test from "./components/Test";
import Score from "./components/Score";
import Leaderboard from "./components/Leaderboard";
import { useEffect, useState } from "react";
import SignIn from "./components/SignIn";
import Profile from "./components/ProfileSection/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile1 from "./components/ProfileSection/Profile1";
import EditProfile from "./components/ProfileSection/EditProfile";
import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
const App = ({}) => {
  const [quizData, setQuizData] = useState([]);
  const [quizOptions, setQuizOptions] = useState([]);
  const [quizApi, setQuizApi] = useState("");
  const [right, setRight] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [username, setUsername] = useState("");
  const [data, setData] = useState([]);
  const [image, setImage] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [email, setEmail] = useState("");
  const [userDocId, setUserDocId] = useState("");
  const [error, setError] = useState("");
  const [totaltime,setTotaltime] =useState(0);
  const resetScores = () => {
    setRight(0);
    setWrong(0);
  };
    useEffect(() => {
    const fetchUserData = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const q = query(
              collection(db, "users"),
              where("uid", "==", user.uid)
            );
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
              const userDoc = querySnapshot.docs[0];
              const Data = userDoc.data();
              setUserDocId(userDoc.id); // <-- store document ID
              setEmail(Data.email);
              setUsername(Data.username);
              setPhotoUrl(Data.photoUrl);
              if (Data.data) {
                setData(Data.data);
              }
            }
          } catch (err) {
            console.error("Error fetching user from Firestore:", err);
          }
        }
      });
    };
    fetchUserData();
  }, []);
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);
  
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
        <Route
          path="/edit-profile"
          element={
            <EditProfile
              username={username}
              data={data}
              setData={setData}
              image={image}
              setImage={setImage}
              photoUrl={photoUrl}
              setPhotoUrl={setPhotoUrl}
              userDocId={userDocId}
            />
          }
        />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/profile1"
          element={
            <Profile1
              username={username}
              data={data}
              setData={setData}
              image={image}
              setImage={setImage}
              photoUrl={photoUrl}
              setPhotoUrl={setPhotoUrl}
              email={email}
              userDocId={userDocId}
              error={error}
            />
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Home setQuizApi={setQuizApi} />} />
        <Route
          path="/test"
          element={
            <Test
              quizData={quizData}
              quizOptions={quizOptions}
              setRight={setRight}
              setWrong={setWrong}
              right={right}
              wrong={wrong}
            />
          }
        />
        <Route
          path="/score"
          element={
            <Score resetScores={resetScores} email={email} />
          }
        />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
};

export default App;
