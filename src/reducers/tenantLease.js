const tenantLeaseReducer = (state =  [], action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case 'POPULATE_TENANT_LEASE':
            console.log('Hit reducer')
            return {state: action.payload}
        default:
           return state;
        
    }
};

export default tenantLeaseReducer;