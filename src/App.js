import React, {
  useEffect,
  useReducer,
  useCallback,
  useState
} from 'react';

import List from './components/list';
import SearchForm from './components/search-form'

import dataFetching from './services/dataFetching';
import storiesReducer from './reducers/stories-reducer';
import useSemiPersistentState from './hooks/use-semi-persistent-state';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const App = () => {
  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    'search',
    'React'
  );

  const [url, setUrl] = useState(
    `${API_ENDPOINT}${searchTerm}`
  );

  const [stories, dispatchStories] = useReducer(
    storiesReducer,
    { data: [], isLoading: false, isError: false }
  );

  const handleFetchStories = useCallback(async () => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    try {
      const result = await dataFetching(url);

      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: result.hits,
      });
    } catch {
      dispatchStories({ type: 'STORIES_FETCH_FAILURE' });
    }
  }, [url]);

  useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleRemoveStory = (item) => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  };

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    setUrl(`${API_ENDPOINT}${searchTerm}`);
  };

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <SearchForm
        searchTerm={searchTerm}
        handleSearchSubmit={handleSearchSubmit}
        handleSearchInput={handleSearchInput}
      />

      <hr />

      {stories.isError && <p>Something went wrong</p>}

      {stories.isLoading
        ? <p>Loading ...</p>
        : (
          <List
            list={stories.data}
            onRemoveItem={handleRemoveStory}
          />
        )
      }

    </div>
  );
};

export default App;
