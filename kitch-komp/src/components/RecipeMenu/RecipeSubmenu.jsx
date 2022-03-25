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
        width={768}
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
          <Divider style={{ width: 760 }} />
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
          <Divider style={{ width: 760 }} />
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
          <Divider style={{ width: 760 }} />
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
      {props.recipe.ingredients ? (
        props.recipe.ingredients.map(curr => {
          return (
            <Grid
              container
              item
              alignContent='center'
              justifyContent='center'
              alignItems='center'
              spacing={5}
            >
              <Grid item>
                <TextField label='Ingredient Name' defaultValue={curr.name} />
              </Grid>

              <Grid item>
                <TextField
                  label='Ingredient Quantity'
                  defaultValue={curr.quantity}
                />
              </Grid>
            </Grid>
          )
        })
      ) : (
        <Grid container item>
          <Grid item>
            <TextField label='Ingredient Name'></TextField>
          </Grid>

          <Grid item>
            <TextField label='Ingredient Quantity'></TextField>
          </Grid>
        </Grid>
      )}
    </>
  )
}

// Used to add or edit recipes
function ManipulateRecipe (props) {
  const [value, setValue] = React.useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleRecipeChange = (event, keyName) => {
    props.setCurrRecipe({ ...props.recipe, [keyName]: event.target.value })
  }

  const handleIngredientChange = (event) => {

  }

  return (
    <>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList
              onChange={handleChange}
              aria-label='add-edit-recipes'
              variant='fullWidth'
              centered
            >
              <Tab
                label='Recipe Information'
                value='1'
                style={{ border: 'none', outline: 'none' }}
              />
              <Tab
                label='Ingredients'
                value='2'
                style={{ border: 'none', outline: 'none' }}
              />
              <Tab
                label='Directions'
                value='3'
                style={{ border: 'none', outline: 'none' }}
              />
            </TabList>
          </Box>
          <TabPanel value='1'>
            <Grid
              container
              alignContent='center'
              justifyContent='center'
              alignItems='center'
              spacing={5}
            >
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
                    label='Recipe Name'
                    defaultValue={props.recipe.name ? props.recipe.name : ''}
                    onChange={e => handleRecipeChange(e, 'name')}
                  />
                </Grid>

                <Grid item>
                  <TextField
                    label='Prep Time'
                    defaultValue={
                      props.recipe.prepTime ? props.recipe.prepTime : ''
                    }
                    onChange={e => handleRecipeChange(e, 'prepTime')}
                  />
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
                  <TextField
                    label='Cook Time'
                    defaultValue={
                      props.recipe.cookTime ? props.recipe.cookTime : ''
                    }
                    onChange={e => handleRecipeChange(e, 'cookTime')}
                  />
                </Grid>

                <Grid item>
                  <TextField
                    label='Total Time'
                    defaultValue={
                      props.recipe.totalTime ? props.recipe.totalTime : ''
                    }
                    onChange={e => handleRecipeChange(e, 'totalTime')}
                  />
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
                  <TextField
                    label='Serving Size'
                    defaultValue={
                      props.recipe.servingSize ? props.recipe.servingSize : ''
                    }
                    onChange={e => handleRecipeChange(e, 'servingSize')}
                  />
                </Grid>

                <Grid item>
                  <TextField
                    label='Recipe Tags'
                    defaultValue={props.recipe.tags ? props.recipe.tags : ''}
                    onChange={e => handleRecipeChange(e, 'tags')}
                  />
                </Grid>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value='2'>
            <Grid
              item
              container
              alignContent='center'
              justifyContent='center'
              alignItems='center'
              spacing={5}
            >
              <CreateIngredientQuantity recipe={props.recipe} />
            </Grid>
          </TabPanel>
          <TabPanel value='3'>
            <Grid
              container
              alignContent='center'
              direction='column'
              justifyContent='center'
              alignItems='center'
              spacing={5}
            >
              <Grid item>
                <TextareaAutosize
                  defaultValue={
                    props.recipe.directions ? props.recipe.directions : ''
                  }
                  style={{ width: 700, height: 500 }}
                  onChange={e => handleRecipeChange(e, 'directions')}
                />
              </Grid>
            </Grid>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  )
}

export default function RecipeSubmenu (props) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [currRecipe, setCurrRecipe] = useState(props.recipe)
  const [editRecipe, setEditRecipe] = useState(false)

  const handleEditRecipeClicked = () => {
    setEditRecipe(true)
  }

  const handleDeleteButtonClicked = () => {
    setOpenDeleteDialog(true)
  }

  const handleClosed = () => {
    setOpenDeleteDialog(false)
  }

  const handleSaveRecipe = () => {
    props.handleAddRecipe(currRecipe)
  }

  return (
    <>
      <Paper sx={{ pb: 10 }}>
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
                onClick={props.handleReturnToRecipeMenuButtonClicked}
              >
                Back To List
              </Button>
            </Grid>

            {/* <Grid item sm></Grid> */}

            <Grid
              container
              item
              xs
              alignContent='flex-end'
              justifyContent='flex-end'
              alignItems='center'
              spacing={2}
            >
              {Object.keys(props.recipe).length !== 0 && editRecipe !== true ? (
                <>
                  <Grid item>
                    <Button
                      variant='text'
                      color='primary'
                      style={{ border: 'none', outline: 'none' }}
                      startIcon={<EditIcon>Edit Recipe</EditIcon>}
                      onClick={handleEditRecipeClicked}
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
                  </Grid>
                </>
              ) : (
                <Grid item>
                  <Button
                    variant='text'
                    color='primary'
                    style={{ border: 'none', outline: 'none' }}
                    startIcon={<SaveIcon>Edit Recipe</SaveIcon>}
                    onClick={handleSaveRecipe}
                  >
                    Save Recipe
                  </Button>
                </Grid>
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
            {Object.keys(props.recipe).length !== 0 && editRecipe !== true ? (
              <ViewRecipe recipe={currRecipe} />
            ) : (
              <ManipulateRecipe
                recipe={currRecipe}
                setCurrRecipe={setCurrRecipe}
              />
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
              onClick={() => props.handleDeleteRecipe(props.recipe.name)}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}
    </>
  )
}
