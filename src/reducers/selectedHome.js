const selectedHomeReducer = (state = null, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case 'SELECT_HOME':
            return {state: action.payload}
        default:
           return state;
        
    }
};

export default selectedHomeReducer;