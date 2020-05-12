import React from "react";
import "./CollapsibleContent.scss";

export const CollapsibleContent = ({ imageUrl, name, total, descrption }) => {
  return (
    <div className="collapsible-content-container">
      <img src={imageUrl} alt={name} />
      <div className="card">
        <div>{name}</div>
        {total ? <div>{`${total} tracks `}</div> : <div>{descrption}</div>}
      </div>
    </div>
  );
};
