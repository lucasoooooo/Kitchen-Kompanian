import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker.js";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
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
      ],
      recipes: [
        {
          id: 1,
          name: 'Banana Pudding',
          prepTime: '30 Minutes',
          cookTime: '10 Minutes',
          totalTime: '40 Minutes',
          servingSize: '4',
          ingredients: [
            { id: 1, name: 'Banana', quantity: '1' },
            { id: 2, name: 'Pudding', quantity: '1 packet' }
          ],
          directions:
            'Combine the banana and the pudding together. Eat with a large spoon',
          tags: 'Dessert'
        },
    
        {
          id: 2,
          name: 'Beef Wellington',
          prepTime: '1 Hour',
          cookTime: '45 Minutes',
          totalTime: '1 Hour, 45 Minutes',
          servingSize: '1',
          ingredients: [
            { id: 1, name: 'Beef', quantity: '1' },
            { id: 2, name: 'Wellington', quantity: '1' }
          ],
          directions:
            'Turn on oven to 350F\n\nCombine the Beef and the Wellington together\n\nBake for 45 minutes.',
          tags: 'Dinner'
        },
    
        {
          id: 3,
          name: 'Baked Salmon',
          prepTime: '5 Minutes',
          cookTime: '10 Minutes',
          totalTime: '15 Minutes',
          servingSize: '2',
          ingredients: [{ id: 1, name: 'Salmon', quantity: '2' }],
          directions:
            'Turn on oven to 350F\n\nPut salmon on baking sheet and cover with aluminum foil\n\nBake for 10 minutes.',
          tags: 'Dinner, Pescetarian'
        },
    
        {
          id: 4,
          name: 'Corn Bread',
          prepTime: '3 Minutes',
          cookTime: '15 Minutes',
          totalTime: '18 Minutes',
          servingSize: '5',
          ingredients: [
            { id: 1, name: 'Corn', quantity: 'A lot' },
            { id: 2, name: 'Bread', quantity: '1 Loaf' }
          ],
          directions: 'Stuff the loaf of bread full of corn',
          tags: 'Side Dish'
        }
      ]
    }

    this.handleTransfer = this.handleTransfer.bind(this);
    this.handleChangeRecipe = this.handleChangeRecipe.bind(this)
  }

  componentDidMount() {}

  handleTransfer(item) {
    this.setState(prevState => ({
      kitchenStockList: [...prevState.kitchenStockList, item]
    }))
  }

  handleChangeRecipe(changedRecipes) {
    this.setState(prevState => ({
      recipes: [...changedRecipes]
    }))
  }

  handleAddRecipeIngredients(array) {
    this.setState(prevState => ({

    }))
  }

  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<GroceryList onItemSelected={this.handleTransfer} />} />
          <Route path="/kitchenStock" element={<KitchenStock items={this.state.kitchenStockList}/>} />
          <Route path="/recipies" element={<Recipies recipes={this.state.recipes} handleChangeRecipe={this.handleChangeRecipe}/>} />
          <Route path="/myKitchens" element={<MyKitchens />} />
        </Routes>
        <Footer />
      </Router>
    );
  }

}

export default App;

