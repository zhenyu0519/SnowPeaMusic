import React, { useState, useEffect, useRef } from "react";
import "./SearchBar.scss";
// redux
import { connect } from "react-redux";
// actions
import { getSearchItems } from "../../redux/search-for-items/searchItemsActions";
// reselect & selectors
import { createStructuredSelector } from "reselect";
import {
  selectSearchItemsTracks,
  selectSearchItemsIsLoading,
} from "../../redux/search-for-items/searchItemsSelectors";
// components
import { LoadingSpinner } from "../loading-spinner/LoadingSpinner";
import SearchResult from "../search-result/SearchResult";

const SearchBar = ({
  displayName,
  selectItemsTracks,
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
    if (inputQuery !== "") getSearchItems(inputQuery);
  }, [inputQuery, getSearchItems]);

  return (
    <div className="search-bar-container">
      <input
        type="text"
        className="search-bar"
        placeholder={`Looking For More Music? ${displayName}`}
        onChange={(e) => setInputQuery(e.target.value)}
        value={inputQuery}
        onFocus={(e) => (e.target.placeholder = "")}
        onBlur={(e) =>
          (e.target.placeholder = `Looking For More Music? ${displayName}`)
        }
      />
      {selectItemsTracks && inputQuery ? (
        <div className="search-results-container">
          {selectItemsTracks.map((track, index) => (
            <SearchResult
              key={index}
              trackName={track.name}
              artists={track.artists}
              imageUrl={track.album.images[2].url}
              contextUri={track.album.uri}
              setInput={setInputQuery}
            />
          ))}
        </div>
      ) : inputQuery ? (
        <LoadingSpinner />
      ) : null}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  selectItemsTracks: selectSearchItemsTracks,
  searchItemsIsLoading: selectSearchItemsIsLoading,
});

const mapDispatchToProps = (dispatch) => ({
  getSearchItems: (query) => dispatch(getSearchItems(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
