import { connect } from "react-redux";
import { useEffect, useState } from "react";
import "./styles/app.css";
import {
  FILL_ANSWER_INDEX,
  FILL_SELECTION,
  FILL_USER_ANSWER,
  RESET,
} from "./actions/actions";
import { fillAnswer, fillIndex } from "./helper/utils";
import Next from "./components/next";
import Game from "./components/game";
import Imagecont from "./components/image";

function App({ data, level, dispatch, solved, answerbox }) {
  const [item, setItem] = useState(data[level]);
  const [hasSolved, setSolved] = useState(false);
  const [start, setStart] = useState(false);
  const [done, setDone] = useState(false);
  const answer = item.answer;

  useEffect(() => {
    dispatch({ type: FILL_USER_ANSWER, payload: fillAnswer(answer) });
    dispatch({ type: FILL_ANSWER_INDEX, payload: fillIndex(answer) });
    dispatch({ type: FILL_SELECTION, payload: answerbox(answer) });
  }, [item]);

  useEffect(() => {
    if (level < data.length) {
      setItem(data[level]);
    } else {
      setDone(true);
    }
  }, [level]);

  const hasbeenSolved = () => setSolved(true);
  const hasNotSolved = () => setSolved(false);

  const restart = () => {
    dispatch({ type: RESET });
    setDone(false);
    hasNotSolved();
  };

  return (
    <div className="App">
      {start ? (
        done ? (
          <div className="next-level">
            <div>
              <p>that's all</p>
              <p>thank you for playing</p>
              <button onClick={() => restart()}>play again</button>
            </div>
          </div>
        ) : (
          <Game
            item={item}
            hasSolved={hasSolved}
            hasNotSolved={hasNotSolved}
            hasbeenSolved={hasbeenSolved}
            done={done}
          />
        )
      ) : (
        <>
          <h1>COMBINE WORDS</h1>
          <Imagecont item={data[0]} />
          <button onClick={() => setStart(true)} className="start-btn">
            start game
          </button>
        </>
      )}
      {solved && <Next answer={answer} />}
    </div>
  );
}

export default connect((state) => state)(App);
