import React, {useState} from 'react'

import { Box, Grid, Paper, Typography, Button, TextField } from '@mui/material'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

function FirstRecipeInfo (props) {
  return (
    <Grid
      container
      alignContent='center'
      direction='column'
      justifyContent='center'
      alignItems='center'
      spacing={5}
    >

      <Grid item>
        <Typography>
          <b>Prep Time:</b> {props.recipe.prepTime}
        </Typography>
      </Grid>

      <Grid item>
        <Typography><b>Cook Time:</b> {props.recipe.cookTime}</Typography>
      </Grid>

      <Grid item>
        <Typography><b>Total Time:</b> {props.recipe.totalTime}</Typography>
      </Grid>

      <Grid item>
        <Typography><b>Serving Size:</b> {props.recipe.servingSize}</Typography>
      </Grid>

      <Grid item>
        <Typography><b>Recipe Tags:</b> {props.recipe.tags}</Typography>
      </Grid>
    </Grid>
  )
}

export default function ViewRecipe (props) {

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

    const handleDeleteRecipe = () => {

    }


  return (
    <Paper>
      <Grid
        container
        direction='column'
        alignContent='center'
        justifyContent='center'
        alignItems='center'
        width={1055}
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
              onClick={props.handleReturnToRecipeMenuButtonClicked}
            >
              Back To List
            </Button>
          </Grid>

          <Grid item sm></Grid>

          <Grid
            container
            item
            sm
            alignContent='flex-end'
            justifyContent='flex-end'
            alignItems='center'
            spacing={2}
          >
            {props.recipeName !== '' ? (
              <>
                <Grid item>
                  <Button
                    variant='text'
                    color='primary'
                    style={{ border: 'none', outline: 'none' }}
                    startIcon={<EditIcon>Edit Recipe</EditIcon>}
                    onClick={props.handleReturnToRecipeMenuButtonClicked}
                  >
                    Edit Recipe
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant='text'
                    color='primary'
                    style={{ border: 'none', outline: 'none' }}
                    startIcon={<DeleteIcon>Delete Recipe</DeleteIcon>}
                    onClick={props.handleReturnToRecipeMenuButtonClicked}
                  >
                    Delete Recipe
                  </Button>
                </Grid>{' '}
              </>
            ) : (
              <Grid item sm></Grid>
            )}
          </Grid>
        </Grid>

        {/* Ingredients */}
        <Grid
          item
          container
          alignContent='center'
          justifyContent='center'
          alignItems='center'
        >
          <FirstRecipeInfo recipe={props.recipe} />
        </Grid>
      </Grid>

      <Dialog
        open={openDeleteDialog}
        onClose={setOpenDeleteDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure that you want to delete {props.recipe.name}? You cannot reverse this action.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={setOpenDeleteDialog(false)} autoFocus>Cancel</Button>
          <Button onClick={handleDeleteRecipe}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>


  )
}
