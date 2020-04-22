import React from "react";
import { Image, Button } from "@chakra-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { updateFixes } from "../../actions";

export default function FixCard({ fix }) {
  const fixes = useSelector((state) => state.fixes.state);
  const dispatch = useDispatch();
  let handleClick = async () => {
    await fetch(`http://localhost:3000/update_resolved/${fix.fix.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ status: "Resolved" }),
    });

    dispatch(updateFixes(fixes, fix.fix.id));
  };

  return (
    <div className="fix-card">
      <h2>Fix Description:</h2>
      <h3>{fix.fix.description}</h3>
      <h5>Id: {fix.fix.id}</h5>

      {/* <Image
        width="400px"
        height="300px"
        src={`http://localhost:3000/${fix.uploads}`}
        alt={"fix photo"}
      /> */}
      <Button
        onClick={() => handleClick()}
        leftIcon="check-circle"
        variantColor="purple"
        isDisabled={fix.fix.status === "Unresolved" ? false : true}
        variant={fix.fix.status === "Unresolved" ? "outline" : "outlined"}
      >
        {fix.fix.status === "Unresolved" ? "Mark as resolved" : "Resolved!"}
      </Button>
    </div>
  );
}
