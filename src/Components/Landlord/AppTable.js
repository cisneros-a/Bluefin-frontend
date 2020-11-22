import React from "react";
import { useEffect, useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import { IconButton, Button, useDisclosure } from "@chakra-ui/core";
import TableRow from "@material-ui/core/TableRow";
import {
  fetchLandlordApplications,
  updateLandlordApplications,
  updateLandlordProperties,
  updateAllAvailableProperties,
} from "../../actions";
import Lnavbar from "./Navbar";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/core";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function LandlordAppTable() {
  const userId = parseInt(localStorage.userId);
  const allProperties = useSelector((state) => state.homes);

  const applications = useSelector((state) => state.landlordApplications);
  const properties = useSelector((state) => state.landlordProperties.state);

  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  // const handleToggle = () => setShow(!show);

  useEffect(() => {
    dispatch(fetchLandlordApplications(userId));
  }, []);

  const columns = [
    { id: "buttons", label: "Approve or Deny", maxWidth: 25 },

    {
      id: "address",
      label: "Property Address",
      minWidth: 170,
      align: "right",
    },
    {
      id: "name",
      label: "Name",
      minWidth: 170,
      align: "right",
    },
    {
      id: "date",
      label: "Submission date: ",
      minWidth: 170,
      align: "right",
    },
  ];

  let handleAccept = (applicationId, tenantId, propertyId) => {
    let API = `http://localhost:3000/applications/${applicationId}`;

    fetch(API, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ status: "Accepted" }),
    }).then(postLease(tenantId, propertyId, applicationId));
  };

  let postLease = async (tenantId, propertyId, applicationId) => {
    let lease = {
      landlord_id: userId,
      tenant_id: tenantId,
      property_id: propertyId,
    };
    await fetch(`http://localhost:3000/leases`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ lease }),
    });
    updateProperty(propertyId, applicationId);
  };

  let updateProperty = async (propertyId, applicationId) => {
    await fetch(`http://localhost:3000/update_availability/${propertyId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ availability: 0 }),
    }).then(
      dispatch(updateLandlordApplications(applications.state, applicationId)),
      dispatch(updateLandlordProperties(properties, propertyId)),
      dispatch(updateAllAvailableProperties(allProperties, propertyId))
    );
  };

  let handleDeny = async (applicationId) => {
    await fetch(`http://localhost:3000/applications/${applicationId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ status: "Denied" }),
    });
    dispatch(updateLandlordApplications(applications.state, applicationId));
  };

  let generateTableBody = (applications) => {
    let rows = [];
    if (applications.state.length > 0) {
      applications.state.forEach((application) => {
        rows.push({
          description: `${application.description}`,
          buttons: (
            <div className={`${application.id}`}>
              <IconButton
                onClick={() =>
                  handleAccept(
                    application.id,
                    application.tenant_id,
                    application.property_id
                  )
                }
                variantColor="green"
                icon="check"
              />{" "}
              <IconButton
                onClick={() => handleDeny(application.id)}
                variantColor="red"
                icon="close"
              />
            </div>
          ),
          address: `${application.property.address}`,
          name: `${application.tenant.name}`,
          date: `${application.property.available_date}`,
          more: (
            <div>
              <Fragment key={application.id}>
                <Button variantColor="blue" onClick={onOpen}>
                  Open
                </Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalContent>
                    <ModalHeader>Message from applicant: </ModalHeader>
                    <ModalBody>{application.description}</ModalBody>
                    <ModalFooter>
                      <Button variantColor="blue" mr={3} onClick={onClose}>
                        Close
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </Fragment>
            </div>
          ),
        });
      });
    }
    return rows
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((row) => {
        return (
          <Fragment key={Math.random()}>
            <TableRow hover role="checkbox" tabIndex={-1}>
              {columns.map((column) => {
                const value = row[column.id];
                return (
                  <TableCell key={Math.random(1, 100)} align={column.align}>
                    {column.format && typeof value === "number"
                      ? column.format(value)
                      : value}
                  </TableCell>
                );
              })}
            </TableRow>
            {/* <Collapse mt={4} isOpen={show}>
              <h3>{row.description}</h3>
            </Collapse> */}
          </Fragment>
        );
      });
  };

  return (
    <div className="center">
      <div className="header">
        <Lnavbar />
      </div>
      <div className="appTable">
        <h1>Rental Applications:</h1>
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>{generateTableBody(applications)}</TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </div>
  );
}
