import React from "react";

const Button = ({buttonText, handleClick}) => {
  return (
    <button class="btn-53" onClick={handleClick}>
      <div class="original">{buttonText}</div>
      <div class="letters">
        {buttonText.split('')?.map((word, idx)=><span key={idx}>{word === ' ' ? '\u00A0' : word}</span>)}
      </div>
    </button>
  );
};

export default Button;
