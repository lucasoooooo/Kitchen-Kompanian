import React, { useState } from "react";
import AddMember from "./MyKitchenComp/AddMember";
import MemberList from "./MyKitchenComp/MemberList";
import TableComponent from './MyKitchenComp/Table'


import { DataGrid } from '@mui/x-data-grid';
import { GridCellParams } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Box from "@mui/material/Box"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


function MyKitchens() {

  const [members, setMembers] = useState([
    {id: 1 , firstName: 'Mark', lastName: 'McGraw', username: 'mmcgraw', },
    {id: 2 , firstName: 'Brenton', lastName: 'Haliw', username: 'bhaliw', },
    {id: 3,  firstName: 'Lucas', lastName: 'Balangero', username: 'lbalang',  },
    {id: 4, firstName: 'Will', lastName: 'Reid', username: 'wreid',  }
  ])

  const [add, setAdd] = useState(false);

  const [id, setID] = useState(5);

  const handleDelete = (id) => {
    const newMembers = members.filter(member => member.id !== id);
    setMembers(newMembers);
  }

  const handleAdd = () => {
    setAdd(true);
  }

  const handleBack = () => {
    setAdd(false);
  }

  const addMember = (member) => {
    setID(id+1);
    setMembers(members.concat(member));
  }

  if(add) {
    return <AddMember addMember={addMember} handleBack={handleBack}  id={id}/>
  } else {
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
                 Kitchen Members
              </Typography>
             </Grid>

             <Grid item>
             <TableComponent
              members={members}
              handleAddButtonClicked={handleAdd}
            />
             </Grid>

          </Grid>
    )
  }


}

export default MyKitchens;