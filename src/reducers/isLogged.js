const loggedReducer = (state = false, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case 'SIGN_IN':
            return !state;
        case 'LOGOUT_USER':
            return !state
        default:
           return state;  
    }
};

export default loggedReducer;