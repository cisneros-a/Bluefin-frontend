import React from "react";

export default function HomeDescription({ home }) {
  return (
    <div className="home-spec-description">
      <p>
        <span className="home-descriptor"> Rent </span>: ${home.property.rent}
      </p>
      <p>
        <span className="home-descriptor"> Bedrooms </span>:{" "}
        {home.property.bedrooms}{" "}
        <span className="home-descriptor"> Bathrooms </span>:{" "}
        {home.property.bathrooms}
      </p>
      <p>
        <span className="home-descriptor"> Square Feet </span>:{" "}
        {home.property.sqft}{" "}
      </p>
      <p>
        <span className="home-descriptor"> Description </span>:{" "}
        {home.property.description}
      </p>
      <p>
        <span className="home-descriptor"> Being Leased By </span>:{" "}
        {home.property.user.name}
      </p>
    </div>
  );
}
