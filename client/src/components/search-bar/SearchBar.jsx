import React from "react";
import "./SearchBar.scss";

export const SearchBar = ({ displayName }) => {
  return (
    <input
      type="text"
      className="search-bar"
      placeholder={`Looking For More Music? ${displayName}`}
    />
  );
};
