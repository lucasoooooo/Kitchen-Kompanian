import React, { useState } from 'react'

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

import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

function FirstRecipeInfo (props) {
  const handleChange = (event, key) => {
    console.log(event.target.value, key)
  }

  const saveNewRecipe = () => {
    props.handleAddRecipe()
  }

  return (
    <Grid
      container
      alignContent='center'
      direction='column'
      justifyContent='center'
      alignItems='center'
      spacing={5}
    >
      <Grid
        item
        container
        direction='column'
        alignContent='center'
        justifyContent='center'
        alignItems='center'
        spacing={5}
      >
        <Grid
          item
          container
          direction='column'
          alignContent='center'
          justifyContent='center'
          alignItems='center'
          spacing={5}
          xs={4}
        >
          <Grid item>
            <Typography>
              <b>Recipe Information</b>
            </Typography>
          </Grid>
          <Grid item>
            {props.recipe.name !== undefined ? (
              <Typography>
                <b>Name:</b> {props.recipe.name}
              </Typography>
            ) : (
              <TextField
                label='Recipe Name'
                onChange={v => handleChange(v, 'name')}
              >
                {props.edit === true ? props.recipe.name : ''}
              </TextField>
            )}
          </Grid>

          <Grid item>
            {props.recipe.prepTime !== undefined ? (
              <Typography>
                <b>Prep Time:</b> {props.recipe.prepTime}
              </Typography>
            ) : (
              <TextField label='Prep Time'>
                {props.edit === true ? props.recipe.prepTime : ''}
              </TextField>
            )}
          </Grid>

          <Grid item>
            {props.recipe.cookTime !== undefined ? (
              <Typography>
                <b>Cook Time:</b> {props.recipe.cookTime}
              </Typography>
            ) : (
              <TextField label='Cook Time'>
                {props.edit === true ? props.recipe.cookTime : ''}
              </TextField>
            )}
          </Grid>

          <Grid item>
            {props.recipe.totalTime !== undefined ? (
              <Typography>
                <b>Total Time:</b> {props.recipe.totalTime}
              </Typography>
            ) : (
              <TextField label='Total Time'>
                {props.edit === true ? props.recipe.totalTime : ''}
              </TextField>
            )}
          </Grid>

          <Grid item>
            {props.recipe.servingSize !== undefined ? (
              <Typography>
                <b>Serving Size:</b> {props.recipe.servingSize}
              </Typography>
            ) : (
              <TextField label='Serving Size'>
                {props.edit === true ? props.recipe.servingSize : ''}
              </TextField>
            )}
          </Grid>

          <Grid item>
            {props.recipe.tags !== undefined ? (
              <Typography>
                <b>Recipe Tags:</b> {props.recipe.tags}
              </Typography>
            ) : (
              <TextField label='Recipe Tags'>
                {props.edit === true ? props.recipe.tags : ''}
              </TextField>
            )}
          </Grid>
        </Grid>

        <Grid
          item
          container
          direction='column'
          alignContent='center'
          justifyContent='center'
          alignItems='center'
          spacing={5}
          xs={4}
        >
          <Grid item>
            <Typography>
              <b>Ingredients</b>
            </Typography>
          </Grid>

          {props.recipe.name === undefined ? (
            <Grid item>
              <Button startIcon={<AddIcon />}>Add Ingredient</Button>
            </Grid>
          ) : null}

          <Grid item>
            {props.recipe.name !== undefined ? (
              <Typography>
                {props.recipe.ingredients[0].name} -{' '}
                {props.recipe.ingredients[0].quantity}
              </Typography>
            ) : (
              <TextField label='Ingredient 1'></TextField>
            )}
          </Grid>
        </Grid>

        <Grid
          container
          item
          direction='column'
          alignContent='center'
          justifyContent='center'
          alignItems='center'
          spacing={5}
          xs={4}
        >
          <Grid item>
            <Typography>
              <b>Directions</b>
            </Typography>
          </Grid>

          <Grid item>
            <TextareaAutosize style={{ width: 300, height: 500 }}>
              {props.recipe.directions}
            </TextareaAutosize>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Button variant='contained' onClick={saveNewRecipe}>
          Save
        </Button>
      </Grid>
    </Grid>
  )
}

// Used to display recipes
function ViewRecipe (props) {
  return (
    <>
      <Grid
        container
        direction='column'
        alignContent='center'
        justifyContent='center'
        alignItems='center'
        width={1055}
        spacing={2}
      >
        <Grid item>
          <Typography variant='h4'>
            <i>
              <u>{props.recipe.name}</u>
            </i>
          </Typography>
        </Grid>

        <Grid item>
          <Divider style={{ width: 1055 }} />
        </Grid>

        <Grid item>
          <Typography>Recipe Information</Typography>
        </Grid>
        <Grid item>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>Prep Time</TableCell>
                  <TableCell align='center'>Cook Time</TableCell>
                  <TableCell align='center'>Total Time</TableCell>
                  <TableCell align='center'>Serving Size</TableCell>
                  <TableCell align='center'>Recipe Tags</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align='center'>{props.recipe.prepTime}</TableCell>
                  <TableCell align='center'>{props.recipe.cookTime}</TableCell>
                  <TableCell align='center'>{props.recipe.totalTime}</TableCell>
                  <TableCell align='center'>
                    {props.recipe.servingSize}
                  </TableCell>
                  <TableCell align='center'>{props.recipe.tags}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item>
          <Divider style={{ width: 1055 }} />
        </Grid>

        <Grid item>
          <Typography>Recipe Ingredients</Typography>
        </Grid>

        {/* List all of the ingredients for the recipe */}
        {props.recipe.ingredients.map(currIngredient => {
          return (
            <Grid item>
              {currIngredient.name} - {currIngredient.quantity}
            </Grid>
          )
        })}

        <Grid item>
          <Divider style={{ width: 1055 }} />
        </Grid>

        <Grid item>
          <Typography>Directions</Typography>
        </Grid>

        <Grid item>
          <Typography
            style={{
              wordWrap: 'break-word',
              display: 'inline-block',
              whiteSpace: 'pre-line'
            }}
          >
            {props.recipe.directions}
          </Typography>
        </Grid>
      </Grid>
    </>
  )
}

function CreateIngredientQuantity (props) {
  return (
    <>
      <Grid item>
        <Button startIcon={<AddIcon />}>Add Ingredient</Button>
      </Grid>
      {props.recipe.ingredients ? props.recipe.ingredients.map(curr => {
        return (
          <Grid container item>
            <Grid item>
              <TextField label="Ingredient Name">{curr.name}</TextField>
            </Grid>

            <Grid item>
              <TextField label="Ingredient Quantity">{curr.quantity}</TextField>
            </Grid>
          </Grid>
        )
      }) : <Grid container item>
          <Grid item>
            <TextField label="Ingredient Name"></TextField>
          </Grid>

          <Grid item>

            <TextField label="Ingredient Quantity"></TextField>
          </Grid>
        
        </Grid>}
    </>
  )
}

// Used to add or edit recipes
function ManipulateRecipe (props) {
  console.log(props.recipe)
  return (
    <>
      <Grid
        container
        alignContent='center'
        direction='column'
        justifyContent='center'
        alignItems='center'
        spacing={5}
      >
        <Grid item>
          <Typography>Recipe Information</Typography>
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
            <TextField label='Recipe Name'>
              {props.recipe.name ? props.recipe.name : ''}
            </TextField>
          </Grid>

          <Grid item>
            <TextField label='Prep Time'>
              {props.recipe.prepTime ? props.recipe.prepTime : ''}
            </TextField>
          </Grid>

          <Grid item>
            <TextField label='Cook Time'>
              {props.recipe.cookTime ? props.recipe.cookTime : ''}
            </TextField>
          </Grid>
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
            <TextField label='Total Time'>
              {props.recipe.totalTime ? props.recipe.totalTime : ''}
            </TextField>
          </Grid>

          <Grid item>
            <TextField label='Serving Size'>
              {props.recipe.servingSize ? props.recipe.servingSize : ''}
            </TextField>
          </Grid>

          <Grid item>
            <TextField label='Recipe Tags'>
              {props.recipe.recipeTags ? props.recipe.recipeTags : ''}
            </TextField>
          </Grid>
        </Grid>

        <Grid item>
          <Divider style={{ width: 1055 }} />
        </Grid>

        <Grid item>
          <Typography>Ingredients</Typography>
        </Grid>

        <Grid item container>
          <CreateIngredientQuantity recipe={props.recipe} />
        </Grid>

        <Grid item>
          <Button variant='contained'>Save</Button>
        </Grid>
      </Grid>
    </>
  )
}

export default function RecipeSubmenu (props) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

  const handleDeleteButtonClicked = () => {
    setOpenDeleteDialog(true)
  }

  const handleClosed = () => {
    setOpenDeleteDialog(false)
  }

  console.log(Object.keys(props.recipe).length)
  return (
    <>
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
              {Object.keys(props.recipe).length !== 0 ? (
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
                      onClick={handleDeleteButtonClicked}
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

          <Grid
            item
            container
            alignContent='center'
            justifyContent='center'
            alignItems='center'
          >
            {Object.keys(props.recipe).length !== 0 ? (
              <ViewRecipe recipe={props.recipe} />
            ) : (
              <ManipulateRecipe recipe={props.recipe} />
            )}

            {/* <FirstRecipeInfo
            recipe={props.recipe}
            setRecipe={props.setRecipe}
            handleAddRecipe={props.handleAddRecipe}
          /> */}
          </Grid>
        </Grid>
      </Paper>

      {openDeleteDialog ? (
        <Dialog
          open={openDeleteDialog}
          onClose={handleClosed}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>{'Delete Recipe'}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Are you sure that you want to delete {props.recipe.name}? You
              cannot reverse this action.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClosed} autoFocus>
              Cancel
            </Button>
            <Button onClick={props.handleDeleteRecipe(props.recipe.name)}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}
    </>
  )
}
