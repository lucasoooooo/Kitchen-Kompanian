import React, { useState, useEffect } from 'react'

import TableComponent from './Table'

// MUI Component Imports
import { Grid, Button, Typography } from '@mui/material'
import RecipeSubmenu from './RecipeSubmenu'
import ViewRecipe from './ViewRecipe'

function Recipies (props) {
  const [viewSubmenu, setViewSubmenu] = useState(false)
  const [currRecipe, setCurrRecipe] = useState({})

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
      cookTime: '45 Miniutes',
      totalTime: '1 Hour, 45 Minutes',
      servingSize: '1',
      tags: 'Dinner'
    },

    {
      id: 3,
      name: 'Baked Salmon',
      prepTime: '5 Minutes',
      cookTime: '10 Minutes',
      totalTime: '15 Minutes',
      servingSize: '2',
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
  const handleRecipeSelected = (recipe) => {
    setCurrRecipe(recipe)
    setViewSubmenu(true)
    console.log(recipe)
  }

  return (
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
        <Typography compontent='center' variant='body1'>
          Select a recipe below to view, edit, or delete it.
        </Typography>
      </Grid>

      <Grid item>
        {viewSubmenu ? (
          <RecipeSubmenu recipe={currRecipe}  handleReturnToRecipeMenuButtonClicked={handleReturnToRecipeMenuButtonClicked} />
        ) : (
          <TableComponent recipes={recipes} handleRecipeSelected={handleRecipeSelected} handleAddButtonClicked={handleAddButtonClicked} />
        )}
      </Grid>
    </Grid>
  )
}

export default Recipies
