import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, ButtonGroup } from "@chakra-ui/core";
import { useDisclosure, Textarea, useToast } from "@chakra-ui/core";
import { FormControl, FormLabel, Box } from "@chakra-ui/core";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Image,
} from "@chakra-ui/core";
import HomeDescription from "./HomeDescription";
import { Home } from "@material-ui/icons";

export default function HomeSpecs() {
  const home = useSelector((state) => state.selectedTenantHome.state);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userId = parseInt(localStorage.userId);
  const [description, setDescription] = useState("");
  const [button, setButton] = useState(true);
  const toast = useToast();

  const handleClick = async () => {
    toast({
      title: "Thank you for submitting an application!",
      description: "You should recieve a response soon!",
      status: "success",
      duration: 2500,
      isClosable: true,
      position: "top",
    });
    const application = {
      tenant_id: userId,
      landlord_id: home.property.user.id,
      property_id: home.property.id,
      description: description,
      status: "Pending",
    };

    const res = await fetch("http://localhost:3000/applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ application }),
    });

    const data = await res.json();
    if (data.message) {
      console.log("Maybe this failed");
    } else {
      console.log("Maybe this passed");
      setButton(!button);
    }
  };

  const handleDescChange = (event) => {
    setDescription(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div className="HomeSpec">
      <div className="SpecImage">
        <Box size="sm">
          <Image
            size="500px"
            src={`http://localhost:3000/${home.uploads}`}
            alt="Home"
          />
        </Box>
      </div>
      <HomeDescription home={home} />
      <ButtonGroup spacing={4}>
        <Button
          onClick={handleClick}
          leftIcon="edit"
          variantColor="teal"
          variant="solid"
        >
          Apply now!
        </Button>
      </ButtonGroup>

      <Modal onClose={onClose} isOpen={isOpen} size="lg" onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Apply for {home.property.address.split(",")[0]}
          </ModalHeader>
          <ModalBody pb={6}>
            <FormControl className="modal">
              <FormLabel>Content: </FormLabel>
              <Textarea
                onChange={(e) => handleDescChange(e)}
                placeholder="Feel free to suggest a rent amout, why you might be a good fit, if you have pets, etc.."
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            {button ? (
              <Button
                onClick={() => handleClick()}
                leftIcon="edit"
                variantColor="teal"
                variant="solid"
              >
                Apply now!
              </Button>
            ) : (
              <Button onClick={onClose} variant="ghost">
                Close
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
