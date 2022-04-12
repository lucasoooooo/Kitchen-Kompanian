import React, { useState, useEffect } from 'react'

// Local imports
import TableComponent from './Table'
import RecipeSubmenu from './RecipeSubmenu'

// MUI Component Imports
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import QuestionMarkIcon from '@mui/icons-material/Help'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

const Alert = React.forwardRef(function Alert (props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

function Recipies (props) {
  const [viewSubmenu, setViewSubmenu] = useState(false)
  const [recipeName, setRecipeName] = useState('')
  const [currRecipe, setCurrRecipe] = useState({})
  const [lastRecipe, setLastRecipe] = useState({})
  const [viewInfo, setViewInfo] = useState(false)
  const [recipeAdded, setRecipeAdded] = useState(false)
  const [recipeEdited, setRecipeEdited] = useState(false)
  const [recipeDeleted, setRecipeDelete] = useState(false)

  // User has clicked the add recipe button
  const handleAddButtonClicked = () => {
    setViewSubmenu(true)
  }

  // User has clicked the back to list button
  const handleReturnToRecipeMenuButtonClicked = () => {
    setCurrRecipe({})
    setViewSubmenu(false)
  }

  // User has selected a recipe from the table
  const handleRecipeSelected = recipe => {
    setCurrRecipe(recipe)
    setViewSubmenu(true)
  }

  const handleAddRecipe = recipe => {
    let tempArray = [...props.recipes]
    setRecipeName(recipe.name)

    // Check to see if this is an existing recipe
    if (recipe.id) {
      for (let i = 0; i < tempArray.length; i++) {
        if (tempArray[i].id === recipe.id) {
          tempArray[i] = recipe
        }
      }

      // Show the snackbar
      setRecipeEdited(true)

      // Create a brand new recipe and increment the ID counter
    } else {
      recipe.id = new Date().getTime()

      tempArray.push(recipe)

      // Show the snackbar
      setRecipeAdded(true)
    }

    props.handleChangeRecipe(tempArray)
    setViewSubmenu(false)
    setCurrRecipe({})
  }

  /**
   * Delete the currently selected recipe. Filters it from the recipe list
   * and returns the user back to the main table screen.
   */
  const handleDeleteRecipe = name => {
    setRecipeName(name)
    const temp = props.recipes.filter(curr => {
      if (curr.id !== currRecipe.id) {
        return curr
      }
    })

    setRecipeDelete(true)
    props.handleChangeRecipe(temp)
    setViewSubmenu(false)
    setLastRecipe({ ...currRecipe })
    setCurrRecipe({})
  }

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
            <h1 textalign='center'>Recipe List</h1>
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
        <Grid item width='100%'>
          {viewSubmenu ? (
            <RecipeSubmenu
              recipe={currRecipe}
              setRecipe={setCurrRecipe}
              handleReturnToRecipeMenuButtonClicked={
                handleReturnToRecipeMenuButtonClicked
              }
              handleDeleteRecipe={handleDeleteRecipe}
              handleAddRecipe={handleAddRecipe}
              handleGroceryAdd={props.handleGroceryAdd}
              kitchenStockList={props.kitchenStockList}
            />
          ) : (
            <TableComponent
              recipes={props.recipes}
              handleRecipeSelected={handleRecipeSelected}
              handleAddButtonClicked={handleAddButtonClicked}
            />
          )}
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
              {'This is the Recipe List page.\n\nTo view a recipe, simply click on a recipe in the table.\n\nTo add a new recipe, click the "Add Recipe" button and then follow the tabs to enter your recipe information in.\n\n' +
                'To delete a recipe, click on a recipe and then select the "Delete Recipe" button.\n\nTo edit a recipe, click on a recipe and select the "Edit Recipe" button. Then, edit any fields you desire.' +
                "\n\nYou can also search the table based on whether a field contains or doesn't contain a certain keyword. For example, if you don't want to see recipes that are spicy," +
                ' select "Does not contain" from the selection box and type spicy into the search bar.\n\n(Note: as of right now, you can only search for a specific word or specific sequence of words)'}
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

      <Snackbar
        open={recipeAdded}
        autoHideDuration={3000}
        onClose={() => setRecipeAdded(false)}
        sx={{ mb: 8 }}
      >
        <Alert
          onClose={() => setRecipeAdded(false)}
          severity='success'
          sx={{ width: '100%' }}
        >
          {recipeName} has been added
        </Alert>
      </Snackbar>

      <Snackbar
        open={recipeEdited}
        autoHideDuration={3000}
        onClose={() => setRecipeEdited(false)}
        sx={{ mb: 8 }}
      >
        <Alert
          onClose={() => setRecipeEdited(false)}
          severity='success'
          sx={{ width: '100%' }}
        >
          {recipeName} has been edited
        </Alert>
      </Snackbar>

      <Snackbar
        open={recipeDeleted}
        autoHideDuration={3000}
        onClose={() => setRecipeDelete(false)}
        sx={{ mb: 8 }}
      >
        <Alert
          onClose={() => setRecipeDelete(false)}
          severity='success'
          sx={{ width: '100%' }}
        >
          {recipeName} has been deleted
        </Alert>
      </Snackbar>
    </>
  )
}

export default Recipies
