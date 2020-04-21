import React from "react";
import { Image } from "@chakra-ui/core";

export default function FixCard({ fix }) {
  return (
    <div className="fix-card">
      <h2>Fix Description:</h2>
      <h3>{fix.fix.description}</h3>

      <Image
        width="400px"
        height="300px"
        src={`http://localhost:3000/${fix.uploads}`}
        alt={"fix photo"}
      />
    </div>
  );
}
