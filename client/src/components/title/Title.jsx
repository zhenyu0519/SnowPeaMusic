import React from "react";
import "./Title.scss";

export const Title = ({ title, h4 }) => {
  return h4 ? (
    <h4 className="title">{title}</h4>
  ) : (
    <h3 className="title">{title}</h3>
  );
};
