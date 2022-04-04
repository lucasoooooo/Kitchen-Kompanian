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


const AddMember = ({addMember, handleBack, id}) => {

    const [username, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const member = {username, firstName, lastName, id};
        addMember(member);
        setUserName('');
        setFirstName('');
        setLastName('');
        handleBack();
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
                  <Button
                    variant='text'
                    color='primary'
                    style={{ border: 'none', outline: 'none' }}
                    startIcon={<SaveIcon>Edit Recipe</SaveIcon>}
                    onClick={handleSubmit}
                  >
                    Add Member
                  </Button>
                </Grid>
              
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
              setUserName = {setUserName}
              setFirstName = {setFirstName}
              setLastName = {setLastName} />
          </Grid>
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
            spacing={5}
          >
            <Grid item>
              <TextField
                label='First Name'
                // value={firstName}
                 //onChange={(e) => (handleFirstChange(e))}
               // defaultValue={firstName}
                 onChange={(e) => props.setFirstName(e.target.value)}
              />
            </Grid>

            <Grid item>
              <TextField
                label='Last Name'
               // defaultValue={props.recipe.prepTime ? props.recipe.prepTime : ''}
                onChange={(e) => props.setLastName(e.target.value)}
              />

            <Grid
            item
            container
            alignContent='center'
            justifyContent='center'
            alignItems='center'
            spacing={5}
             >
            <Grid item>
              <TextField
                label='Username'
                // defaultValue={props.recipe.cookTime ? props.recipe.cookTime : ''}
                 onChange={(e) => props.setUserName(e.target.value)}
              />
            </Grid>
            </Grid>

            </Grid>
          </Grid>
        </Grid>
    </Grid>
        
        </>
    );
}
 
export default AddMember;