import React from "react";
import { connect } from "react-redux";
import { REMOVE_CHAR, PUSH_INDEX, REMOVE_DISABLED } from "../actions/actions";
import "../styles/answer.css";

function Answer({ answer, userAnswer, dispatch, hints }) {
  // console.log(answer);
  return (
    <div className="answer">
      {Array.from(answer).map((e, i) => {
        return (
          <SingleChar
            i={i}
            key={i}
            userAnswer={userAnswer}
            dispatch={dispatch}
            hints={hints}
          />
        );
      })}
    </div>
  );
}

function SingleChar({ i, userAnswer, dispatch, hints }) {
  const removeChar = () => {
    if (hints.includes(i) || !userAnswer[i].text) {
      return;
    }
    dispatch({ type: REMOVE_CHAR, payload: i });
    dispatch({ type: PUSH_INDEX, payload: i });
    dispatch({ type: REMOVE_DISABLED, payload: userAnswer[i].origIndex });
  };

  return (
    <p
      className={`answer-char ${hints.includes(i) && "hint"}`}
      onClick={() => removeChar()}
    >
      {userAnswer[i]?.text}
    </p>
  );
}

export default connect((state) => state)(Answer);
