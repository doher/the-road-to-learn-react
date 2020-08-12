const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const dataFetching = (path) => {
  return (
    fetch(`${API_ENDPOINT}${path}`)
      .then((response) => (response.json()))
  );
};

export default dataFetching;
