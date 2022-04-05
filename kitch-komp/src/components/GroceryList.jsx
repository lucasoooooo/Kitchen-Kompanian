import React, { Component, useState } from "react";
import { DataGrid, GridToolbar, GridCellParams } from '@mui/x-data-grid';
import Button from "@material-ui/core/Button";
import DeleteIcon from '@mui/icons-material/Delete'
import TextField from '@mui/material/TextField';


var data = [
  { id: 20, item: 'Bread', quantity: '1 Loaf'},
  { id: 21, item: 'Orange Juice', quantity: '1 Gallon'},
  { id: 22, item: 'Sirloin Steaks', quantity: '4'},
];

class GroceryList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      numItems: 0,
      item: '',
      quantity: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectionModelChange = this.handleSelectionModelChange.bind(this);
  }


  componentDidMount() {
    this.setState({
      data: [...data],
      numItems: 23,
      item: '',
      quantity: ''
    });
  }

  handleDelete(id){

    let temp = this.state.data.filter(item => item.id !== id);
    this.setState({
      data: temp
    });
    // console.log(this.state.data)
  }
  

  handleChange(event) {
    const name = event.target.name;
    this.setState({[name]: event.target.value});
    console.log(this.state)
  }

  handleSubmit(event) {

    console.log(this.state)

    event.preventDefault();
    let temp = [
      ...this.state.data
    ];
    temp.push({ id: this.state.numItems, item: this.state.item, quantity: this.state.quantity});
    this.setState({
      data: temp,
      numItems: this.state.numItems+1,
      item: '',
      quantity: ''
    });
  }

  handleSelectionModelChange(newSelectionModel) {
    
    if(newSelectionModel.length !== 0){
      let temp = this.state.data
      for (const id in newSelectionModel){
        // console.log(id)
        // console.log(this.state.data)
        temp = temp.filter(item => item.id === newSelectionModel[id])
      }
      for (const element in temp){
        this.props.onItemSelected(temp[element])
        // console.log(temp[element])
      }
      this.handleDelete(newSelectionModel[0])
    }
  }

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1 textalign='center' style={{color: "white", background: "#343a40",
        paddingTop: '20px', paddingBottom: '20px'}}>Grocery List</h1>
        <span className="horizontal-line" />
        <div className="centerDiv" style={{ height: 675, width: '100%' }}>
          <DataGrid
            rows={this.state.data}
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
                      onClick={() => this.handleDelete(params.id)}>
                      <DeleteIcon className="delete" color="inherit" />
                    </Button>
                  );
                },
              }
            
            ]}
            pageSize={25}
            checkboxSelection
            onRowSelected={this.handleRowSelected}
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
