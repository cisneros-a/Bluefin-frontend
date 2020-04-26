const landlordPropertiesReducer = (
  state = { state: { unleasedProperties: [], leasedProperties: [] } },
  action
) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "POPULATE_LANDLORD_PROPERTIES":
      return { state: action.payload };
    case "LOGOUT_USER":
      return { state: { unleasedProperties: [], leasedProperties: [] } };
    default:
      return state;
  }
};

export default landlordPropertiesReducer;
