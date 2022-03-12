import React, { useState, useEffect } from 'react'

import TableComponent from "./Table"

// MUI Component Imports
import { Autocomplete, Grid, TextField, Typography } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

// MUI Icon Imports
import Search from '@mui/icons-material/Search'
import Filter from '@mui/icons-material/Filter'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, prepTime, cookTime, tags) {
  return { name, prepTime, cookTime, tags };
}

const rows = [
  createData('Frozen yoghurt', "30 Minutes", "2 Hours", ["Desert", "Appetizer"] ),
  createData('Ice cream sandwich',"5 Minutes", "5 seconds", ["Desert", "Appetizer"] ),
  createData('Eclair', "50 Minutes", "1 Hours", ["Desert", "Appetizer"]),
  createData('Cupcake',"15 Minutes", "20 Minutes", ["Desert", "Appetizer"]),
  createData('Gingerbread', "3 Minutes", "2 Days", ["Desert", "Appetizer"]),
];

function Recipies () {
  const [searchText, setSearchText] = useState('')
  const [filterTag, setFilterTag] = useState('')

  const tagOptions = ['Desert', 'Dinner', 'Vegan', 'Breakfast', 'Lunch']



  return (
    <Grid
      container
      direction='column'
      alignContent='center'
      justifyContent='center'
      alignItems='center'
      spacing={5}
    >
      <Grid item>
        <Typography compontent='center' variant='h3'>
          Recipe List
        </Typography>
      </Grid>

      <Grid item>
        <TableComponent />

      {/* <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Recipe Name</StyledTableCell>
            <StyledTableCell align="right">Prep Time</StyledTableCell>
            <StyledTableCell align="right">Cook Time</StyledTableCell>
            <StyledTableCell align="right">Recipe Tags</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.prepTime}</StyledTableCell>
              <StyledTableCell align="right">{row.cookTime}</StyledTableCell>
              <StyledTableCell align="right">{row.tags}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> */}
      </Grid>
    </Grid>
  )
}

export default Recipies
