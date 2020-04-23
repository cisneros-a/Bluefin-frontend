import React from "react";
import { Image, Button } from "@chakra-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { updateFixes } from "../../actions";
import RejectForm from "../RejectForm";

export default function TenantFixCard({ fix }) {
  const fixes = useSelector((state) => state.fixes.state);
  const dispatch = useDispatch();

  const returnButton = () => {
    if (fix.fix.status === "Resolved") {
      return (
        <Button
          leftIcon="check-circle"
          variantColor="purple"
          isDisabled={true}
          variant={"outlined"}
        >
          Resolved!
        </Button>
      );
    }
    if (fix.fix.status === "Out for review") {
      return (
        <Button
          leftIcon="search"
          variantColor="purple"
          isDisabled={true}
          variant={"outlined"}
        >
          Out for review
        </Button>
      );
    }
    if (fix.fix.status === "Unresolved") {
      return (
        <>
          <Button
            onClick={() => handleAccept()}
            leftIcon="check-circle"
            variantColor="purple"
            variant="solid"
          >
            Accept
          </Button>
          <RejectForm fixes={fixes} fix={fix} />
        </>
      );
    }
  };

  const handleAccept = async () => {
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
      <h3>Tenant</h3>
      <h3>{fix.fix.description}</h3>

      <Image
        width="400px"
        height="300px"
        src={`http://localhost:3000/${fix.uploads}`}
        alt={"fix photo"}
      />
      {returnButton()}
    </div>
  );
}
