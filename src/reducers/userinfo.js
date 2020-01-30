const userReducer = (state = {name: '', user_id: 0,}, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case 'ASSIGN_USER_VALUES':
            return {name: action.username,  user_id: action.user_id }
        default:
           return state;
        
    }
};

export default userReducer;