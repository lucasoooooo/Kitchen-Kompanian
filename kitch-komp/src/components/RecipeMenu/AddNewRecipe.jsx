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

// function FirstRecipeInfo (props) {
//   const handleChange = (event, key) => {
//     console.log(event.target.value, key)
//   }

//   const saveNewRecipe = () => {
//     props.handleAddRecipe()
//   }

//   return (
//     <Grid
//       container
//       alignContent='center'
//       direction='column'
//       justifyContent='center'
//       alignItems='center'
//       spacing={5}
//     >
//       <Grid
//         item
//         container
//         direction='column'
//         alignContent='center'
//         justifyContent='center'
//         alignItems='center'
//         spacing={5}
//       >
//         <Grid
//           item
//           container
//           direction='column'
//           alignContent='center'
//           justifyContent='center'
//           alignItems='center'
//           spacing={5}
//           xs={4}
//         >
//           <Grid item>
//             <Typography>
//               <b>Recipe Information</b>
//             </Typography>
//           </Grid>
//           <Grid item>
//             {props.recipe.name !== undefined ? (
//               <Typography>
//                 <b>Name:</b> {props.recipe.name}
//               </Typography>
//             ) : (
//               <TextField
//                 label='Recipe Name'
//                 onChange={v => handleChange(v, 'name')}
//               >
//                 {props.edit === true ? props.recipe.name : ''}
//               </TextField>
//             )}
//           </Grid>

//           <Grid item>
//             {props.recipe.prepTime !== undefined ? (
//               <Typography>
//                 <b>Prep Time:</b> {props.recipe.prepTime}
//               </Typography>
//             ) : (
//               <TextField label='Prep Time'>
//                 {props.edit === true ? props.recipe.prepTime : ''}
//               </TextField>
//             )}
//           </Grid>

//           <Grid item>
//             {props.recipe.cookTime !== undefined ? (
//               <Typography>
//                 <b>Cook Time:</b> {props.recipe.cookTime}
//               </Typography>
//             ) : (
//               <TextField label='Cook Time'>
//                 {props.edit === true ? props.recipe.cookTime : ''}
//               </TextField>
//             )}
//           </Grid>

//           <Grid item>
//             {props.recipe.totalTime !== undefined ? (
//               <Typography>
//                 <b>Total Time:</b> {props.recipe.totalTime}
//               </Typography>
//             ) : (
//               <TextField label='Total Time'>
//                 {props.edit === true ? props.recipe.totalTime : ''}
//               </TextField>
//             )}
//           </Grid>

//           <Grid item>
//             {props.recipe.servingSize !== undefined ? (
//               <Typography>
//                 <b>Serving Size:</b> {props.recipe.servingSize}
//               </Typography>
//             ) : (
//               <TextField label='Serving Size'>
//                 {props.edit === true ? props.recipe.servingSize : ''}
//               </TextField>
//             )}
//           </Grid>

//           <Grid item>
//             {props.recipe.tags !== undefined ? (
//               <Typography>
//                 <b>Recipe Tags:</b> {props.recipe.tags}
//               </Typography>
//             ) : (
//               <TextField label='Recipe Tags'>
//                 {props.edit === true ? props.recipe.tags : ''}
//               </TextField>
//             )}
//           </Grid>
//         </Grid>

//         <Grid
//           item
//           container
//           direction='column'
//           alignContent='center'
//           justifyContent='center'
//           alignItems='center'
//           spacing={5}
//           xs={4}
//         >
//           <Grid item>
//             <Typography>
//               <b>Ingredients</b>
//             </Typography>
//           </Grid>

//           {props.recipe.name === undefined ? (
//             <Grid item>
//               <Button
//                 startIcon={
//                   <AddIcon style={{ border: 'none', outline: 'none' }} />
//                 }
//               >
//                 Add Ingredient
//               </Button>
//             </Grid>
//           ) : null}

//           <Grid item>
//             {props.recipe.name !== undefined ? (
//               <Typography>
//                 {props.recipe.ingredients[0].name} -{' '}
//                 {props.recipe.ingredients[0].quantity}
//               </Typography>
//             ) : (
//               <TextField label='Ingredient 1'></TextField>
//             )}
//           </Grid>
//         </Grid>

//         <Grid
//           container
//           item
//           direction='column'
//           alignContent='center'
//           justifyContent='center'
//           alignItems='center'
//           spacing={5}
//           xs={4}
//         >
//           <Grid item>
//             <Typography>
//               <b>Directions</b>
//             </Typography>
//           </Grid>

//           <Grid item>
//             <TextareaAutosize style={{ width: 300, height: 500 }}>
//               {props.recipe.directions}
//             </TextareaAutosize>
//           </Grid>
//         </Grid>
//       </Grid>

//       <Grid item>
//         <Button
//           variant='contained'
//           onClick={saveNewRecipe}
//           style={{ border: 'none', outline: 'none' }}
//         >
//           Save
//         </Button>
//       </Grid>
//     </Grid>
//   )
// }

// // Used to add or edit recipes
// function ManipulateRecipe (props) {
//   const [value, setValue] = React.useState('1')

//   const handleChange = (event, newValue) => {
//     setValue(newValue)
//   }

//   const handleRecipeChange = (event, keyName) => {
//     console.log(event.target.value, keyName)
//     //props.setCurrRecipe({...props.recipe, keyName: event.target.value})
//   }

//   return (
//     <>
//       <Box sx={{ width: '100%', typography: 'body1' }}>
//         <TabContext value={value}>
//           <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//             <TabList
//               onChange={handleChange}
//               aria-label='add-edit-recipes'
//               variant='fullWidth'
//               centered
//             >
//               <Tab
//                 label='Recipe Information'
//                 value='1'
//                 style={{ border: 'none', outline: 'none' }}
//               />
//               <Tab
//                 label='Ingredients'
//                 value='2'
//                 style={{ border: 'none', outline: 'none' }}
//               />
//               <Tab
//                 label='Directions'
//                 value='3'
//                 style={{ border: 'none', outline: 'none' }}
//               />
//             </TabList>
//           </Box>
//           <TabPanel value='1'>
//             <Grid
//               container
//               alignContent='center'
//               justifyContent='center'
//               alignItems='center'
//               spacing={5}
//             >
//               <Grid
//                 item
//                 container
//                 alignContent='center'
//                 justifyContent='center'
//                 alignItems='center'
//                 spacing={5}
//               >
//                 <Grid item>
//                   <TextField
//                     label='Recipe Name'
//                     defaultValue={props.recipe.name ? props.recipe.name : ''}
//                     onChange={e => handleRecipeChange(e, 'name')}
//                   />
//                 </Grid>

//                 <Grid item>
//                   <TextField
//                     label='Prep Time'
//                     defaultValue={
//                       props.recipe.prepTime ? props.recipe.prepTime : ''
//                     }
//                     onChange={e => handleRecipeChange(e, 'prepTime')}
//                   />
//                 </Grid>
//               </Grid>

//               <Grid
//                 item
//                 container
//                 alignContent='center'
//                 justifyContent='center'
//                 alignItems='center'
//                 spacing={5}
//               >
//                 <Grid item>
//                   <TextField
//                     label='Cook Time'
//                     defaultValue={
//                       props.recipe.cookTime ? props.recipe.cookTime : ''
//                     }
//                     onChange={e => handleRecipeChange(e, 'cookTime')}
//                   />
//                 </Grid>

//                 <Grid item>
//                   <TextField
//                     label='Total Time'
//                     defaultValue={
//                       props.recipe.totalTime ? props.recipe.totalTime : ''
//                     }
//                     onChange={e => handleRecipeChange(e, 'totalTime')}
//                   />
//                 </Grid>
//               </Grid>

//               <Grid
//                 item
//                 container
//                 alignContent='center'
//                 justifyContent='center'
//                 alignItems='center'
//                 spacing={5}
//               >
//                 <Grid item>
//                   <TextField
//                     label='Serving Size'
//                     defaultValue={
//                       props.recipe.servingSize ? props.recipe.servingSize : ''
//                     }
//                     onChange={e => handleRecipeChange(e, 'servingSize')}
//                   />
//                 </Grid>

//                 <Grid item>
//                   <TextField
//                     label='Recipe Tags'
//                     defaultValue={props.recipe.tags ? props.recipe.tags : ''}
//                     onChange={e => handleRecipeChange(e, 'tags')}
//                   />
//                 </Grid>
//               </Grid>
//             </Grid>
//           </TabPanel>
//           <TabPanel value='2'>
//             <Grid
//               item
//               container
//               alignContent='center'
//               justifyContent='center'
//               alignItems='center'
//               spacing={5}
//             >
//               <CreateIngredientQuantity recipe={props.recipe} />
//             </Grid>
//           </TabPanel>
//           <TabPanel value='3'>
//             <Grid i>
//               <TextareaAutosize
//                 defaultValue={
//                   props.recipe.directions ? props.recipe.directions : ''
//                 }
//               ></TextareaAutosize>
//             </Grid>
//           </TabPanel>
//         </TabContext>
//       </Box>
//       <Grid
//         container
//         alignContent='center'
//         direction='column'
//         justifyContent='center'
//         alignItems='center'
//         width={768}
//         spacing={5}
//       >
//         {/* <Grid item>
//           <Typography>Recipe Information</Typography>
//         </Grid> */}
//         {/* <Grid
//           item
//           container
//           alignContent='center'
//           justifyContent='center'
//           alignItems='center'
//           spacing={5}
//         >
//           <Grid item>
//             <TextField
//               label='Recipe Name'
//               defaultValue={props.recipe.name ? props.recipe.name : ''}
//             />
//           </Grid>

//           <Grid item>
//             <TextField
//               label='Prep Time'
//               defaultValue={props.recipe.prepTime ? props.recipe.prepTime : ''}
//             />
//           </Grid>

//           <Grid item>
//             <TextField
//               label='Cook Time'
//               defaultValue={props.recipe.cookTime ? props.recipe.cookTime : ''}
//             />
//           </Grid>
//         </Grid>

//         <Grid
//           item
//           container
//           alignContent='center'
//           justifyContent='center'
//           alignItems='center'
//           spacing={5}
//         >
//           <Grid item>
//             <TextField
//               label='Total Time'
//               defaultValue={
//                 props.recipe.totalTime ? props.recipe.totalTime : ''
//               }
//             />
//           </Grid>

//           <Grid item>
//             <TextField
//               label='Serving Size'
//               defaultValue={
//                 props.recipe.servingSize ? props.recipe.servingSize : ''
//               }
//             />
//           </Grid>

//           <Grid item>
//             <TextField
//               label='Recipe Tags'
//               defaultValue={props.recipe.tags ? props.recipe.tags : ''}
//             />
//           </Grid>
//         </Grid> */}

//         {/* <Grid item>
//           <Divider style={{ width: 760 }} />
//         </Grid>

//         <Grid item>
//           <Typography>Ingredients</Typography>
//         </Grid> */}

//         {/* <Grid
//           item
//           container
//           alignContent='center'
//           justifyContent='center'
//           alignItems='center'
//           spacing={5}
//         >
//           <CreateIngredientQuantity recipe={props.recipe} />
//         </Grid> */}
//         {/* 
//         <Grid item>
//           <Divider style={{ width: 768 }} />
//         </Grid>

//         <Grid item>
//           <Typography>Directions</Typography>
//         </Grid>

//         <Grid item>
//           <TextareaAutosize
//             defaultValue={
//               props.recipe.directions ? props.recipe.directions : ''
//             }
//           ></TextareaAutosize>
//         </Grid> */}

//         {/* <Grid item>
//           <Button variant='contained'>Save</Button>
//         </Grid> */}
//       </Grid>
//     </>
//   )
// }
