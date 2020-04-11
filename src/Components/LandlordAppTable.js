import React from "react";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import { IconButton, Button, Collapse } from "@chakra-ui/core";
import TableRow from "@material-ui/core/TableRow";
import { fetch_applications, fetch_homes } from "../actions";
import Lnavbar from "./Lnavbar";

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
  const applications = useSelector((state) => state.applications);
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // const [applications, setApplications] = useState([])
  // const [rows, setRows] = useState([])
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  // const apps = useSelector(state => state.applications)

  useEffect(() => {
    dispatch(fetch_applications(userId));
  }, []);

  // let reloadTable =  () => {
  //     console.log('reloading table function')
  //     fetch('http://localhost:3000/applications')
  //     .then(res => res.json())
  //     .then(data => {
  //         let landlordApplications = data.filter(application => application.landlord_id === userId)
  //         let pendingApplications = landlordApplications.filter(application => application.status === 'pending')
  //         dispatch(populate_applications(pendingApplications))
  //     })

  // }

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
    {
      id: "more",
      label: "See More:",
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
    }).then(postLease(tenantId, propertyId));
  };

  let postLease = async (tenantId, propertyId) => {
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
    updateProperty(propertyId);
  };

  let updateProperty = async (propertyId) => {
    await fetch(`http://localhost:3000/update_availability/${propertyId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ availability: 0 }),
    }).then(dispatch(fetch_applications(userId)), dispatch(fetch_homes()));
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
    dispatch(fetch_applications(userId));
  };

  let testFunction = (data) => {
    // console.log(applications.state)
    let rows = [];
    if (applications.state) {
      data.forEach((application) => {
        console.log(application);

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
                aria-label="Call Segun"
                size="lg"
                icon="check"
              />{" "}
              <IconButton
                onClick={() => handleDeny(application.id)}
                variantColor="red"
                aria-label="Call Segun"
                size="lg"
                icon="close"
              />
            </div>
          ),
          address: `${application.property.address}`,
          name: `${application.tenant.name}`,
          date: `${application.property.available_date}`,
          more: (
            <div className={`${application.name}`}>
              <Button variantColor="blue" onClick={handleToggle}>
                Open
              </Button>
            </div>
          ),
        });
      });
    }
    console.log(rows);
    return rows
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((row) => {
        return (
          <>
            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
              {console.log("-----------", row.id)}

              {columns.map((column) => {
                console.log("column", column);
                const value = row[column.id];
                return (
                  <TableCell key={column.id} align={column.align}>
                    {column.format && typeof value === "number"
                      ? column.format(value)
                      : value}
                  </TableCell>
                );
              })}
            </TableRow>
            <Collapse mt={4} isOpen={show}>
              <h3>{row.description}</h3>
            </Collapse>
          </>
        );
      });
  };

  return (
    <div className="center">
      <div className="header">
        <Lnavbar />
      </div>
      <p>Under construction</p>
      {/* <div className='appTable'>
  <h1>Rental Applications:</h1>
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
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
          <TableBody>
          
          {testFunction(applications.state)}
         
          </TableBody>
        </Table>
      </TableContainer>
     
    </Paper>
    </div> */}
    </div>
  );
}
