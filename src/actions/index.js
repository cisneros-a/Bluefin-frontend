
export const userSigninFetch = (user, userType) => {
    return async dispatch => {
      const resp = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({ user })
        })
        const data = await resp.json()
        if (data.message) {
            // Here you should have logic to handle invalid creation of a user.
            // This assumes your Rails API will return a JSON object with a key of
            // 'message' if there is an error with creating the user, i.e. invalid username
        }
        else {
            localStorage.setItem("token", data.jwt)
            localStorage.setItem("userType", userType)
            dispatch(loginUser(data.user, userType))
            dispatch(signIn())
        }
    }
  }

  export const userSignupFetch = user => {
    return async dispatch => {
      const resp = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({ user })
        })
        const data = await resp.json()
        if (data.message) {
            // Here you should have logic to handle invalid creation of a user.
            // This assumes your Rails API will return a JSON object with a key of
            // 'message' if there is an error with creating the user, i.e. invalid username
        }
        else {
            localStorage.setItem("token", data.jwt)
            dispatch(loginUser(data.user))
            dispatch(signIn())
        }
    }
  }

  export const getProfileFetch = () => {
    return async dispatch => {
      const token = localStorage.token;
      const userType = localStorage.userType
      if (token) {
        const resp = await fetch("http://localhost:3000/profile", {
              method: "GET",
              headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                  'Authorization': `Bearer ${token}`
              }
          })
          const data = await resp.json()
          if (data.message) {
              // An error will occur if the token is invalid.
              // If this happens, you may want to remove the invalid token.
              localStorage.removeItem("token")
              
          }
          else {
              dispatch(loginUser(data.user, userType))
              dispatch(signIn())
          }
      }
    }
  }
  
  export const loginUser = (userObj, userType) => {
    return {
      type: 'LOGIN_USER',
      payload: userObj,
      userType: userType
    }
  }


export const toggleView = () => {
  console.log('Toggle is dispatched')
    return {
        type: "TOGGLE"
    }
}

export const logoutUser = () => ({
    type: 'LOGOUT_USER'
  })




export const signIn = () => {
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

  export const selectHome = (payload) => {
    return {
        type: 'SELECT_HOME',
        payload: payload,
    }
  }

  
  