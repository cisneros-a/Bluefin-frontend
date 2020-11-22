import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFix } from "../actions";
import { DirectUpload } from "activestorage";
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
} from "@chakra-ui/core";

export default function RequestForm({ leaseObj }) {
  const [button, setButton] = useState(true);
  const dispatch = useDispatch();
  const fixes = useSelector((state) => state.fixes.state);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [description, setDescription] = useState("");
  const [images, setImages] = useState("");

  const handleDescChange = (event) => {
    setDescription(event.target.value);
  };

  let handleDrop = (e) => {
    setImages([e.target.files[0]]);
    console.log(e.target.files[0]);
  };

  const fileInput = React.createRef();

  const handleSubmit = async () => {
    setButton(!button);
    // console.log(fileInput(current.files[0].name));
    let fix = {
      landlord_id: leaseObj.lease.landlord_id,
      tenant_id: leaseObj.lease.tenant_id,
      property_id: leaseObj.lease.property_id,
      description: description,
      status: "Out for review",
    };
    console.log(fix);
    const res = await fetch(`http://localhost:3000/fixes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ fix }),
    });

    const fixId = await res.json();
    if (fixId) {
      uploadFile(images, fixId);
    }
  };

  const uploadFile = (files, fixId) => {
    files.forEach((file) => {
      //   let property = {
      //       uploads: file
      //   }
      const upload = new DirectUpload(
        file,
        "http://localhost:3000/rails/active_storage/direct_uploads"
      );
      upload.create((error, blob) => {
        if (error) {
        } else {
          fetch(`http://localhost:3000/fixes/${fixId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({ uploads: blob.signed_id }),
          })
            .then((res) => res.json())
            .then((result) => dispatch(addFix(fixes, result)));
        }
      });
    });
  };

  return (
    <div>
      <p>
        Fill out this form. Attach a photo and relevant information. An official
        record.
      </p>
      <Button
        onClick={onOpen}
        leftIcon="edit"
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
                placeholder="Describe the problem you are having. The more specific the better! Please include a picture."
              />
              <FormLabel>Photo: </FormLabel>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <input
              type="file"
              name="file"
              onChange={(e) => {
                handleDrop(e);
              }}
            />
            {button ? (
              <Button
                onClick={() => handleSubmit()}
                leftIcon="edit"
                variantColor="pink"
                variant="solid"
              >
                Submit
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
