const landlordApplicationReducer = (state = { state: [] }, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "POPULATE_LANDLORD_APPLICATIONS":
      console.log("hit Landlord app reducer");
      return { state: action.payload };

    default:
      return state;
  }
};

export default landlordApplicationReducer;
