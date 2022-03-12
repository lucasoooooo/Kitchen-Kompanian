import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import { DataGrid } from '@mui/x-data-grid'
import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'
import MenuIcon from "@mui/icons-material/Menu"

function escapeRegExp (value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

function QuickSearchToolbar (props) {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0
      }}
    >
      <TextField
        variant='standard'
        value={props.value}
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
    </Box>
  )
}

QuickSearchToolbar.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
}

export default function QuickFilteringGrid () {
  const [searchText, setSearchText] = React.useState('')

  const recipes = [
    {
      id: 1,
      name: 'Banana Pudding',
      prepTime: '30 Minutes',
      cookTime: '10 Minutes',
      tags: ['Dessert']
    },

    {
      id: 2,
      name: 'Beef Wellington',
      prepTime: '1 Hour',
      cookTime: '45 Miniutes',
      tags: ['Dinner']
    },

    {
      id: 3,
      name: 'Baked Salmon',
      prepTime: '5 Minutes',
      cookTime: '10 Minutes',
      tags: ['Dinner']
    }
  ]

  const [rows, setRows] = React.useState(recipes)

  const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'prepTime', headerName: 'Prep Time', width: 150 },
    { field: 'cookTime', headerName: 'Cook Time', width: 150 },
    { field: 'tags', headerName: 'Recipe Tags', width: 150 },
    { field: 'iconButton', width: 150, renderCell: () => <MenuIcon /> }
  ]

  const requestSearch = searchValue => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')

    const filteredRows = recipes.filter(row => {
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
    <Box
      sx={{ height: 400, width: 1000 }}
      alignItems='center'
      justifyContent='center'
      alignContent='center'
    >
      <DataGrid
        alignContent='center'
        alignItems='center'
        justifycontent='center'
        components={{ Toolbar: QuickSearchToolbar }}
        rows={rows}
        columns={columns}
        componentsProps={{
          toolbar: {
            value: searchText,
            onChange: event => requestSearch(event.target.value),
            clearSearch: () => requestSearch('')
          }
        }}
      />
    </Box>
  )
}
