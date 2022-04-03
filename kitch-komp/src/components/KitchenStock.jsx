import React, { Component, useState } from "react";
import { DataGrid, GridToolbar, GridCellParams } from '@mui/x-data-grid';
import Button from "@material-ui/core/Button";
import DeleteIcon from '@mui/icons-material/Delete'
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types'

// MUI Component Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

// MUI Icon Imports
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import ClearIcon from '@mui/icons-material/Clear'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/MoreVert'
import SearchIcon from '@mui/icons-material/Search'
import { Paper } from '@mui/material'

var data = [
  { id: 1, item: 'Eggs', quantity: '12', location: 'Refrigerator', expiration:"", allergies: ["Eggs"], owner:[]},
  { id: 2, item: 'Milk', quantity: '1 Gallon', location: "Refrigerator", expiration:"Apr 01 2022", allergies: ["Dairy"], owner:[]},
  { id: 3, item: 'Chicken Breasts', quantity: '4', location:"Refrigerator", expiration:"", allergies:[], owner:[]},
  { id: 4, item: 'Ice Cream', quantity: '4',location: "Fridge", expiration:"",allergies:["Dairy"], owner:[]},
  { id: 5, item: 'Peas', quantity: '4' ,location: "Fridge", expiration:"",allergies:[], owner:[]},
  { id: 6, item: 'Canned Beans', quantity: '4',location: "Pantry", expiration:"",allergies:[], owner:[]},
  { id: 7, item: 'Jasmine Rice', quantity: '4',location: "Pantry", expiration:"",allergies:[], owner:[]},
  { id: 8, item: 'Cookie', quantity: '4' ,location: "Pantry", expiration:"Apr 10 2022",allergies:["Dairy","Nut"], owner:[]},
];
class KitchenStock extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      addView: false,
      numItems: 0,
      item: '',
      quantity: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentDidMount() {
    this.setState({
      data: [...data],
      addView: false,
      numItems: 4,
      item: '',
      quantity: '',
      location:'',
      expiration:'',
      allergies:'',
      owner:''
    });
  }

  handleDelete(id){

    let temp = this.state.data.filter(item => item.id !== id);
    this.setState({
      data: temp
    });
    console.log(this.state.data)
  }
  handleAddView(){
    this.setState({
      addView: true
    });
  }

  handleChange(event) {
    const name = event.target.name;
    this.setState({[name]: event.target.value});
    console.log(this.state)
  }

  handleSubmit(event) {

    console.log(this.state)
    this.setState({
      addView: false
    });
    event.preventDefault();
    let temp = [
      ...this.state.data
    ];
    temp.push({ id: this.state.numItems, item: this.state.item, quantity: this.state.quantity});
    this.setState({
      data: temp,
      numItems: this.state.numItems+1,
      item: '',
      quantity: '',
      location:'',
      expiration:'',
      allergies:'',
      owner:''
    });
  }

  render() {
    return (
      <div>
      <div style={{ textAlign: "center" }}>
        <h1 textalign='center' style={{color: "white", background: "#343a40",
        paddingTop: '20px', paddingBottom: '20px'}}>Kitchen Stock</h1>
        <span className="horizontal-line" />
        <div className="centerDiv" style={{ height: 675, width: '100%' }}>

        {this.state.addView && 
        (<div>
          <h2>Add New Food Item</h2>
          <form onSubmit={this.handleSubmit}>
          <span className='textField'>
            <TextField
              type="text" 
              label="Grocery Item"
              name="item" 
              value={this.state.item} 
              onChange={this.handleChange}
            />
          </span>
          <span className ='textField'>
            <TextField 
              type="text" 
              label="Quantity"
              name="quantity" 
              value={this.state.quantity} 
              onChange={this.handleChange}
            />
          </span>
          <span className='textField'>
            <TextField
              type="text" 
              label="Storage Location"
              name="item" 
              value={this.state.location} 
              onChange={this.handleChange}
            />
          </span>
          <span className='textField'>
            <TextField
              type="text" 
              label="Expiration Date"
              name="item" 
              value={this.state.expiration} 
              onChange={this.handleChange}
              selection
            />
          </span>
          <span className='textField'>
            <TextField
              type="text" 
              label="Allergies"
              name="item" 
              value={this.state.allergies} 
              onChange={this.handleChange}
            />
          </span>
          <span className='textField'>
            <TextField
              type="text" 
              label="Owner"
              name="item" 
              value={this.state.owner} 
              onChange={this.handleChange}
            />
          </span>
          <br/>
          <br/>
          <Button onClick={this.handleSubmit} type="submit" variant="outlined">Add item</Button>
          
        </form>
        </div>)
        }
        { !this.state.addView && (<DataGrid
            components={{ Toolbar: QuickSearchToolbar }}
            componentsProps={{
              // Interaction between Search Bar and Table
              toolbar: {
                handleAddView: () => this.handleAddView()
              }
            }}
            rows={this.state.data}
            columns={[
              { field: 'item', headerName: 'Food Item', width: 200},
              { field: 'quantity', headerName: 'Quantity', width: 100},
              // {
              //   field: 'delete',
              //   headerName: '',
              //   width: 80,
              //   sortable: false,
              //   headerClassName: 'delete-item-column',
              //   hideSortIcons: true,
              //   renderCell: (params) => {
              //     return (
              //       <Button
              //         className="delete-btn"            
              //         onClick={() => this.handleDelete(params.id)}>
              //         <DeleteIcon className="delete" color="inherit" />
              //       </Button>
              //     );
              //   },
              // }
            
            ]}
            pageSize={25}
            // checkboxSelection
            onRowSelected={this.handleRowSelection}
          />)}
        </div>
        <br/>
        
      </div>
      </div>

    );
  }
}

export default KitchenStock;


// Creates the search bar for the DataGrid
function QuickSearchToolbar (props) {
  return (
    <Grid container sx={{ p: 0.5 }} alignItems='center' alignContent='center'>
      <Grid item>
        <Button
          variant='text'
          color='primary'
          style={{ border: 'none', outline: 'none' }}
          startIcon={<AddIcon>Add Recipe</AddIcon>}
          onClick={props.handleAddView}
        >
          Add Recipe
        </Button>
      </Grid>
    </Grid>
  )
}

QuickSearchToolbar.propTypes = {
  handleAddView: PropTypes.func.isRequired
}