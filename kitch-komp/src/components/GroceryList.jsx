import React, { Component, useState } from "react";
import { DataGrid, GridToolbar, GridCellParams } from '@mui/x-data-grid';
import Button from "@material-ui/core/Button";
import DeleteIcon from '@mui/icons-material/Delete'

var data = [
  { id: 1, item: 'Eggs', quantity: '12'},
  { id: 2, item: 'Milk', quantity: '1 Gallon'},
  { id: 3, item: 'Chicken Breasts', quantity: '4'},
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
  }


  componentDidMount() {
    this.setState({
      data: [...data],
      numItems: 4,
      item: '',
      quantity: ''
    });
  }

  handleDelete(id){

    let temp = this.state.data.filter(item => item.id !== id);
    this.setState({
      data: temp
    });
    console.log(this.state.data)
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

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1 textalign='center'>Grocery List</h1>
        <span className="horizontal-line" />
        <div className="centerDiv" style={{ height: 760, width: '100%' }}>
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
                renderCell: (params: GridCellParams) => {
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
            onRowSelected={this.handleRowSelection}
          />
        </div>
        <br/>
        <form onSubmit={this.handleSubmit}>
          <label style={{ paddingRight: '20px' }} >
            Enter Item Name:
            <input
              type="text" 
              name="item" 
              value={this.state.item} 
              onChange={this.handleChange}
            />
          </label>
          <label style={{ paddingRight: '5px' }}>
            Enter Quantity:
            <input 
              type="text" 
              name="quantity" 
              value={this.state.quantity} 
              onChange={this.handleChange}
            />
          </label>
          <br/>
          <br/>
          <button onClick={this.handleSubmit} type="submit">Add item</button>
        </form>
      </div>

    );
  }
}

export default GroceryList;
