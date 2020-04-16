import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchTenantLease } from "../../actions";
import Tnavbar from "./Navbar";
import MyStoreCheckout from "../MyStoreCheckout";
import RequestForm from "../RequestForm";
import LeaseInformationBar from "../LeaseInformationBar";

import { useToast, Box, Button } from "@chakra-ui/core";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/core";

export default function TenantLease() {
  const [button, setButton] = useState("solid");
  const toast = useToast();

  const userId = parseInt(localStorage.userId);
  const tenantLease = useSelector((state) => state.tenantLease.state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTenantLease(userId));
  }, []);

  const displayStats = (lease) => {
    if (tenantLease) {
      const date = lease.created_at.split("-");
      console.log(lease);

      return (
        <LeaseInformationBar
          address={lease.property.address}
          createdDate={date}
          userType="tenant"
          name={lease.landlord.name}
        />
      );
    }
  };

  return (
    <div className="lease">
      <div className="header">
        <Tnavbar />
      </div>
      <div className="leaseStat">{displayStats(tenantLease)}</div>

      <div className="lease-dropdown">
        <Accordion className="center" allowMultiple>
          <AccordionItem>
            <AccordionHeader>
              <Box flex="1" textAlign="center">
                <h2> Make A Payment </h2>
              </Box>
              <AccordionIcon />
            </AccordionHeader>
            <AccordionPanel pb={4}>
              <Box flex="1" contentAlign="center">
                <div className="checkoutForm">
                  <MyStoreCheckout />

                  {/* <CheckoutForm /> */}
                </div>
              </Box>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionHeader>
              <Box flex="1" textAlign="center">
                <h2> Request a Fix</h2>
              </Box>
              <AccordionIcon />
            </AccordionHeader>
            <AccordionPanel pb={4}>
              <RequestForm lease={tenantLease} />
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionHeader>
              <Box flex="1" textAlign="center">
                <h2>View Your Lease</h2>
              </Box>
              <AccordionIcon />
            </AccordionHeader>
            <AccordionPanel pb={4}>
              <Button leftIcon="download" variantColor="purple" variant="solid">
                <Link color="purple" to="./Lease.pdf" target="_blank" download>
                  Download
                </Link>
              </Button>{" "}
              Just incase you need to reference anything!
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
