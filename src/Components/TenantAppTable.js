import React from 'react';
import { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import { IconButton } from "@chakra-ui/core";
import TableRow from '@material-ui/core/TableRow';
import { fetch_applications } from '../actions'



const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function LandlordAppTable() {
  const userId = useSelector(state => state.user.user_id)
  const classes = useStyles();
  const applications = useSelector(state => state.applications)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetch_applications(userId))
    }, [])

 
    const columns = [
    { id: 'status', label: 'Application Status', maxWidth: 25 },
    
    {
      id: 'address',
      label: 'Property Address',
      minWidth: 170,
      align: 'right',

    },
    {
      id: 'name',
      label: 'Property Owner Name',
      minWidth: 170,
      align: 'right',
      
    },
    {
      id: 'date',
      label: 'Delete ',
      minWidth: 170,
      align: 'right',
      
    },
  ];


  
 
  


  let handleDelete = async applicationId => {
    await fetch(`http://localhost:3000/applications/${applicationId}`, {
        method: "Delete",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({ status: "Denied" })
      }) 
      dispatch(fetch_applications(userId)) 
  }


  
  let testFunction = (data) => {
    console.log(data)
    let rows = []
    if (applications.state ) {
      data.forEach(application => {
      rows.push({
        status: `${application.status}`,
        address: `${application.property.address}`,
        name: `${application.landlord.name}`,
        date: <div><IconButton onClick={() => handleDelete(application.id)} variantColor="red" aria-label="Call Segun" size="lg" icon="close"/></div>,
      })
      })
    } 
    console.log(rows)
    return (rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
      return (
        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
          {columns.map(column => {
            const value = row[column.id];
            return (
              <TableCell key={column.id} align={column.align}>
                {column.format && typeof value === 'number' ? column.format(value) : value}
              </TableCell>
            );
          })}
        </TableRow>
      );
    }))
  }

  return (
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
  );
}