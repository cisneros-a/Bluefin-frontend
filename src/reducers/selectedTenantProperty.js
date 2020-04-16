const selectedTenantPropertyReducer = (state = null, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "SELECT_TENANT_PROPERTY":
      return { state: action.payload };
    default:
      return state;
  }
};

export default selectedTenantPropertyReducer;
