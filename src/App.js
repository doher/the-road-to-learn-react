import React, { useState, useEffect } from 'react';

import InputWithLabel from './components/input-with-label';
import List from './components/list';

import stories from './data/stories';

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = useState(
    localStorage.getItem(key) || initialState
  );

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
}

const App = () => {
  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    'search',
    'React'
  );

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter((story) => (
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  ));

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <InputWithLabel
        id="search"
        label="Search: "
        value={searchTerm}
        onInputChange={handleSearch}
      />

      <hr />

      <List list={searchedStories} />
    </div>
  );
};

export default App;
