const getAsyncStories = (dataStories) => (
  new Promise((resolve, reject) => setTimeout(reject, 2000))
  // new Promise((resolve) => (
  //   setTimeout(
  //     () => resolve({ data: { stories: dataStories } }),
  //     2000
  //   )
  // ))
);

export default getAsyncStories;
