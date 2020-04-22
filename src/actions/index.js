export const userSigninFetch = (user, userType) => {
  return async (dispatch) => {
    const resp = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ user }),
    });
    const data = await resp.json();
    if (data.message) {
      // Here you should have logic to handle invalid creation of a user.
      // This assumes your Rails API will return a JSON object with a key of
      // 'message' if there is an error with creating the user, i.e. invalid username
    } else {
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("token", data.jwt);
      localStorage.setItem("userType", userType);
      dispatch(loginUser(data.user, userType));
      dispatch(signIn());
    }
  };
};

export const userSignupFetch = (user) => {
  return async (dispatch) => {
    const resp = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ user }),
    });
    const data = await resp.json();
    if (data.message) {
      // Here you should have logic to handle invalid creation of a user.
      // This assumes your Rails API will return a JSON object with a key of
      // 'message' if there is an error with creating the user, i.e. invalid username
    } else {
      localStorage.setItem("token", data.jwt);
      dispatch(loginUser(data.user));
      dispatch(signIn());
    }
  };
};

export const getProfileFetch = () => {
  return async (dispatch) => {
    const token = localStorage.token;
    const userType = localStorage.userType;
    if (token) {
      const resp = await fetch("http://localhost:3000/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await resp.json();
      if (data.message) {
        // An error will occur if the token is invalid.
        // If this happens, you may want to remove the invalid token.
        localStorage.removeItem("token");
      } else {
        dispatch(loginUser(data.user, userType));
        dispatch(signIn());
      }
    }
  };
};

export const loginUser = (userObj, userType) => {
  return {
    type: "LOGIN_USER",
    payload: userObj,
    userType: userType,
  };
};

export const signIn = () => {
  return {
    type: "SIGN_IN",
  };
};

export const toggleView = () => {
  return {
    type: "TOGGLE",
  };
};

export const logoutUser = () => ({
  type: "LOGOUT_USER",
});

export const fetch_homes = () => {
  return async (dispatch) => {
    let resp = await fetch("http://localhost:3000/properties");
    const data = await resp.json();
    let availableHomes = data.filter((home) => home.property.availability);
    let onlyHomes = [];
    for (let i = 0; i < availableHomes.length; i++) {
      onlyHomes.push(availableHomes[i].property);
    }
    dispatch(populate_homes(data));
  };
};

export const fetchLandlordProperties = (userId) => {
  const token = localStorage.token;
  return async (dispatch) => {
    const resp = await fetch(
      `http://localhost:3000/landlord_properties/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await resp.json();
    dispatch(populateLandlordProperties(data));
  };
};

export const populateLandlordProperties = (payload) => {
  return {
    type: "POPULATE_LANDLORD_PROPERTIES",
    payload: payload,
  };
};

export const populate_homes = (payload) => {
  return {
    type: "POPULATE_HOMES",
    payload: payload,
  };
};

export const selectTenantProperty = (payload) => {
  return {
    type: "SELECT_TENANT_PROPERTY",
    payload: payload,
  };
};

export const fetchLandlordApplications = (userId) => {
  const token = localStorage.token;
  return async (dispatch) => {
    const resp = await fetch(
      `http://localhost:3000/landlord_applications/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data = await resp.json();
    console.log(data);
    dispatch(populateLandlordApplications(data));
  };
};

export const populateLandlordApplications = (payload) => {
  return {
    type: "POPULATE_LANDLORD_APPLICATIONS",
    payload: payload,
  };
};

export const fetchTenantApplications = (userId) => {
  const token = localStorage.token;
  return async (dispatch) => {
    const resp = await fetch(
      `http://localhost:3000/tenant_applications/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data = await resp.json();
    console.log("action", data);
    dispatch(populateTenantApplications(data));
  };
};

export const populateTenantApplications = (payload) => {
  return {
    type: "POPULATE_TENANT_APPLICATIONS",
    payload: payload,
  };
};

export const fetchTenantLease = (userId) => {
  return async (dispatch) => {
    const resp = await fetch("http://localhost:3000/leases", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await resp.json();
    if (data.message) {
    } else {
      let tenantLease = data.find((lease) => lease.tenant_id === userId);
      dispatch(populateTenantLease(tenantLease));
    }
  };
};

const populateTenantLease = (payload) => {
  return {
    type: "POPULATE_TENANT_LEASE",
    payload: payload,
  };
};

export const fetchLandlordLease = (propertyId) => {
  return async (dispatch) => {
    const resp = await fetch(
      `http://localhost:3000/landlord_lease/${propertyId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data = await resp.json();
    if (data.message) {
    } else {
      dispatch(
        selectLandlordProperty({
          lease: data.lease,
          property: data.property,
          tenant: data.tenant,
        })
      );
      dispatch(populateFixes(data.fixes));
    }
  };
};

export const selectLandlordProperty = (payload) => {
  return {
    type: "SELECT_LANDLORD_PROPERTY",
    payload: payload,
  };
};

const populateFixes = (payload) => {
  return {
    type: "POPULATE_FIXES",
    payload: payload,
  };
};

export const updateFixes = (fixes, fixId) => {
  let updatedFixes = [];
  let fixToBeUpdated;
  for (let i = 0; i < fixes.length; i++) {
    // console.log(fixes[i]);
    if (fixes[i].fix.id === fixId) {
      fixToBeUpdated = fixes[i];
      fixToBeUpdated.fix.status = "Resolved";
    } else {
      updatedFixes.push(fixes[i]);
    }
  }
  updatedFixes.push(fixToBeUpdated);

  return {
    type: "POPULATE_FIXES",
    payload: updatedFixes,
  };
};

// export const Example = (user, userType) => {
//   return async (dispatch) => {
//     const resp = await fetch("http://localhost:3000/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//       body: JSON.stringify({ user }),
//     });
//     const data = await resp.json();
//     if (data.message) {
//       // Here you should have logic to handle invalid creation of a user.
//       // This assumes your Rails API will return a JSON object with a key of
//       // 'message' if there is an error with creating the user, i.e. invalid username
//     } else {
//       localStorage.setItem("token", data.jwt);
//       localStorage.setItem("userType", userType);
//       dispatch(loginUser(data.user, userType));
//       dispatch(signIn());
//     }
//   };
// };
