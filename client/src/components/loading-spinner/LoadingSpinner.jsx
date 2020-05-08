import React from "react";
import "./LoadingSpinner.scss";

export const LoadingSpinner = ({ asOverlay }) => {
  return (
    <div className={`${asOverlay && "loading-spinner-overlay"}`}>
      <div className="lds-dual-ring"></div>
    </div>
  );
};
