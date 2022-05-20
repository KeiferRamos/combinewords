import React, { useState, useEffect } from "react";
import Helper from "./helper";
import Answer from "./answer";
import Imagecont from "./image";
import Selection from "./selection";
import Next from "./next";
import { NEXT_LEVEL } from "../actions/actions";
import { connect } from "react-redux";

function Game({
  item,
  userAnswer,
  dispatch,
  hasNotSolved,
  hasbeenSolved,
  hasSolved,
  done,
}) {
  const { answer } = item;

  useEffect(() => {
    const complete = userAnswer.every((item) => item.text);
    if (complete) {
      const useranswer = userAnswer.map((e) => e.text).join("");
      if (useranswer == answer) {
        hasbeenSolved();
      }
    }
  }, [userAnswer]);

  const startNextLevel = () => {
    dispatch({ type: NEXT_LEVEL });
    hasNotSolved();
  };

  return (
    <div>
      {hasSolved && !done ? (
        <Next startNextLevel={startNextLevel} {...item} />
      ) : (
        <>
          <Imagecont item={item} />
          <Helper answer={answer} />
          <Answer answer={answer} />
          <Selection answer={answer} />
        </>
      )}
    </div>
  );
}

export default connect((state) => state)(Game);
