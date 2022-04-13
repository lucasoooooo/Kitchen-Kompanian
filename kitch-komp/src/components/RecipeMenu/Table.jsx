import React, { useState } from 'react'
import PropTypes from 'prop-types'

// MUI Component Imports
import Button from '@mui/material/Button'
import { DataGrid } from '@mui/x-data-grid'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

// MUI Icon Imports
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import ClearIcon from '@mui/icons-material/Clear'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import { useEffect } from 'react'

function escapeRegExp (value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

// Creates the search bar for the DataGrid
function QuickSearchToolbar (props) {
  return (
    <Grid container sx={{ p: 0.5 }} alignItems='center' alignContent='center'>
      <Grid item sm>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <TextField
            variant='standard'
            value={props.value}
            style={{ paddingRight: 15 }}
            onChange={props.onChange}
            placeholder='Search…'
            InputProps={{
              startAdornment: (
                <>
                  <SearchIcon fontSize="small"/>
                  <select onChange={props.setSearchType}>
                    <option value='contains'>Contains</option>
                    <option value='doesNotContain'>Does not contain</option>
                  </select>
                </>
              ),
              endAdornment: (
                <IconButton
                  title='Clear'
                  aria-label='Clear'
                  size='small'
                  style={{ visibility: props.value ? 'visible' : 'hidden' }}
                  onClick={props.clearSearch}
                >
                  <ClearIcon fontSize='small' />
                </IconButton>
              )
            }}
            sx={{
              width: {
                xs: 1,
                sm: 'auto'
              },
              m: theme => theme.spacing(1, 0.5, 1.5),
              '& .MuiSvgIcon-root': {
                mr: 0.5
              },
              '& .MuiInput-underline:before': {
                borderBottom: 1,
                borderColor: 'divider'
              }
            }}
          />
        </Box>
      </Grid>

      <Grid item>
        <Button
          variant='text'
          color='primary'
          style={{ border: 'none', outline: 'none' }}
          startIcon={<AddIcon>Add Recipe</AddIcon>}
          onClick={props.handleAddButtonClicked}
        >
          Add Recipe
        </Button>
      </Grid>
    </Grid>
  )
}

// The props that the QuickSearchToolbar expects
QuickSearchToolbar.propTypes = {
  setSearchType: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  handleAddButtonClicked: PropTypes.func.isRequired
}

export default function QuickFilteringGrid (props) {
  // Search Bar's text state variable
  const [searchText, setSearchText] = useState('')
  const [searchType, setSearchType] = useState('contains')

  // DataGrid rows state variable
  const [rows, setRows] = useState(props.recipes)

  // The column headers
  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      headerClassName: 'super-app-theme--header',
      flex: 1
    },
    {
      field: 'totalTime',
      headerName: 'Total Time',
      width: 150,
      headerClassName: 'super-app-theme--header',
      flex: 1
    },
    {
      field: 'servingSize',
      headerName: 'Serving Size',
      width: 125,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'tags',
      headerName: 'Recipe Tags',
      width: 153,
      headerClassName: 'super-app-theme--header',
      flex: 1
    }
  ]

  // Filter the recipes based on the requested search
  const requestSearch = searchValue => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')

    const filteredRows = props.recipes.filter(row => {
      let value = Object.keys(row).some(field => {
        return searchRegex.test(row[field].toString())
      })

      // If we want the row to contain the search value
      if (searchType === 'contains' && value === true) {
        return row

        // If we don't want the row to contain the search value
      } else if (searchType === 'doesNotContain' && value === false) {
        return row

        // If the search value is blank return all rows
      } else if (searchValue === '') {
        return row
      }
    })
    setRows(filteredRows)
  }

  useEffect(() => {
    requestSearch(searchText)
  }, [searchType])

  // Updates the DataGrid's rows when changed
  React.useEffect(() => {
    setRows(rows)
  }, [rows])

  return (
    <>
      <div className='recipeTableDiv' style={{ height: 1102, width: '100%' }}>
        <DataGrid
          components={{ Toolbar: QuickSearchToolbar }} // Add the Search Bar
          rows={rows} // Display the rows
          columns={columns} // Display the columns
          pageSize={25}
          componentsProps={{
            // Interaction between Search Bar and Table
            toolbar: {
              value: searchText,
              onChange: event => requestSearch(event.target.value),
              clearSearch: () => requestSearch(''),
              handleAddButtonClicked: () => props.handleAddButtonClicked(),
              setSearchType: event => setSearchType(event.target.value)
            }
          }}
          onSelectionModelChange={ids => {
            const selectedRowData = rows.filter(row => {
              if (row.id == ids) {
                return row
              }
            })
            props.handleRecipeSelected(selectedRowData[0])
          }}
        />
      </div>
    </>
  )
}
