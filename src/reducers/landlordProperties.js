const landlordPropertiesReducer = (
  state = { state: { unleasedProperties: [], leasedProperties: [] } },
  action
) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "POPULATE_LANDLORD_PROPERTIES":
      return { state: action.payload };
    default:
      return state;
  }
};

export default landlordPropertiesReducer;
