import React from "react";
import { useState } from "react";
import Dropzone from "react-dropzone";
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
  Input,
} from "@chakra-ui/core";

export default function RequestForm({ lease }) {
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
    // console.log(fileInput(current.files[0].name));
    let fix = {
      landlord_id: lease.landlord_id,
      tenant_id: lease.tenant_id,
      property_id: lease.property_id,
      description: description,
    };
    const res = await fetch(`http://localhost:3000/fixes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ fix }),
    });

    const fixId = await res.json();
    console.log(fixId);
    if (!fixId.message) {
      uploadFile(images, fixId);
    }
  };

  const uploadFile = (files, fixId) => {
    console.log("hit the upload function", files);

    files.forEach((file) => {
      console.log("hit the loop");
      //   let property = {
      //       uploads: file
      //   }
      const upload = new DirectUpload(
        file,
        "http://localhost:3000/rails/active_storage/direct_uploads"
      );
      console.log(file);
      upload.create((error, blob) => {
        console.log("blob", blob);
        if (error) {
          console.log(error);
        } else {
          console.log("no error");
          fetch(`http://localhost:3000/fixes/${fixId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({ uploads: blob.signed_id }),
          })
            .then((res) => res.json())
            .then((result) => console.log(result));
        }
        console.log("pls workk");
      });
    });
  };

  return (
    <div>
      <p>
        Fill out this form. Attach photos and relevant information. An official
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
                placeholder="Describe the problem you are having. The more specific the better! And please include any pictures if you have them!"
              />
              <FormLabel>Photo: </FormLabel>

              {/* <Dropzone
                onDrop={(e) => handleDrop(e)}
                accept="image/png, image/gif,image/jpg,image/jpeg"
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p>Click to select files</p>
                    </div>
                  </section>
                )}
              </Dropzone> */}
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
