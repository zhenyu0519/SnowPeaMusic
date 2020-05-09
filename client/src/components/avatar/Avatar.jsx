import React from "react";
import "./Avatar.scss";

export const Avatar = ({ imageUrl, alt }) => {
  return <img src={imageUrl} alt={alt} className="avatar" />;
};
