import React, { useState, useEffect } from 'react'

// Local imports
import TableComponent from './Table'
import RecipeSubmenu from './RecipeSubmenu'

// MUI Component Imports
import { Grid, Typography } from '@mui/material'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Recipies (props) {
  const [viewSubmenu, setViewSubmenu] = useState(false)
  const [currRecipe, setCurrRecipe] = useState({})
  const [lastRecipe, setLastRecipe] = useState({})
  const [open, setOpen] = React.useState(false);
  const [idCounter, setIdCounter] = useState(4)
  let recipeName = ""

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const [recipes, setRecipes] = useState([
    {
      id: 1,
      name: 'Banana Pudding',
      prepTime: '30 Minutes',
      cookTime: '10 Minutes',
      totalTime: '40 Minutes',
      servingSize: '4',
      tags: 'Dessert'
    },

    {
      id: 2,
      name: 'Beef Wellington',
      prepTime: '1 Hour',
      cookTime: '45 Minutes',
      totalTime: '1 Hour, 45 Minutes',
      servingSize: '1',
      ingredients: [{name: "Beef", quantity: "1"}, {name: "Wellington", quantity: "1"}],
      directions: "Turn on oven to 350F\n\nCombine the Beef and the Wellington together\n\nBake for 45 minutes.",
      tags: 'Dinner'
    },

    {
      id: 3,
      name: 'Baked Salmon',
      prepTime: '5 Minutes',
      cookTime: '10 Minutes',
      totalTime: '15 Minutes',
      servingSize: '2',
      ingredients: [{name: "Salmon", quantity: "2"}],
      directions: "Turn on oven to 350F\n\nPut salmon on baking sheet and cover with aluminum foil\n\nBake for 10 minutes.",
      tags: 'Dinner, Pescetarian'
    },

    {
      id: 4,
      name: 'Corn Bread',
      prepTime: '3 Minutes',
      cookTime: '15 Minutes',
      totalTime: '18 Minutes',
      servingSize: '5',
      tags: 'Side Dish'
    }
  ])

  // User has clicked the add recipe button
  const handleAddButtonClicked = () => {
    setViewSubmenu(true)
  }

  // User has clicked the back to list button
  const handleReturnToRecipeMenuButtonClicked = () => {
    setViewSubmenu(false)
    setCurrRecipe({})
  }

  // User has selected a recipe from the table
  const handleRecipeSelected = recipe => {
    setCurrRecipe(recipe)
    setViewSubmenu(true)
    console.log(recipe)
  }

  const handleAddRecipe = recipe => {
    recipe.id = idCounter + 1
    
    let temp = [...recipes]
    temp.push(recipe)

    setRecipes(temp)
    setIdCounter(idCounter + 1)
  }

  /**
   * Delete the currently selected recipe. Filters it from the recipe list
   * and returns the user back to the main table screen.
   */
  const handleDeleteRecipe = (name) => {
    recipeName = name
    const temp = recipes.filter(curr => {
      if (curr.id !== currRecipe.id) {
        return curr
      }
    })

    setOpen(true)
    setRecipes(temp)
    setViewSubmenu(false)
    setLastRecipe({...currRecipe})
    setCurrRecipe({})
  }

  return (
    <>
      <Grid
        container
        direction='column'
        alignContent='center'
        justifyContent='center'
        alignItems='center'
        spacing={5}
      >
        <Grid item>
          <Typography compontent='center' variant='h3'>
            Recipe List
          </Typography>
        </Grid>

        {/* <Grid item>
          <Typography compontent='center' variant='body1'>
            Select a recipe below to view, edit, or delete it.
          </Typography>
        </Grid> */}

        <Grid item>
          {viewSubmenu ? (
            <RecipeSubmenu
              recipe={currRecipe}
              setRecipe={setCurrRecipe}
              handleReturnToRecipeMenuButtonClicked={
                handleReturnToRecipeMenuButtonClicked
              }
              handleDeleteRecipe={handleDeleteRecipe}
              handleAddRecipe={handleAddRecipe}
            />
          ) : (
            <TableComponent
              recipes={recipes}
              handleRecipeSelected={handleRecipeSelected}
              handleAddButtonClicked={handleAddButtonClicked}
            />
          )}
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          {lastRecipe.name} has been deleted.
        </Alert>
      </Snackbar>
    </>
  )
}

export default Recipies
