import React, { useState, useEffect } from 'react';

import InputWithLabel from './components/input-with-label';
import List from './components/list';

import getAsyncStories from './services/get-async-stories';
import useSemiPersistentState from './hooks/use-semi-persistent-state';
import initialStories from './data/stories';

const App = () => {
  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    'search',
    'React'
  );

  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getAsyncStories(initialStories)
      .then((res) => {
        setStories(res.data.stories);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
      });
  }, []);

  const handleRemoveStory = (item) => {
    const newStories = stories.filter((story) => (
      item.objectID !== story.objectID
    ));

    setStories(newStories);
  };

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
        value={searchTerm}
        isFocused
        onInputChange={handleSearch}
      >
        <strong>Search: </strong>
      </InputWithLabel>

      <hr />

      {isError && <p>Something went wrong</p>}

      {
        isLoading
          ? <p>Loading ...</p>
          : (
            <List
              list={searchedStories}
              onRemoveItem={handleRemoveStory}
            />
          )
      }

    </div>
  );
};

export default App;
