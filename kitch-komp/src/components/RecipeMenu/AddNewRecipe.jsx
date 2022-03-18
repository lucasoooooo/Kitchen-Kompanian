import React from 'react'

import { Box, Grid, Paper, Typography, Button, TextField } from '@mui/material'

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
      <Grid
        item
        container
        alignContent='center'
        justifyContent='center'
        alignItems='center'
        spacing={5}
      >
        <Grid item>
          {props.recipe !== undefined ? (
            <Typography>
              <b>Name:</b> {props.recipe.name}
            </Typography>
          ) : (
            <TextField label='Recipe Name'>
              {props.edit === true ? props.recipe.name : ''}
            </TextField>
          )}
        </Grid>

        <Grid item>
          {props.recipe !== undefined ? (
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
          {props.recipe !== undefined ? (
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
          {props.recipe !== undefined ? (
            <Typography>
              <b>Total Time:</b> {props.recipe.totalTime}
            </Typography>
          ) : (
            <TextField label='Total Time'>
              {props.edit === true ? props.recipe.totalTime : ''}
            </TextField>
          )}
        </Grid>
      </Grid>

      {/* <Grid item>
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
      </Grid> */}
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

          <Grid item sm></Grid>

         
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
    </Paper>
  )
}
