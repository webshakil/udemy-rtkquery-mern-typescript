
import React from "react";

interface ButtonProps {
  text: string;
  bgColor: string;
  textColor: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, bgColor, textColor, onClick }) => {
  return (
    <button
      className={`px-4 py-2 ${bgColor} ${textColor} rounded-md`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;

