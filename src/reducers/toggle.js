const toggleReducer = (state = false, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case 'TOGGLE':
            return !state
        default:
           return state;
        
    }
};

export default toggleReducer;