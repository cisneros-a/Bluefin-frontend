import React from "react";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { DirectUpload } from "activestorage";
import { useDispatch } from "react-redux";
import { updateFixes } from "../actions";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/core";
import {
  FormControl,
  FormLabel,
  Button,
  Textarea,
  useDisclosure,
  Input,
} from "@chakra-ui/core";

export default function RequestForm({ fixes, fix }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const handleDescChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async () => {
    // console.log(fileInput(current.files[0].name));
    await fetch(`http://localhost:3000/update_resolved/${fix.fix.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        description: description,
        status: "Out for review",
      }),
    });

    dispatch(updateFixes(fixes, fix.fix.id));
  };

  return (
    <div>
      <Button
        onClick={onOpen}
        leftIcon="warning"
        variantColor="pink"
        variant="solid"
      >
        Request
      </Button>
      <Modal onClose={onClose} isOpen={isOpen} size="lg" onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Describe your problem. </ModalHeader>
          <ModalBody pb={6}>
            <FormControl className="modal">
              <FormLabel>Content: </FormLabel>
              <Textarea
                onChange={(e) => handleDescChange(e)}
                placeholder="Describe the problem you are having. The more specific the better! And please include any pictures if you have them!"
              />
              <FormLabel>Photo: </FormLabel>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => handleSubmit()}
              leftIcon="edit"
              variantColor="pink"
            >
              Submit!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}