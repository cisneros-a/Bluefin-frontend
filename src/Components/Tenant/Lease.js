import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchTenantLease } from "../../actions";
import Tnavbar from "./Navbar";
import MyStoreCheckout from "../MyStoreCheckout";

import Grid from "@material-ui/core/Grid";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Box,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
} from "@chakra-ui/core";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  useToast,
} from "@chakra-ui/core";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/core";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Textarea,
} from "@chakra-ui/core";

export default function TenantLease() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [button, setButton] = useState("solid");
  const toast = useToast();

  const userId = parseInt(localStorage.userId);
  const tenantLease = useSelector((state) => state.tenantLease.state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTenantLease(userId));
  }, []);

  const handleClick = () => {
    setButton("disabled");
  };

  const displayStats = (lease) => {
    if (tenantLease) {
      const date = lease.created_at.split("-");
      let year = date[0];
      let newYear = parseInt(year) + 1;
      let month = date[1];
      let day = date[2].split("");
      day.splice(2);
      let newDate = day.join("");
      const startDate = `${month}/${newDate}/${year}`;
      const endDate = `${month}/${newDate}/${newYear}`;

      return (
        <StatGroup>
          <Stat>
            <StatLabel>Property Address : </StatLabel>
            <StatNumber>{lease.property.address}</StatNumber>
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
            <StatLabel>Landlord : </StatLabel>
            <StatNumber>{lease.landlord.name}</StatNumber>
          </Stat>
        </StatGroup>
      );
    }
  };

  return (
    <div className="lease">
      <div className="header">
        <Tnavbar />
      </div>
      <div className="leaseStat">{displayStats(tenantLease)}</div>
      <br></br>
      <br></br>

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
              <Button
                onClick={onOpen}
                leftIcon="edit"
                variantColor="pink"
                variant="solid"
              >
                Request
              </Button>{" "}
              Fill out this form. Attach photos and relevant information. An
              official record.
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

      <Modal onClose={onClose} isOpen={isOpen} size="lg" onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Describe your problem. </ModalHeader>
          <ModalBody pb={6}>
            <FormControl className="modal">
              <FormLabel>Content: </FormLabel>
              <Textarea placeholder="Describe the problem you are having. The more specific the better! And please include any pictures if you have them!" />
              <input type="file" name="imgCollection" multiple />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Popover>
              <PopoverTrigger>
                <Button
                  onClick={() => handleClick()}
                  leftIcon="edit"
                  variantColor="pink"
                  variant={button}
                >
                  Submit!
                </Button>
              </PopoverTrigger>
              <PopoverContent zIndex={4}>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Request Sent!</PopoverHeader>
                <PopoverBody>
                  This feature is currently under construction.
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
