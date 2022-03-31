import React, { useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { GridCellParams } from '@mui/x-data-grid';
import AddMember from "./MyKitchenComp/AddMember";
import MemberList from "./MyKitchenComp/MemberList";
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

  const columns = [
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'username', headerName: 'Username', width: 150 },
    {
      field: 'delete',
      headerName: '',
      editable: false,
      width: 45,
      sortable: false,
      headerClassName: 'delete-item-column',
      hideSortIcons: true,
      renderCell: (params: GridCellParams) => {
        return (
          <Button
            className="delete-btn"            
            onClick={() => handleDelete(params.id)}>
            <DeleteIcon className="delete" color="inherit" />
          </Button>
        );
      },
    },
  ];

  if(add) {
    return <AddMember addMember={addMember} handleBack={handleBack}  id={id}/>
  } else {
    return (
      <div>
        <h2>Kitchen Members</h2>
        <br></br>
        <div style={{ height: 500, width: '100%' }}>
          <nav className="kitchen-member-header">
            <h3>Home</h3>
            <AddCircleOutlineIcon className="add-sign" onClick={handleAdd}/>
          </nav>

          <Box sx={{
          height:700,
          width: 1, 
          '& .MuiDataGrid-columnHeaders':{
          backgroundColor: '#6A994E'},
          '& .even':{
            backgroundColor: 'rgb(223, 212, 184)'
          },
          '& .odd':{
            backgroundColor: 'rgb(244, 233, 204)'
          }
          
          }}>



          <DataGrid rows={members} columns={columns}/>
          </Box>
        </div> 
        </div>
    )
  }


}

export default MyKitchens;