import React, { useState, useEffect, useRef } from "react";
import "./SearchBar.scss";
// redux
import { connect } from "react-redux";
// actions
import { getSearchItems } from "../../redux/search-for-items/searchItemsActions";
// reselect & selectors
import { createStructuredSelector } from "reselect";
import {
  selectSearchItemsList,
  selectSearchItemsIsLoading,
} from "../../redux/search-for-items/searchItemsSelectors";
const SearchBar = ({
  displayName,
  searchItemsList,
  searchItemsIsLoading,
  getSearchItems,
}) => {
  const [inputQuery, setInputQuery] = useState("");

  const InitRender = useRef(true);

  useEffect(() => {
    if (InitRender.current) {
      InitRender.current = false;
      return;
    }
    getSearchItems(inputQuery);
  }, [inputQuery, getSearchItems]);

  return (
    <input
      type="text"
      className="search-bar"
      placeholder={`Looking For More Music? ${displayName}`}
      onChange={(event) => setInputQuery(event.target.value)}
      value={inputQuery}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  searchItemsList: selectSearchItemsList,
  searchItemsIsLoading: selectSearchItemsIsLoading,
});

const mapDispatchToProps = (dispatch) => ({
  getSearchItems: (query) => dispatch(getSearchItems(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
