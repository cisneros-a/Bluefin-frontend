import React from "react";

export default function HomeDescription({ home }) {
  return (
    <div>
      <h3>{home.property.address}</h3>
      <h4>Rent: ${home.property.rent} </h4>
      <h4>
        Bedrooms: {home.property.bedrooms} Bathrooms: {home.property.bathrooms}
      </h4>
      <h4>Sqft: {home.property.sqft} </h4>

      <h4>Description: {home.property.description}</h4>
      <h5>Being leased by: {home.property.user.name}</h5>
    </div>
  );
}
