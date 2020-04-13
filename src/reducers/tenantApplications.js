const tenantApplicationReducer = (state = { state: [] }, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "POPULATE_TENANT_APPLICATIONS":
      return { state: action.payload };
    default:
      return state;
  }
};

export default tenantApplicationReducer;
