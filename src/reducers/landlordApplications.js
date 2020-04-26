const landlordApplicationReducer = (state = { state: [] }, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "POPULATE_LANDLORD_APPLICATIONS":
      return { state: action.payload };
    case "LOGOUT_USER":
      return { state: { state: [] }, action };
    default:
      return state;
  }
};

export default landlordApplicationReducer;
