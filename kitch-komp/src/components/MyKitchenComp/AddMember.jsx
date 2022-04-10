import React, { memo, useState } from 'react'

import {
  Box,
  Divider,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  TextareaAutosize,
  Table,
  TableContainer,
  TableCell,
  TableRow,
  TableHead,
  TableBody
} from '@mui/material'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

import { DataGrid, gridColumnsTotalWidthSelector } from '@mui/x-data-grid'

import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import { useEffect } from 'react'


const AddMember = ({addMember, handleBack, id, currMember, handleEditMember, handleDelete}) => {

    const [username, setUserName] = useState(currMember.username);
    const [firstName, setFirstName] = useState(currMember.firstName);
    const [lastName, setLastName] = useState(currMember.lastName);
    const [ID, setID] = useState(0);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [allergy, setAllergy] = useState(currMember.allergy);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let tempID = currMember ? currMember.id : id; 

        const member = {username, firstName, lastName, id: tempID, allergy};
        currMember ? (
            handleEditMember(member)
        ) : (
            addMember(member)
        );
        
        handleBack();
    }

    const handleDeleteClick = () => {
        handleDelete(currMember);
        handleBack();
    }

    const handleClosed = () => {
        setConfirmDelete(false)
      }
    
    
    return (  
        <>
    <Grid container sx={{ p: 0.5 }} alignItems='center' alignContent='center'>
        <Grid
          container
          direction='column'
          alignContent='center'
          justifyContent='center'
          alignItems='center'
          width={768}
          spacing={2}
        >
          {/* Header for Submenu */}
          <Grid
            item
            container
            alignContent='center'
            justifyContent='center'
            alignItems='center'
          >
            <Grid item sm>
              <Button
                variant='text'
                color='primary'
                style={{ border: 'none', outline: 'none' }}
                startIcon={<ArrowBackIcon>Back To List</ArrowBackIcon>}
                onClick={handleBack}
              >
                Back To List
              </Button>
            </Grid>

            <Grid
              container
              item
              xs
              alignContent='flex-end'
              justifyContent='flex-end'
              alignItems='center'
              spacing={2}
            >
              
                <Grid item>
                    {currMember ? (
                  <Button
                    variant='text'
                    color='primary'
                    style={{ border: 'none', outline: 'none' }}
                    startIcon={<SaveIcon>Edit Recipe</SaveIcon>}
                    onClick={handleSubmit}
                  >
                    Edit Member
                  </Button>
                    ) : (
                        <Button
                    variant='text'
                    color='primary'
                    style={{ border: 'none', outline: 'none' }}
                    startIcon={<SaveIcon>Edit Recipe</SaveIcon>}
                    onClick={handleSubmit}
                  >
                    Add Member
                  </Button>
                    ) }
                </Grid>
            
           { (currMember) && 

                <Grid item>
                    <Button
                      variant='text'
                      color='primary'
                      style={{ border: 'none', outline: 'none' }}
                      startIcon={<DeleteIcon>Delete Recipe</DeleteIcon>}
                      onClick={() => setConfirmDelete(true)}
                    >
                      Delete Member
                    </Button>
                  </Grid>
             } 

              
            </Grid>
          </Grid>

          <Grid
            item
            container
            alignContent='center'
            justifyContent='center'
            alignItems='center'
          >
              <EditMember  
              firstName = {currMember.firstName}
              lastName = {currMember.lastName}
              username = {currMember.username}
              allergy = {currMember.allergy}
              setUserName = {setUserName}
              setFirstName = {setFirstName}
              setLastName = {setLastName}
              setAllergy = {setAllergy} />
          </Grid>

          {confirmDelete ? (
        <Dialog
          open={confirmDelete}
          onClose={handleClosed}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>{'Delete Member'}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Are you sure that you want to delete {currMember.firstName}? You
              cannot reverse this action.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClosed}
              autoFocus
              color='primary'
              style={{ border: 'none', outline: 'none' }}
            >
              Cancel
            </Button>
            <Button
              color='primary'
              style={{ border: 'none', outline: 'none' }}
              onClick={() => handleDeleteClick()}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}

        </Grid>
      </Grid>


        </>
        

    );
}

function EditMember(props) {

    return (
        <>
        <Grid container sx={{ p: 0.5 }} alignItems='center' alignContent='center'>
        <Grid
          container
          alignContent='center'
          justifyContent='center'
          alignItems='center'
          spacing={5}
        >
          <Grid item>
            <Typography>Enter member information below</Typography>
          </Grid>
          <Grid
            item
            container
            alignContent='center'
            justifyContent='center'
            alignItems='center'
            spacing={3}
          >

            <Grid item>
              <TextField
                label='First Name'
                 defaultValue={props.firstName}
                 onChange={(e) => props.setFirstName(e.target.value)}
              />
            </Grid>

            <Grid item>
              <TextField
                label='Last Name'
                defaultValue={props.lastName}
                onChange={(e) => props.setLastName(e.target.value)}
              />
              </Grid>

            <Grid item>
              <TextField
                label='Username'
                 defaultValue={props.username}
                 onChange={(e) => props.setUserName(e.target.value)}
              />
            </Grid>

          </Grid>

          <Grid
            item
            container
            alignContent='center'
            justifyContent='center'
            alignItems='center'
            spacing={3}
          >
             <Grid item>
              <TextField
                label='Allergies'
                 defaultValue={props.allergies}
                 onChange={(e) => props.setAllergy(e.target.value)}
              />
            </Grid>
          </Grid>

          
        </Grid>
    </Grid>
        
        </>
    );
}
 
export default AddMember;