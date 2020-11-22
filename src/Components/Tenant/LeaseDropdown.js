import React from "react";
import MyStoreCheckout from "../MyStoreCheckout";
import RequestForm from "../RequestForm";

import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
} from "@chakra-ui/core";

export default function LeaseDropdown({ tenantLease }) {
  return (
    <div>
      <div className="lease-dropdown">
        <Accordion className="center" allowToggle defaultIsOpen={false}>
          <AccordionItem>
            <AccordionHeader>
              <Box flex="1" textAlign="center">
                <h2> Request a Fix</h2>
              </Box>
              <AccordionIcon />
            </AccordionHeader>
            <AccordionPanel pb={4}>
              <RequestForm leaseObj={tenantLease} />
            </AccordionPanel>
          </AccordionItem>
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
                <h2>View Your Lease</h2>
              </Box>
              <AccordionIcon />
            </AccordionHeader>
            <AccordionPanel pb={4}>
              <Button
                className="lease-download"
                leftIcon="download"
                variantColor="purple"
                variant="solid"
              >
                <a
                  href="/Users/Adrian/Desktop/Adrian-Cisneros-Resume.pdf"
                  download
                >
                  Download
                </a>
              </Button>{" "}
              Just incase you need to reference anything!
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
