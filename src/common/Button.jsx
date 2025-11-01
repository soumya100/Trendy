import React from "react";

const Button = ({buttonText, handleClick}) => {
  return (
    <button className="btn-53" onClick={handleClick}>
      <div className="original">{buttonText}</div>
      <div className="letters">
        {buttonText.split('')?.map((word, idx)=><span key={idx}>{word === ' ' ? '\u00A0' : word}</span>)}
      </div>
    </button>
  );
};

export default Button;
