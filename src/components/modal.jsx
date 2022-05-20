import React from "react";

function Modal({ message }) {
  return (
    <div className="modal-message">
      <p>{message.text}</p>
      <button>ok</button>
    </div>
  );
}

export default Modal;
