import React, { Component, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import Button from "@material-ui/core/Button";

const columns = [
  { field: 'item', headerName: 'Grocery Item', width: 130 },
  { field: 'quantity', headerName: 'Quantity', width: 130 },
  { field: 'isle', headerName: 'Isle Number', width: 130 },
];

var data = [
  { id: 1, item: 'Eggs', quantity: '12', isle: '12' },
  { id: 2, item: 'Milk', quantity: '1 Gallon', isle: '12' },
  { id: 3, item: 'Chicken Breasts', quantity: '4', isle: '6' },
];

class GroceryList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      numItems: 0,
      item: '',
      quantity: '',
      isle: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      data: [...data],
      numItems: 4,
      item: '',
      quantity: '',
      isle: ''
    });
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
    temp.push({ id: this.state.numItems, item: this.state.item, quantity: this.state.quantity, isle: this.state.isle });
    this.setState({
      data: temp,
      numItems: this.state.numItems+1,
      item: '',
      quantity: '',
      isle: ''
    });
  }

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1 textalign='center'>Grocery List</h1>
        <span className="horizontal-line" />
        <div className="centerDiv" style={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={this.state.data}
            columns={columns}
            pageSize={25}
            checkboxSelection
            onRowSelected={this.handleRowSelection}
          />
        </div>
        <br/>
        <form onSubmit={this.handleSubmit}>
          <label style={{ paddingRight: '5px' }} >
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
            <label style={{ paddingRight: '5px' }}>
              Enter Isle #:
              <input 
                type="text" 
                name="isle" 
                value={this.state.isle} 
                onChange={this.handleChange}
              />
            </label>
            <button onClick={this.handleSubmit} type="submit">Submit</button>
        </form>
      </div>

    );
  }
}

export default GroceryList;
