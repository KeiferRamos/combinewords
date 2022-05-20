import React, { useEffect, useState } from "react";
import { FaLightbulb, FaRedoAlt } from "react-icons/fa";
import "../styles/helper.css";
import { connect } from "react-redux";
import { getRandomHint } from "../helper/utils";
import {
  ADD_CHAR,
  ADD_HINT,
  ADD_HINT_CHAR,
  PUSH_INDEX,
  REMOVE_CHAR,
  REMOVE_DISABLED,
  SET_CORRECT_INDEX,
  SET_DISABLED,
} from "../actions/actions";
import { FcLike } from "react-icons/fc";

function Helper({
  answerIndex,
  dispatch,
  hints,
  userCoins,
  answer,
  correctIndex,
  userAnswer,
}) {
  const getHint = () => {
    if (userCoins >= 50) {
      let hint = getRandomHint(answerIndex);
      if (answerIndex.length > 1) {
        while (hints.includes(answerIndex[hint])) {
          hint = getRandomHint(answerIndex);
        }
        dispatch({ type: ADD_HINT, payload: answerIndex[hint] });
      } else if (answerIndex.length == 1) {
        dispatch({ type: ADD_HINT, payload: answerIndex[0] });
      } else if (answerIndex.length == 0) {
        hint = getRandomHint(answer);
        while (hints.includes(hint) || userAnswer[hint].text == answer[hint]) {
          hint = getRandomHint(answer);
        }
        dispatch({
          type: REMOVE_DISABLED,
          payload: userAnswer[hint].origIndex,
        });
        dispatch({ type: ADD_HINT, payload: hint });
      } else {
        return;
      }
    }
  };

  const refresh = () => {
    for (var i = 0; i < userAnswer.length; i++) {
      if (!hints.includes(i)) {
        dispatch({
          type: REMOVE_DISABLED,
          payload: userAnswer[i].origIndex,
        });
        dispatch({ type: REMOVE_CHAR, payload: i });
        dispatch({ type: PUSH_INDEX, payload: i });
      }
    }
  };

  useEffect(() => {
    if (hints.length > 0) {
      const last = hints[hints.length - 1];
      const answerChar = answer.charAt(last);
      let origIndex;
      for (var i = 0; i < correctIndex.length; i++) {
        if (answerChar == correctIndex[i].char) {
          origIndex = correctIndex[i].index;
          for (var i = 0; i < userAnswer.length; i++) {
            if (userAnswer[i].origIndex == origIndex) {
              dispatch({ type: REMOVE_CHAR, payload: i });
              dispatch({ type: PUSH_INDEX, payload: i });
            }
          }
          dispatch({ type: SET_DISABLED, payload: origIndex });
          dispatch({
            type: SET_CORRECT_INDEX,
            payload: origIndex,
          });
          break;
        }
      }
      dispatch({
        type: ADD_CHAR,
        payload: [{ text: answerChar, origIndex: origIndex }, last],
      });
      dispatch({ type: ADD_HINT_CHAR, payload: last });
    }
  }, [hints]);

  return (
    <div className="helper">
      <div>
        <FcLike />
        <p>{userCoins}</p>
      </div>
      <div onClick={() => getHint()}>
        <FaLightbulb />
      </div>
      <div onClick={() => refresh()}>
        <FaRedoAlt />
      </div>
    </div>
  );
}

export default connect((state) => state)(Helper);
