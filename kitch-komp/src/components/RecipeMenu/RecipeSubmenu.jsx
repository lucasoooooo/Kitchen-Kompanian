import React, { useEffect, useState } from 'react'

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
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

// MUI Icon Imports
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'

const Alert = React.forwardRef(function Alert (props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

// Used to display recipes
function ViewRecipe (props) {
  // Creates a snackbar which allows for a custom message
  const [currIngredient, setCurrIngredient] = useState({})
  const [ingredientAdded, setIngredientAdded] = useState(false)

  // Add the ingredient to the grocery list
  const handleAddIngredient = ingredient => {
    setCurrIngredient(ingredient)
    const id = new Date().getTime()
    const ingredientToAdd = {
      id: id,
      item: ingredient.name,
      quantity: ingredient.quantity
    }
    props.handleGroceryAdd(ingredientToAdd)
    setIngredientAdded(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setIngredientAdded(false)
  }

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
          <Typography variant='h4'>{props.recipe.name}</Typography>
        </Grid>

        <Grid item >
          <Divider style={{ width: 765, borderBottomWidth: 3 }} />
        </Grid>

        <Grid item>
          <Typography sx={{ fontSize: 18 }}>
            <b>Recipe Information</b>
          </Typography>
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
          <Divider style={{ width: 765, borderBottomWidth: 3 }}  />
        </Grid>

        <Grid item>
          <Typography
            component='center'
            style={{
              wordWrap: 'break-word',
              display: 'inline-block',
              whiteSpace: 'pre-line'
            }}
            sx={{ fontSize: 18 }}
          >
            <b>Recipe Ingredients</b>
            {"\n"}
            <CheckIcon sx={{color: "green"}} />
            {` - In Kitchen Stock, `}
            <CloseIcon sx={{color: "red"}} />
            {" - Not in Kitchen Stock"}

          </Typography>
        </Grid>

        <Grid item>
          <TableContainer component={Paper} >
            <Table
              sx={{ minWidth: 650 }}
              aria-label='simple table'
              stickyHeader
            >
              <TableHead>
                <TableRow>
                  <TableCell align='center'>Owned</TableCell>
                  <TableCell align='center'>Ingredient Name</TableCell>
                  <TableCell align='center'>Ingredient Quantity</TableCell>
                  <TableCell align='center'></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.recipe.ingredients.map(currIngredient => {
                  return (
                    <TableRow key={currIngredient.id}>
                      {props.kitchenStockList.some(
                        curr => {
                          return curr.item.toLowerCase() ===
                          currIngredient.name.toLowerCase() &&
                        curr.quantity !== undefined &&
                        curr.quantity !== '0' && curr.quantity !== ""
                        }    

                      ) ? (
                        <>
                          <TableCell align='center' sx={{ color: 'green' }}>
                            <CheckIcon />
                          </TableCell>
                          <TableCell align='center'>
                            {currIngredient.name}
                          </TableCell>
                          <TableCell align='center'>
                            {currIngredient.quantity}
                          </TableCell>
                          <TableCell align='center'>
                            <Button
                              startIcon={<AddIcon />}
                              style={{ border: 'none', outline: 'none' }}
                              onClick={() =>
                                handleAddIngredient(currIngredient)
                              }
                            >
                              Add to Grocery List
                            </Button>
                          </TableCell>
                        </>
                      ) : (
                        <>
                          {/* Not in kitchen stock list*/}
                          <TableCell
                            align='center'
                            size='medium'
                            sx={{ color: 'red' }}
                          >
                            <CloseIcon />
                          </TableCell>
                          <TableCell align='center' sx={{ color: 'red' }}>
                            <i>*{currIngredient.name}</i>
                          </TableCell>
                          <TableCell align='center' sx={{ color: 'red' }}>
                            {currIngredient.quantity}
                          </TableCell>
                          <TableCell align='center'>
                            <Button
                              startIcon={<AddIcon />}
                              style={{ border: 'none', outline: 'none' }}
                              onClick={() =>
                                handleAddIngredient(currIngredient)
                              }
                            >
                              Add to Grocery List
                            </Button>
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item>
          <Divider style={{ width: 765, borderBottomWidth: 3 }}  />
        </Grid>

        <Grid item>
          <Typography
            component='center'
            style={{
              wordWrap: 'break-word',
              display: 'inline-block',
              whiteSpace: 'pre-line'
            }}
            sx={{ fontSize: 18 }}
          >
            <b>Directions</b>
          </Typography>
        </Grid>

        <Grid item sx={{pb: 15}}>
          <Paper
            style={{
              width: 650,
              minHeight: 200,
              paddingBottom: 10,
              overflow: 'auto'
            }}
          >
            <Typography
              style={{
                wordWrap: 'break-word',
                display: 'inline-block',
                whiteSpace: 'pre-line'
              }}
              sx={{ fontSize: 18 }}
            >
              {props.recipe.directions}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={ingredientAdded}
        autoHideDuration={3000}
        onClose={handleClose}
        sx={{ mb: 8 }}
      >
        <Alert
          onClose={handleClose}
          severity='success'
          sx={{ width: '100%' }}
        >
          {currIngredient.name} added to grocery list
        </Alert>
      </Snackbar>
    </>
  )
}

// Used to add or edit recipes
function ManipulateRecipe (props) {
  const [value, setValue] = React.useState('1')
  const [rows, setRows] = useState(
    props.recipe.ingredients ? props.recipe.ingredients : []
  )
  const [currIngredient, setCurrIngredient] = useState({})
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [ingredientName, setIngredientName] = useState('')
  const [ingredientQuantity, setIngredientQuantity] = useState('')

  const [ingredientAdded, setIngredientAdded] = useState(false)
  const [ingredientDeleted, setIngredientDeleted] = useState(false)

  // Add an ingredient to the recipe
  const handleAddIngredient = () => {
    const id = new Date().getTime()

    const newIngredient = {
      id: id,
      name: ingredientName,
      quantity: ingredientQuantity
    }

    let tempArray = [...rows]
    tempArray.push(newIngredient)

    setCurrIngredient(newIngredient)

    setRows(tempArray)
    setIngredientAdded(true)
    setIngredientName('')
    setIngredientQuantity('')
  }

  // If the user edits an ingredient in the recipe
  const handleIngredientChange = (event, ingredient, type) => {
    let temp = rows.map(curr => {
      if (curr.id === ingredient.id) {
        return { ...curr, [type]: event.target.value }
      } else {
        return { ...curr }
      }
    })

    setRows(temp)
  }

  // If the user delete an ingredient in the recipe
  const handleDeleteIngredient = () => {
    const tempArray = rows.filter(curr => {
      if (curr.id !== currIngredient.id) {
        return curr
      }
    })

    setRows(tempArray)
    setOpenDeleteDialog(false)
    setIngredientDeleted(true)
  }

  const handleClosed = () => {
    setOpenDeleteDialog(false)
  }

  // Value of the tabs
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  // Editing the recipe itself
  const handleRecipeChange = (event, keyName) => {
    props.setCurrRecipe({ ...props.recipe, [keyName]: event.target.value })
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setIngredientAdded(false)
    setIngredientDeleted(false)
  }


  // Updating the current ingredients for the recipe
  useEffect(() => {
    props.setCurrRecipe({ ...props.recipe, ingredients: rows })
  }, [rows])

  return (
    <>
      <Box sx={{ width: '100%', typography: 'body1', fontSize: 18 }}>
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

          {/* Recipe Information */}
          <TabPanel value='1'>
            <Grid
              container
              alignContent='center'
              justifyContent='center'
              alignItems='center'
              spacing={5}
            >
              <Grid item>
                <Typography sx={{ fontSize: 18 }}>
                  Enter recipe information below
                </Typography>
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

          {/* Ingredients */}
          <TabPanel value='2'>
            <Grid
              item
              container
              alignContent='center'
              justifyContent='center'
              alignItems='center'
              spacing={3}
            >
              <Grid item>
                <Typography sx={{ fontSize: 18 }}>
                  Enter ingredient name and quantity, and then press add
                </Typography>
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
                    label='Ingredient Name'
                    onChange={e => setIngredientName(e.target.value)}
                    value={ingredientName ? ingredientName : ''}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label='Ingredient Quantity'
                    onChange={e => setIngredientQuantity(e.target.value)}
                    value={ingredientQuantity ? ingredientQuantity : ''}
                  />
                </Grid>

                <Grid item>
                  <Button
                    variant='text'
                    color='primary'
                    style={{ border: 'none', outline: 'none' }}
                    startIcon={<AddIcon>Add Ingredient</AddIcon>}
                    onClick={handleAddIngredient}
                  >
                    Add Ingredient
                  </Button>
                </Grid>
              </Grid>

              <Grid item>
                <Divider style={{ width: 765, borderBottomWidth: 3 }}  />
              </Grid>

              <Grid
                item
                container
                direction='column'
                alignContent='center'
                justifyContent='center'
                alignItems='center'
                spacing={2}
              >
                <Grid item>
                  <Typography
                    style={{
                      wordWrap: 'break-word',
                      display: 'inline-block',
                      whiteSpace: 'pre-line'
                    }}
                    component='center'
                    sx={{ fontSize: 18 }}
                  >
                    Edit the text fields below to change specific ingredient
                    information
                    {'\nNote: Table may be scrollable'}
                  </Typography>
                </Grid>

                <Grid item>
                  <div
                    className='recipeTableDiv'
                    style={{ height: 785, width: 768 }}
                  >
                    <TableContainer
                      component={Paper}
                      style={{ maxHeight: 750 }}
                    >
                      <Table
                        sx={{ minWidth: 650 }}
                        aria-label='simple table'
                        stickyHeader
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell align='center'>
                              Ingredient Name
                            </TableCell>
                            <TableCell align='center'>
                              Ingredient Quantity
                            </TableCell>
                            <TableCell align='center'></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map(currIngredient => {
                            return (
                              <TableRow key={currIngredient.id}>
                                <TableCell align='center'>
                                  <TextField
                                    label='Edit Name'
                                    defaultValue={currIngredient.name}
                                    onChange={e =>
                                      handleIngredientChange(
                                        e,
                                        currIngredient,
                                        'name'
                                      )
                                    }
                                  ></TextField>
                                </TableCell>
                                <TableCell align='center'>
                                  <TextField
                                    label='Edit Quantity'
                                    defaultValue={currIngredient.quantity}
                                    onChange={e =>
                                      handleIngredientChange(
                                        e,
                                        currIngredient,
                                        'quantity'
                                      )
                                    }
                                  ></TextField>
                                </TableCell>
                                <TableCell align='center'>
                                  <Button
                                    startIcon={<DeleteIcon />}
                                    style={{
                                      border: 'none',
                                      outline: 'none',
                                      color: 'black'
                                    }}
                                    onClick={() => {
                                      setCurrIngredient(currIngredient)
                                      setOpenDeleteDialog(true)
                                    }}
                                  />
                                </TableCell>
                              </TableRow>
                            )
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </Grid>
              </Grid>

              {openDeleteDialog ? (
                <Dialog
                  open={openDeleteDialog}
                  onClose={handleClose}
                  aria-labelledby='alert-dialog-title'
                  aria-describedby='alert-dialog-description'
                >
                  <DialogTitle id='alert-dialog-title'>
                    {'Delete Ingredient'}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                      Are you sure that you want to delete {currIngredient.name}
                      ? You cannot reverse this action.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={handleClose}
                      autoFocus
                      color='primary'
                      style={{ border: 'none', outline: 'none' }}
                    >
                      Cancel
                    </Button>
                    <Button
                      color='primary'
                      style={{ border: 'none', outline: 'none' }}
                      onClick={handleDeleteIngredient}
                    >
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
              ) : null}
            </Grid>
          </TabPanel>

          {/* Directions */}
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
                <Typography
                  component='center'
                  style={{
                    wordWrap: 'break-word',
                    display: 'inline-block',
                    whiteSpace: 'pre-line'
                  }}
                  sx={{ fontSize: 18 }}
                >
                  Enter recipe directions below
                  {'\nNote: May be scrollable'}
                </Typography>
              </Grid>
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

      <Snackbar
        open={ingredientAdded}
        autoHideDuration={3000}
        onClose={handleClose}
        sx={{ mb: 8 }}
      >
        <Alert
          onClose={handleClose}
          severity='success'
          sx={{ width: '100%' }}
        >
          {currIngredient.name} has been added
        </Alert>
      </Snackbar>

      <Snackbar
        open={ingredientDeleted}
        autoHideDuration={3000}
        onClose={handleClose}
        sx={{ mb: 8 }}
      >
        <Alert
          onClose={handleClose}
          severity='success'
          sx={{ width: '100%' }}
        >
          {currIngredient.name} has been deleted
        </Alert>
      </Snackbar>
    </>
  )
}

export default function RecipeSubmenu (props) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [currRecipe, setCurrRecipe] = useState({ ...props.recipe })
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
      <div className='RecipeSubmenu'>
        <Grid
          container
          direction='column'
          alignContent='center'
          justifyContent='center'
          alignItems='center'
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
                    style={{ border: 'none', outline: 'none', color: 'green' }}
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
              <ViewRecipe
                recipe={currRecipe}
                handleGroceryAdd={props.handleGroceryAdd}
                kitchenStockList={props.kitchenStockList}
              />
            ) : (
              <ManipulateRecipe
                recipe={currRecipe}
                setCurrRecipe={setCurrRecipe}
              />
            )}
          </Grid>
        </Grid>
      </div>

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
