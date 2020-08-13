import React from 'react';

import InputWithLabel from '../input-with-label';

const SearchForm = ({
  searchTerm,
  handleSearchSubmit,
  handleSearchInput,
}) => (
  <form onSubmit={handleSearchSubmit}>
    <InputWithLabel
      id="search"
      value={searchTerm}
      isFocused
      onInputChange={handleSearchInput}
    >
      <strong>Search: </strong>
    </InputWithLabel>

    <button
      type="button"
      disabled={!searchTerm}
    >
      Submit
    </button>
  </form>
);

export default SearchForm;
