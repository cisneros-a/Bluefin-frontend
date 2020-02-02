const userReducer = (state = {name: '', user_id: 0,}, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case 'LOGIN_USER':
            console.log(action.payload)
            return {name: action.payload.name,  user_id: action.payload.id }
        case 'LOGOUT_USER':
            return {user: {}}
        default:
           return state;
        
    }
};

export default userReducer;