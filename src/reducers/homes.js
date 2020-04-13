const homeReducer = (state = { state: [] }, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "POPULATE_HOMES":
      return { state: action.payload };
    default:
      return state;
  }
};

export default homeReducer;
