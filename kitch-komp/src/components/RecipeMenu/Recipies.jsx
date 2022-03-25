import React, { useState, useEffect } from 'react'

// Local imports
import TableComponent from './Table'
import RecipeSubmenu from './RecipeSubmenu'
import {useCustomSnackbar} from "./useCustomSnackbar"

// MUI Component Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

const Alert = React.forwardRef(function Alert (props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

function Recipies (props) {
  const [viewSubmenu, setViewSubmenu] = useState(false)
  const [currRecipe, setCurrRecipe] = useState({})
  const [lastRecipe, setLastRecipe] = useState({})
  const [idCounter, setIdCounter] = useState(4)
  const { isActive, message, openCustomSnackBar } = useCustomSnackbar();
  

  const [recipes, setRecipes] = useState([
    {
      id: 1,
      name: 'Banana Pudding',
      prepTime: '30 Minutes',
      cookTime: '10 Minutes',
      totalTime: '40 Minutes',
      servingSize: '4',
      ingredients: [
        { id: 1, name: 'Banana', quantity: '1' },
        { id: 2, name: 'Pudding', quantity: '1 packet' }
      ],
      directions:
        'Combine the banana and the pudding together. Eat with a large spoon',
      tags: 'Dessert'
    },

    {
      id: 2,
      name: 'Beef Wellington',
      prepTime: '1 Hour',
      cookTime: '45 Minutes',
      totalTime: '1 Hour, 45 Minutes',
      servingSize: '1',
      ingredients: [
        { id: 1, name: 'Beef', quantity: '1' },
        { id: 2, name: 'Wellington', quantity: '1' }
      ],
      directions:
        'Turn on oven to 350F\n\nCombine the Beef and the Wellington together\n\nBake for 45 minutes.',
      tags: 'Dinner'
    },

    {
      id: 3,
      name: 'Baked Salmon',
      prepTime: '5 Minutes',
      cookTime: '10 Minutes',
      totalTime: '15 Minutes',
      servingSize: '2',
      ingredients: [{ id: 1, name: 'Salmon', quantity: '2' }],
      directions:
        'Turn on oven to 350F\n\nPut salmon on baking sheet and cover with aluminum foil\n\nBake for 10 minutes.',
      tags: 'Dinner, Pescetarian'
    },

    {
      id: 4,
      name: 'Corn Bread',
      prepTime: '3 Minutes',
      cookTime: '15 Minutes',
      totalTime: '18 Minutes',
      servingSize: '5',
      ingredients: [
        { id: 1, name: 'Corn', quantity: 'A lot' },
        { id: 2, name: 'Bread', quantity: '1 Loaf' }
      ],
      directions: 'Stuff the loaf of bread full of corn',
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
  }

  const handleAddRecipe = recipe => {
    let tempArray = [...recipes]

    // Check to see if this is an existing recipe
    if (recipe.id) {
      for (let i = 0; i < tempArray.length; i++) {
        if (tempArray[i].id === recipe.id) {
          tempArray[i] = recipe
        }
      }

      openCustomSnackBar(`${recipe.name} has been edited`)

      // Create a brand new recipe and increment the ID counter
    } else {
      recipe.id = idCounter + 1

      tempArray.push(recipe)

      setIdCounter(idCounter + 1)
      openCustomSnackBar(`${recipe.name} has been added`)
    }

    setRecipes(tempArray)
    setViewSubmenu(false)
    setCurrRecipe({})
  }

  /**
   * Delete the currently selected recipe. Filters it from the recipe list
   * and returns the user back to the main table screen.
   */
  const handleDeleteRecipe = name => {
    const temp = recipes.filter(curr => {
      if (curr.id !== currRecipe.id) {
        return curr
      }
    })

    setRecipes(temp)
    setViewSubmenu(false)
    setLastRecipe({ ...currRecipe })
    setCurrRecipe({})
    openCustomSnackBar(`${name} has been deleted`)
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

      <Snackbar open={isActive} message={message}>
      <Alert sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>

      {/* <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          {lastRecipe.name} has been deleted.
        </Alert>
          </Snackbar> */}
    </>
  )
}

export default Recipies
