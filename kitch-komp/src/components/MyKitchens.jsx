import React, { useState } from "react";
import AddMember from "./MyKitchenComp/AddMember";
import MemberList from "./MyKitchenComp/MemberList";
import TableComponent from './MyKitchenComp/Table'
import { useCustomSnackbar } from './RecipeMenu/useCustomSnackbar'


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
import QuestionMarkIcon from '@mui/icons-material/Help'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { colors } from "@material-ui/core";


function MyKitchens(props) {

 //  this.handleAdd = this.handleMemberAdd.bind(this);

 const Alert = React.forwardRef(function Alert (props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

  

  const [members, setMembers] = useState(props.members);
  const [add, setAdd] = useState(false);
  const [id, setID] = useState(5);
  const [currMember, setCurrMember] = useState('');
  const [viewInfo, setViewInfo] = useState(false)
  const { isActive, message, openCustomSnackBar } = useCustomSnackbar()

  const handleDelete = (memberD) => {
    const newMembers = members.filter(member => member.id !== memberD.id);
    setMembers(newMembers);

    openCustomSnackBar(`${memberD.username} has been deleted`)
  }

  const handleAdd = () => {
    setCurrMember('');
    setAdd(true);
  }

  const handleBack = () => {
    setAdd(false);
  }

  const handleEditMember = (member1) => {
    const newMembers = members.filter(member => member.id !== member1.id);
    setMembers(newMembers);

    setMembers(newMembers.concat(member1));

    openCustomSnackBar(`${member1.username} has been edited`)
  }

  const addMember = (member) => {
    setID(id+1);
    //props.handleMemberAdd(member).bind(this);
    setMembers(members.concat(member));

    openCustomSnackBar(`${member.username} has been added`)
  }

  const handleEdit = (member) => {
    setCurrMember(member);
    setAdd(true);
  }

  if(add) {
    return <AddMember addMember={addMember} handleBack={handleBack}  id={id} currMember={currMember}
    handleEditMember={handleEditMember} handleDelete={handleDelete}/>
  } else {
    return (
<>
<div style={{ textAlign: 'center' }}>
        <Grid
          alignItems='center'
          container
          style={{
            color: 'white',
            background: '#343a40',
            paddingTop: '20px',
            paddingBottom: '20px'
          }}
        >
          <Grid item sm></Grid>
          <Grid item sm={8}>
            <h1 textalign='center'>Kitchen Members</h1>
          </Grid>
          <Grid item sm>
            <Button
              startIcon={<QuestionMarkIcon />}
              style={{ border: 'none', outline: 'none', color: 'white' }}
              onClick={() => setViewInfo(true)}
            >
              Page info
            </Button>
          </Grid>
        </Grid>

        <span className='horizontal-line' />
      </div>


          <Grid
          container
          direction='column'
          alignContent='center'
          justifyContent='center'
          alignItems='center'
          spacing={5}
          > 
            

             <Grid item>
             <TableComponent
              members={members}
              handleAddButtonClicked={handleAdd}
              handleMemberSelected={handleEdit}
            />
             </Grid>

          </Grid>
          {viewInfo ? (
        <Dialog
          open={viewInfo}
          onClose={() => setViewInfo(false)}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>Recipe List</DialogTitle>
          <DialogContent>
            <DialogContentText
              id='alert-dialog-description'
              style={{
                wordWrap: 'break-word',
                display: 'inline-block',
                whiteSpace: 'pre-line'
              }}
            >
              {'This is the Kitchen Member page.\n\nTo add a new member, click the "Add Member" button.\n\nTo edit a member, click on a member in the table.\n\n' +
                'To delete a member, click on a member and then select the "Delete Member" button.'}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setViewInfo(false)}
              autoFocus
              color='primary'
              style={{ border: 'none', outline: 'none' }}
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}

      <Snackbar open={isActive} message={message}>
        <Alert sx={{ width: '100%' }}>{message}</Alert>
      </Snackbar>



          </>

          
    )
  }


}

export default MyKitchens;