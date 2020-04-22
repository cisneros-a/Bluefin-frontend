const fixesReducer = (state = { state: [] }, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "POPULATE_FIXES":
      return { state: action.payload };
    default:
      return state;
  }
};

export default fixesReducer;
