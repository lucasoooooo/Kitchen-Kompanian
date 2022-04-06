import React, { Component, useState } from "react";
import { DataGrid, GridToolbar, GridCellParams } from '@mui/x-data-grid';
import Button from "@material-ui/core/Button";
import DeleteIcon from '@mui/icons-material/Delete'
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types'
import SearchIcon from '@mui/icons-material/Search'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import ClearIcon from '@mui/icons-material/Clear'
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined'


// var data = [
//   { id: 20, item: 'Bread', quantity: '1 Loaf'},
//   { id: 21, item: 'Orange Juice', quantity: '1 Gallon'},
//   { id: 22, item: 'Sirloin Steaks', quantity: '4'},
// ];

class GroceryList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      item: '',
      quantity: '',
      selectionModel: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectionModelChange = this.handleSelectionModelChange.bind(this);
    this.handleAddToKitchen = this.handleAddToKitchen.bind(this);
  }


  componentDidMount() {
    this.setState({
      item: '',
      quantity: '',
      selectionModel: []
    });
  }

  handleDelete(id){
    
    // console.log(this.props.groceryItems)
    let temp = this.props.groceryItems
    id.forEach(idNum => {
       temp = temp.filter(item => item.id != idNum)
    })
    // let temp = this.props.groceryItems.filter(item => item.id !== id);
    this.props.onGroceryDelete(temp)


    // this.props.onGroceryDelete(whatToKeep)

  }
  

  handleChange(event) {
    const name = event.target.name;
    this.setState({[name]: event.target.value});
    console.log(this.state)
  }

  handleSubmit(event) {

    // console.log(this.state)

    event.preventDefault();
    this.props.onGroceryAdd({ id: this.props.numItems, item: this.state.item, quantity: this.state.quantity})
    this.setState({
      item: '',
      quantity: ''
    });
  }

  handleSelectionModelChange(newSelectionModel) {

    this.setState({
      selectionModel: newSelectionModel
    })
    
  }

  handleAddToKitchen(){
    let listOfItems = []
    if(this.state.selectionModel.length !== 0){
      // console.log(this.state.selectionModel)
      let temp = []
      console.log(temp)
      for (const id in this.state.selectionModel){
        // console.log(id)
        temp = this.props.groceryItems.filter(item => item.id === this.state.selectionModel[id])
        temp.forEach(element => listOfItems.push(element));
      }
      // console.log(listOfItems)
      for (const element in listOfItems){
        this.props.onItemSelected(listOfItems[element])
      }
      // this.handleDelete(this.state.selectionModel[0])
      // this.state.selectionModel.forEach(id => {
        // console.log(id)
      this.handleDelete(this.state.selectionModel)
      // })
    }
    // // console.log(this.state.selectionModel)
    this.setState({
      selectionModel: []
    })
  }

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1 textalign='center' style={{color: "white", background: "#343a40",
        paddingTop: '20px', paddingBottom: '20px'}}>Grocery List</h1>
        <span className="horizontal-line" />
        <div className="centerDiv" style={{ height: 675, width: '100%' }}>
          <DataGrid
            components={{ Toolbar: QuickSearchToolbar }}
            componentsProps={{
              // Interaction between Search Bar and Table
              toolbar: {
                handleAddToKitchen: () => this.handleAddToKitchen()
              }
            }}
            rows={this.props.groceryItems}
            columns={[
              { field: 'item', headerName: 'Grocery Item', width: 420},
              { field: 'quantity', headerName: 'Quantity', width: 200},
              {
                field: 'delete',
                headerName: '',
                width: 80,
                sortable: false,
                headerClassName: 'delete-item-column',
                hideSortIcons: true,
                renderCell: (params) => {
                  return (
                    <Button
                      className="delete-btn"            
                      onClick={() => this.handleDelete([params.id])}>
                      <DeleteIcon className="delete" color="inherit" />
                    </Button>
                  );
                },
              }
            
            ]}
            pageSize={25}
            checkboxSelection
            onRowSelected={this.handleRowSelected}
            selectionModel={this.state.selectionModel}
            onSelectionModelChange={(newSelectionModel) =>  {
              this.handleSelectionModelChange(newSelectionModel);
            }}
          />
        </div>
        <br/>
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
          <br/>
          <br/>
          <Button onClick={this.handleSubmit} type="submit" variant="outlined">Add item</Button>
        </form>
        {/* <Button onClick={this.handleItemChecked} type='check'variant="outlined">Check Items Into Kitchen</Button> */}
      </div>

    );
  }
}

export default GroceryList;

function QuickSearchToolbar (props) {
  return (
    <Grid container sx={{ p: 0.5 }} alignItems='center' alignContent='center'>
      <Grid item sm style={{marginRight:"250px"}}>
      <TextField
          variant='standard'
          placeholder='Search…'
          InputProps={{
            startAdornment: <SearchIcon fontSize='small' />,
            endAdornment: (
              <IconButton
                title='Clear'
                aria-label='Clear'
                size='small'
                style={{ visibility: props.value ? 'visible' : 'hidden' }}
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
          style={{ border: 'none', outline: 'none'}}
          startIcon={<AddIcon>Add Selected Items to Kitchen</AddIcon>}
          onClick={props.handleAddToKitchen}
        >
          Add Selected Items to Kitchen
        </Button>
      </Grid>
    </Grid>
  )
}

QuickSearchToolbar.propTypes = {
  handleAddToKitchen: PropTypes.func.isRequired
}
