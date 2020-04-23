import React from "react";
import { Image, Button } from "@chakra-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { updateFixes } from "../../actions";

export default function LandlordFixCard({ fix }) {
  const fixes = useSelector((state) => state.fixes.state);
  const dispatch = useDispatch();
  let handleClick = async () => {
    await fetch(`http://localhost:3000/update_resolved/${fix.fix.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ status: "Unresolved" }),
    });

    dispatch(updateFixes(fixes, fix.fix.id));
  };

  return (
    <div className="fix-card">
      <h3>{fix.fix.description}</h3>

      <Image
        width="400px"
        height="300px"
        src={`http://localhost:3000/${fix.uploads}`}
        alt={"fix photo"}
      />
      <Button
        onClick={() => handleClick()}
        leftIcon="check-circle"
        variantColor="purple"
        variant="outline"
        isDisabled={fix.fix.status === "Out for review" ? false : true}
      >
        {fix.fix.status === "Out for review" ? "Mark as resolved" : "Resolved!"}
      </Button>
    </div>
  );
}
