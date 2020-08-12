import React, { useEffect, useReducer } from 'react';

import InputWithLabel from './components/input-with-label';
import List from './components/list';

// import getAsyncStories from './services/get-async-stories';
import storiesReducer from './reducers/stories-reducer';
import useSemiPersistentState from './hooks/use-semi-persistent-state';
// import initialStories from './data/stories';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const App = () => {
  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    'search',
    'React'
  );

  const [stories, dispatchStories] = useReducer(
    storiesReducer,
    { data: [], isLoading: false, isError: false }
  );

  useEffect(() => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    fetch(`${API_ENDPOINT}react`)
      .then((response) => (response.json()))
      .then((result) => {
        dispatchStories({
          type: 'STORIES_FETCH_SUCCESS',
          payload: result.hits,
        });
      })
      .catch(() => {
        dispatchStories({ type: 'STORIES_FETCH_FAILURE' });
      });
  }, []);

  const handleRemoveStory = (item) => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.data.filter((story) => (
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

      {stories.isError && <p>Something went wrong</p>}

      {stories.isLoading
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
