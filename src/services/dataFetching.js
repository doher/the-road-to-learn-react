const dataFetching = (url) => {
  return (
    fetch(url)
      .then((response) => (response.json()))
  );
};

export default dataFetching;
