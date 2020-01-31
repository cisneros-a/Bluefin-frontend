export const assign_user_values = (username, user_id) => {
    return {
        type: 'ASSIGN_USER_VALUES',
        username: username,
        user_id: user_id,
    }
}

export const sign_in = () => {
    return {
        type: 'SIGN_IN'
    }
}

export const populate_homes = (payload) => {
    return {
        type: 'POPULATE_HOMES',
        payload: payload,
    }
}