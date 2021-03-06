const selectedLandlordPropertyReducer = (state = null, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "SELECT_LANDLORD_PROPERTY":
      return { state: action.payload };
    default:
      return state;
  }
};

export default selectedLandlordPropertyReducer;
