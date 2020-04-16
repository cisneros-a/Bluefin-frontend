import React from "react";
import { Stat, StatLabel, StatNumber, StatGroup } from "@chakra-ui/core";

export default function LeaseInformation({
  address,
  createdDate,
  userType,
  name,
}) {
  let year = createdDate[0];
  let newYear = parseInt(year) + 1;
  let month = createdDate[1];
  let day = createdDate[2].split("");
  day.splice(2);
  let newDate = day.join("");
  const startDate = `${month}/${newDate}/${year}`;
  const endDate = `${month}/${newDate}/${newYear}`;
  return (
    <>
      <StatGroup>
        <Stat>
          <StatLabel>Property Address : </StatLabel>
          <StatNumber>{address}</StatNumber>
        </Stat>

        <Stat>
          <StatLabel>Lease Start Date : </StatLabel>
          <StatNumber>{startDate}</StatNumber>
        </Stat>

        <Stat>
          <StatLabel>Leased End Date : </StatLabel>
          <StatNumber>{endDate}</StatNumber>
        </Stat>

        <Stat>
          <StatLabel>
            {userType === "tenant" ? "Landlord:" : "Tenant:"}
          </StatLabel>
          <StatNumber>{name}</StatNumber>
        </Stat>
      </StatGroup>
    </>
  );
}
