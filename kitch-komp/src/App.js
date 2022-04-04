import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Footer,
  GroceryList,
  KitchenStock,
  Recipies,
  MyKitchens,
} from "./components";
import { Component } from "react";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      kitchenStockList: [
        { id: 1, item: 'Eggs', quantity: '12', location: 'Refrigerator', expiration:"", allergies: ["Eggs"], owner:[]},
        { id: 2, item: 'Milk', quantity: '1 Gallon', location: "Refrigerator", expiration:"Apr 01 2022", allergies: ["Dairy"], owner:[]},
        { id: 3, item: 'Chicken Breasts', quantity: '4', location:"Refrigerator", expiration:"", allergies:[], owner:[]},
        { id: 4, item: 'Ice Cream', quantity: '1',location: "Fridge", expiration:"",allergies:["Dairy"], owner:[]},
        { id: 5, item: 'Peas', quantity: '3' ,location: "Fridge", expiration:"",allergies:[], owner:[]},
        { id: 6, item: 'Canned Beans', quantity: '6',location: "Pantry", expiration:"",allergies:[], owner:[]},
        { id: 7, item: 'Jasmine Rice', quantity: '5',location: "Pantry", expiration:"",allergies:[], owner:[]},
        { id: 8, item: 'Cookie', quantity: '9' ,location: "Pantry", expiration:"Apr 10 2022",allergies:["Dairy","Nut"], owner:[]},
      ]
    }

    this.handleTransfer = this.handleTransfer.bind(this);
  }

  componentDidMount() {}

  handleTransfer(item) {
    this.setState(prevState => ({
      kitchenStockList: [...prevState.kitchenStockList, item]
    }))
  }

  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<GroceryList onItemSelected={this.handleTransfer} />} />
          <Route path="/kitchenStock" element={<KitchenStock items={this.state.kitchenStockList}/>} />
          <Route path="/recipies" element={<Recipies />} />
          <Route path="/myKitchens" element={<MyKitchens />} />
        </Routes>
        <Footer />
      </Router>
    );
  }

}

export default App;

