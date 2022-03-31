import React, { useState } from 'react'
import PropTypes from 'prop-types'

// MUI Component Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { DataGrid } from '@mui/x-data-grid'

// MUI Icon Imports
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import ClearIcon from '@mui/icons-material/Clear'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/MoreVert'
import SearchIcon from '@mui/icons-material/Search'
import { Paper } from '@mui/material'

function escapeRegExp (value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

// Creates the search bar for the DataGrid
function QuickSearchToolbar (props) {
  return (
    <Grid container sx={{ p: 0.5 }} alignItems='center' alignContent='center'>
      <Grid item sm>
        <TextField
          variant='standard'
          value={props.value}
          style={{ paddingRight: 15 }}
          onChange={props.onChange}
          placeholder='Search…'
          InputProps={{
            startAdornment: <SearchIcon fontSize='small' />,
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

QuickSearchToolbar.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  handleAddButtonClicked: PropTypes.func.isRequired
}

export default function QuickFilteringGrid (props) {
  // Search Bar's text state variable
  const [searchText, setSearchText] = useState('')

  // DataGrid rows state variable
  const [rows, setRows] = useState(props.recipes)

  const [currentRow, setCurrentRow] = useState({})

  // The column headers
  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      headerClassName: 'super-app-theme--header'
    },
    // {
    //   field: 'prepTime',
    //   headerName: 'Prep Time',
    //   width: 150,
    //   headerClassName: 'super-app-theme--header'
    // },
    // {
    //   field: 'cookTime',
    //   headerName: 'Cook Time',
    //   width: 150,
    //   headerClassName: 'super-app-theme--header'
    // },
    {
      field: 'totalTime',
      headerName: 'Total Time',
      width: 150,
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'servingSize',
      headerName: 'Serving Size',
      width: 150,
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'tags',
      headerName: 'Recipe Tags',
      width: 153,
      headerClassName: 'super-app-theme--header',
      flex: 1
    },
    // {
    //   field: 'iconButton',
    //   headerName: 'Actions',
    //   width: 150,
    //   headerClassName: 'super-app-theme--header',
    //   renderCell: () => <MenuIcon />
    // }
  ]

  // Filter the recipes based on the requested search
  const requestSearch = searchValue => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')

    const filteredRows = props.recipes.filter(row => {
      return Object.keys(row).some(field => {
        return searchRegex.test(row[field].toString())
      })
    })
    setRows(filteredRows)
  }

  React.useEffect(() => {
    setRows(rows)
  }, [rows])

  return (
    <>
      <Paper
        sx={{
          height: 700,
          width: 768,

          '& .super-app-theme--header': {
            backgroundColor: '#6A994E'
          }
        }}
      >
        <DataGrid
          components={{ Toolbar: QuickSearchToolbar }} // Add the Search Bar
          rows={rows} // Display the rows
          columns={columns} // Display the columns
          rowsPerPageOptions={[]} // Get rid of rows per page option
          componentsProps={{
            // Interaction between Search Bar and Table
            toolbar: {
              value: searchText,
              onChange: event => requestSearch(event.target.value),
              clearSearch: () => requestSearch(''),
              handleAddButtonClicked: () => props.handleAddButtonClicked()
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
      </Paper>
    </>
  )
}
