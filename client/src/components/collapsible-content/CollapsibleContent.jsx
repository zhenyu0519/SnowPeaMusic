import React from "react";
import "./CollapsibleContent.scss";

export const CollapsibleContent = ({ imageUrl, name, total }) => {
  return (
    <div className="collapsible-content-container">
      <img src={imageUrl} alt={name} />
      <div className="card">
        <div>{name}</div>
        <div>{`${total} tracks `}</div>
      </div>
    </div>
  );
};
