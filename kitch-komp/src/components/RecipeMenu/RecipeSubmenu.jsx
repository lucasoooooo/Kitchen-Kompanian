import React from 'react'

import { Box, Grid, Paper, Typography, Button } from '@mui/material'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

function FirstRecipeInfo (props) {
  return (
    <Grid container  alignContent='center'
    justifyContent='center'
    alignItems='center' spacing={5}>
      <Grid item>
        <Typography><b>Name:</b> {props.recipe.name}</Typography>
      </Grid>

      <Grid item>
        <Typography><b>Prep Time:</b> {props.recipe.prepTime}</Typography>
      </Grid>

      <Grid item>
        <Typography>Cook Time: {props.recipe.cookTime}</Typography>
      </Grid>

      <Grid item>
        <Typography>Total Time: {props.recipe.totalTime}</Typography>
      </Grid>

      <Grid item>
        <Typography>Serving Size: {props.recipe.servingSize}</Typography>
      </Grid>

      <Grid item>
        <Typography>Recipe Tags: {props.recipe.tags}</Typography>
      </Grid>
    </Grid>
  )
}

export default function RecipeSubmenu (props) {
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

          <Grid item sm>
            
          </Grid>

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
          <FirstRecipeInfo recipe={props.recipe}/>
        </Grid>
      </Grid>
    </Paper>
  )
}
