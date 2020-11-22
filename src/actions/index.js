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

export const fetchAvailablehomes = () => {
  return async (dispatch) => {
    let resp = await fetch("http://localhost:3000/properties");
    const data = await resp.json();
    let availableHomes = data.filter((home) => home.property.availability);
    let onlyHomes = [];
    for (let i = 0; i < availableHomes.length; i++) {
      onlyHomes.push(availableHomes[i]);
    }
    // console.log(onlyHomes);
    dispatch(populate_homes(onlyHomes));
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

export const updateAllAvailableProperties = (properties, id) => {
  let updatedProperties = [];
  for (let i = 0; i < properties.length; i++) {
    if (!properties[i].property.id === id) {
      updatedProperties.push(properties[i]);
    }
  }
  return {
    type: "POPULATE_HOMES",
    payload: updatedProperties,
  };
};

export const addPropertyToAllProperties = (properties, newProperty) => {
  console.log("properties", properties);
  console.log("property", newProperty);
  return {
    type: "POPULATE_HOMES",
    payload: [newProperty, ...properties.state],
  };
};

export const updateLandlordProperties = (properties, id) => {
  let leased = properties.leased_properties;
  let unleased = properties.unleased_properties;
  for (let i = 0; i < properties.unleased_properties.length; i++) {
    if (properties.unleased_properties[i].property.id === id) {
      properties.unleased_properties[i].property.availability = false;
      leased.push(properties.unleased_properties[i]);
      unleased.splice(i, 1);
    }
  }
  return {
    type: "POPULATE_LANDLORD_PROPERTIES",
    payload: { leased_properties: leased, unleased_properties: unleased },
  };
};

export const addLandlordProperty = (properties, property) => {
  let leased = properties.leased_properties;
  let unleased = [property, ...properties.unleased_properties];

  return {
    type: "POPULATE_LANDLORD_PROPERTIES",
    payload: { leased_properties: leased, unleased_properties: unleased },
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

export const updateLandlordApplications = (applications, id) => {
  let updatedApplications = [];
  for (let i = 0; i < applications.length; i++) {
    if (applications[i].id !== id) {
      updatedApplications.push(applications[i]);
    }
  }
  return {
    type: "POPULATE_LANDLORD_APPLICATIONS",
    payload: updatedApplications,
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

export const fetchTenantLease = (id) => {
  return async (dispatch) => {
    const resp = await fetch(`http://localhost:3000/tenant_lease/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await resp.json();
    console.log("action", data);
    if (data.message) {
    } else {
      dispatch(
        populateTenantLease({
          lease: data.lease,
          property: data.property,
          landlord: data.landlord,
        })
      );

      dispatch(populateFixes(sortFixes(data.fixes, "tenant")));
    }
  };
};

const sortFixes = (fixes, userType) => {
  if (fixes.length > 0) {
    let unresolved = [];
    let resolved = [];
    let review = [];
    for (let i = 0; i < fixes.length; i++) {
      if (fixes[i].fix.status === "Unresolved") {
        unresolved.push(fixes[i]);
      }
      if (fixes[i].fix.status === "Resolved") {
        resolved.push(fixes[i]);
      }
      if (fixes[i].fix.status === "Out for review") {
        review.push(fixes[i]);
      }
    }
    const sortedFixes =
      userType === "tenant"
        ? [...unresolved, ...review, ...resolved]
        : [...review, ...unresolved, ...resolved];
    return sortedFixes;
  }
  return fixes;
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
      console.log("action", data.fixes);
      dispatch(populateFixes(sortFixes(data.fixes, "landlord")));
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

export const updateFixes = (fixObj) => {
  let updatedFixes = [];
  let updatedFix;
  for (let i = 0; i < fixObj.fixes.length; i++) {
    // console.log(fixes[i]);
    if (fixObj.fixes[i].fix.id === fixObj.fixId) {
      updatedFix = fixObj.fixes[i];
      updatedFix.fix.status = fixObj.status;
      updatedFix.fix.description = fixObj.description;
    } else {
      updatedFixes.push(fixObj.fixes[i]);
    }
  }
  updatedFixes.push(updatedFix);

  return {
    type: "POPULATE_FIXES",
    payload: sortFixes(updatedFixes, fixObj.userType),
  };
};

export const addFix = (fixes, fix) => {
  return {
    type: "POPULATE_FIXES",
    payload: sortFixes([...fixes, fix], "tenant"),
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
