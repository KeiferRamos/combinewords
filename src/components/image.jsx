import React from "react";
import { FaPlus } from "react-icons/fa";
import "../styles/image.css";

function Imagecont({ item: { images } }) {
  return (
    <div className="image-display">
      <img src={images[0]} alt="" />
      <FaPlus />
      <img src={images[1]} alt="" />
    </div>
  );
}

export default Imagecont;
