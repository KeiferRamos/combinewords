import React from "react";
import "../styles/next.css";
import { connect } from "react-redux";
import { FcLike } from "react-icons/fc";
import { FaPlus } from "react-icons/fa";

function Next({ startNextLevel, images, answer }) {
  return (
    <div className="next-level">
      <div>
        <p>NICE</p>
        <div className="image-display">
          <img src={images[0]} alt="answer image 1" />
          <img src={images[1]} alt="answer image 2" />
        </div>
        <div className="correct-answer">
          {Array.from(answer).map((char, i) => {
            return <p key={i}>{char}</p>;
          })}
        </div>
        <div>
          <span>+ 25</span>
          <FcLike />
        </div>
        <button onClick={() => startNextLevel()}>next level</button>
      </div>
    </div>
  );
}

export default connect((state) => state)(Next);
