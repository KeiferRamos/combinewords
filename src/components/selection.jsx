import { connect } from "react-redux";
import { useEffect, useState, useRef } from "react";
import {
  ADD_CHAR,
  SET_CORRECT,
  SET_DISABLED,
  SHIFT_INDEX,
} from "../actions/actions";
import "../styles/selection.css";

function Selection({
  answer,
  answerContainer,
  dispatch,
  answerIndex,
  disabledBtn,
}) {
  useEffect(() => {
    const correctIndex = [];
    answerContainer.forEach((e, i) => {
      if (answer.includes(e)) {
        correctIndex.push({ index: i, char: e });
      }
    });
    dispatch({ type: SET_CORRECT, payload: correctIndex });
  }, [answerContainer]);

  return (
    <div className="selection">
      {answerContainer.map((ans, i) => (
        <SingleChar
          ans={ans}
          i={i}
          key={i}
          dispatch={dispatch}
          index={answerIndex}
          disabled={disabledBtn}
        />
      ))}
    </div>
  );
}

function SingleChar({ i, ans, dispatch, index, disabled }) {
  const textRef = useRef(null);

  const fillAnswer = () => {
    if (index.length > 0) {
      const text = textRef.current.textContent.toUpperCase();
      if (!disabled.includes(i)) {
        dispatch({
          type: ADD_CHAR,
          payload: [{ text, origIndex: i }, index[0]],
        });
        dispatch({ type: SHIFT_INDEX });
        dispatch({ type: SET_DISABLED, payload: i });
      }
    }
  };

  return (
    <p
      ref={textRef}
      className={`${disabled.includes(i) ? "disabled" : "enabled"}`}
      onClick={() => fillAnswer()}
    >
      {ans}
    </p>
  );
}

export default connect((state) => state)(Selection);
