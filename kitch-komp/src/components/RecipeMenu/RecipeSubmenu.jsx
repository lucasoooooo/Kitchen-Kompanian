import React, { useEffect, useState } from 'react'
import { useCustomSnackbar } from './useCustomSnackbar'

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

import { DataGrid } from '@mui/x-data-grid'
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
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'

const Alert = React.forwardRef(function Alert (props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

// Used to display recipes
function ViewRecipe (props) {
  const { isActive, message, openCustomSnackBar } = useCustomSnackbar()

  const handleAddIngredient = ingredient => {
    const id = new Date().getTime()
    const ingredientToAdd = {
      id: id,
      item: ingredient.name,
      quantity: ingredient.quantity
    }

    props.handleGroceryAdd(ingredientToAdd)

    openCustomSnackBar(`${ingredient.name} has been added to the grocery list`)
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

        <Grid item>
          <Divider style={{ width: 760 }} />
        </Grid>

        <Grid item>
          <Typography>
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
          <Divider style={{ width: 760 }} />
        </Grid>

        <Grid item>
          <Typography>
            <b>Recipe Ingredients</b>
          </Typography>
        </Grid>

        <Grid item>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>Ingredient Name</TableCell>
                  <TableCell align='center'>Ingredient Quantity</TableCell>
                  <TableCell align='center'></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.recipe.ingredients.map(currIngredient => {
                  return (
                    <TableRow key={currIngredient.id}>
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
                          onClick={() => handleAddIngredient(currIngredient)}
                        >
                          Add to Grocery List
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item>
          <Divider style={{ width: 760 }} />
        </Grid>

        <Grid item>
          <Typography>
            <b>Directions</b>
          </Typography>
        </Grid>

        <Grid item>
          <Paper style={{ width: 650, height: 400 }}>
            <Typography
              style={{
                wordWrap: 'break-word',
                display: 'inline-block',
                whiteSpace: 'pre-line'
              }}
            >
              {props.recipe.directions}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar open={isActive} message={message}>
        <Alert sx={{ width: '100%' }}>{message}</Alert>
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
  const { isActive, message, openCustomSnackBar } = useCustomSnackbar()

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      headerClassName: 'super-app-theme--header',
      flex: 1,
      editable: true,

    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 150,
      headerClassName: 'super-app-theme--header',
      flex: 1,
      editable: true,
     
    },
    {
      field: 'delete',
      headerName: '',
      width: 80,
      sortable: false,
      headerClassName: 'delete-item-column',
      hideSortIcons: true,
      renderCell: params => {
        return (
          <Button
            className='delete-btn'
            onClick={() => setOpenDeleteDialog(true)}
          >
            <DeleteIcon className='delete' style={{color: "black"}} />
          </Button>
        )
      },
      editable: false
    }
  ]

  const handleAddIngredient = () => {
    const id = new Date().getTime()

    const newIngredient = {
      id: id,
      name: ingredientName,
      quantity: ingredientQuantity
    }

    let tempArray = [...rows]
    tempArray.push(newIngredient)

    setRows(tempArray)
    setIngredientName('')
    setIngredientQuantity('')
  }

  const handleIngredientSelected = ingredient => {
    if (ingredient) {
      setCurrIngredient(ingredient)
    }
  }

  const handleIngredientChange = (value, event) => {
    console.log(value, event)
    let temp = rows.map(curr => {
      if (curr.id === value.id) {
        return { ...curr, [value.field]: value.value }
      } else {
        return { ...curr }
      }
    })

    setRows(temp)
  }

  const handleDeleteIngredient = () => {
    let name = ''

    const tempArray = rows.filter(curr => {
      if (curr.id !== currIngredient.id) {
        return curr
      } else {
        name = curr.name
      }
    })

    openCustomSnackBar(`${name} has been deleted`)
    setRows(tempArray)
    setOpenDeleteDialog(false)
    setCurrIngredient({})
  }

  const handleClosed = () => {
    setOpenDeleteDialog(false)
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleRecipeChange = (event, keyName) => {
    props.setCurrRecipe({ ...props.recipe, [keyName]: event.target.value })
  }

  useEffect(() => {
    props.setCurrRecipe({ ...props.recipe, ingredients: rows })
  }, [rows])

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
                <Typography>Enter recipe information below</Typography>
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
                <Typography>
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
                <Divider sx={{ width: 500 }} />
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
                  <Typography>
                    Double tap on a cell in the table below to edit it
                  </Typography>
                </Grid>

                <Grid item>
                  <div
                    className='recipeTableDiv'
                    style={{ height: 785, width: 768 }}
                  >
                    <DataGrid
                      experimentalFeatures={{ newEditingApi: true }}
                      rows={rows} // Display the rows
                      columns={columns} // Display the columns
                      rowsPerPageOptions={[]} // Get rid of rows per page option
                      onSelectionModelChange={ids => {
                        if (rows) {
                          const selectedRowData = rows.filter(row => {
                            if (row.id == ids) {
                              return row
                            }
                          })
                          handleIngredientSelected(selectedRowData[0])
                        }
                      }}
                      onCellEditCommit={(v, e) => handleIngredientChange(v, e)}
                    />
                  </div>
                </Grid>
              </Grid>

              {openDeleteDialog ? (
                <Dialog
                  open={openDeleteDialog}
                  onClose={handleClosed}
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
                <Typography>Enter recipe directions below</Typography>
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
      <Snackbar open={isActive} message={message}>
        <Alert sx={{ width: '100%' }}>{message}</Alert>
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
                    style={{ border: 'none', outline: 'none', color: "green" }}
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
              <ViewRecipe recipe={currRecipe} handleGroceryAdd={props.handleGroceryAdd} />
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
