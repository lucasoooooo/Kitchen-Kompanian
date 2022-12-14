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
        { id: 2, item: '(Expired) Milk', quantity: '1 Gallon', location: "Refrigerator", expiration:"Apr 1 2022", allergies: ["Dairy"], owner:[]},
        { id: 3, item: 'Chicken Breasts', quantity: '4', location:"Refrigerator", expiration:"", allergies:[], owner:[]},
        { id: 4, item: 'Ice Cream', quantity: '1',location: "Fridge", expiration:"",allergies:["Dairy"], owner:[]},
        { id: 5, item: 'Peas', quantity: '3' ,location: "Fridge", expiration:"",allergies:[], owner:[]},
        { id: 6, item: 'Canned Beans', quantity: '6',location: "Pantry", expiration:"",allergies:[], owner:[]},
        { id: 7, item: 'Jasmine Rice', quantity: '5',location: "Pantry", expiration:"",allergies:[], owner:[]},
        { id: 8, item: 'Cookie', quantity: '9' ,location: "Pantry", expiration:"Apr 25 2022",allergies:["Dairy","Nut"], owner:[]},
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
          tags: 'Dessert, Dairy'
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
          tags: 'Dinner, Meat'
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
          tags: 'Dinner, Seafood'
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
          tags: 'Side Dish, Gluten'
        },
        {
          id: 5,
          name: 'Red Hot Chili',
          prepTime: '20 Minutes',
          cookTime: '1 Hour',
          totalTime: '1 Hour 20 Minutes',
          servingSize: '2',
          ingredients: [
            { id: 1, name: 'Chilis', quantity: '3 whole' },
            { id: 2, name: 'Ground Beef', quantity: '1 lb' },
            { id: 3, name: 'Olive Oil', quantity: '1 Tablespoon' },
            { id: 4, name: 'Yellow Onion (medium)', quantity: '1' },
            { id: 5, name: 'Tomato Sauce (8 oz can)', quantity: '1' }
          ],
          directions: 'Create the chili.\n\nMake it SUPER spicy',
          tags: 'Side Dish, Spicy'
        },
        {id: 6,
          name: 'Vegetable Soup',
          prepTime: '10 Minutes',
          cookTime: '10 minutes',
          totalTime: '20 Minutes',
          servingSize: '3',
          ingredients: [
            { id: 1, name: 'Carrots', quantity: '2' },
            { id: 2, name: 'Onion', quantity: '1' },
            { id: 3, name: 'Peas', quantity: '1/2 lb' },
                     ],
          directions: '1) Cut up all vegetables into bite sized chunks\n\n2) Bring a pot full of water up to a boil\n\n'
           + "3) Add vegetables to boiling water and boil for 10 minutes\n\n4) Serve in a bowl and eat while hot",
          tags: "Vegetarian, Vegan"
        }
      ],
      members: [
        {id: 1 , firstName: 'Evan', lastName: 'Golub', username: 'egolub', allergy: '', },
        {id: 2 , firstName: 'Clyde', lastName: 'Kruskal', username: 'ckrusk', allergy: '', },
        {id: 3,  firstName: 'William', lastName: 'Gasarch', username: 'wgasar', allergy: '', },
        {id: 4, firstName: 'Larry', lastName: 'Herman', username: 'lherm', allergy: '', }
      ],
      groceryList: [],
      numGroceryItems: 21,
    }

    this.handleTransfer = this.handleTransfer.bind(this);
    this.handleChangeRecipe = this.handleChangeRecipe.bind(this)
    this.handleGroceryAdd = this.handleGroceryAdd.bind(this)
    this.handleGroceryDelete = this.handleGroceryDelete.bind(this)
    this.handleKitchenStockSubmit = this.handleKitchenStockSubmit.bind(this)
    this.handleDefaultList = this.handleDefaultList.bind(this)
    this.handleChangeMember = this.handleChangeMember.bind(this)
  }

  presetList = [
    { id: 20, item: 'Bread', quantity: '1 loaf'},
    { id: 21, item: 'Orange Juice', quantity: '1 gallon'},
    { id: 22, item: 'Ground Beef', quantity: '1 lb'},
    { id: 23, item: 'Chicken Breasts', quantity: '4'},
    { id: 24, item: 'Napkins', quantity: '100'},
    { id: 25, item: 'Tomatoes', quantity: '4'},
    { id: 26, item: 'Lettuce', quantity: '1 head'},
    { id: 27, item: 'Pasta', quantity: '1 lb'},
    { id: 28, item: 'Pasta Sauce', quantity: '1 jar'},

  ]

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

  handleGroceryAdd(itemToAdd) {
    this.setState(prevState => ({
      groceryList: [...prevState.groceryList, itemToAdd],
      numGroceryItems: this.state.numGroceryItems+1
    }))
  }

  handleGroceryDelete(temp) {
    // let temp = this.state.groceryList.filter(item => item.id !== id);
    this.setState({
      groceryList: temp
    });
  }
  handleKitchenStockSubmit(item){
    this.setState({
      kitchenStockList: item
    });
  }
  handleDefaultList(){
    this.setState({
      groceryList: this.presetList,
      numGroceryItems: 29
    })
  }

  handleChangeMember(newMembers) {
    this.setState(prevState => ({
      members: [...newMembers]
    }));
  }
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<GroceryList onGroceryAdd={this.handleGroceryAdd} onGroceryDelete={this.handleGroceryDelete}
           onItemSelected={this.handleTransfer} groceryItems={this.state.groceryList} numItems={this.state.numGroceryItems}
           onDefaultList={this.handleDefaultList} />} />
          <Route path="/kitchenStock" element={<KitchenStock items={this.state.kitchenStockList}
           onKitchenStockSubmit={this.handleKitchenStockSubmit}/>} />
          <Route path="/recipies" element={<Recipies recipes={this.state.recipes} kitchenStockList={this.state.kitchenStockList} 
            handleChangeRecipe={this.handleChangeRecipe} handleGroceryAdd={this.handleGroceryAdd}/>} />
          <Route path="/myKitchens" element={<MyKitchens members={this.state.members} handleChangeMember={this.handleChangeMember}/>} />
        </Routes>
        <Footer />
      </Router>
    );
  }

}

export default App;

