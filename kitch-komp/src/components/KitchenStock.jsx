import React from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function KitchenStock() {
  // These food items will later come from useState's
  // TODO: Remove these
  const refrig_things = [{name:"Bread", qty:"1 Loaf"}, {name:"Mayo", qty:"-"}, {name:"Ham",qty:"-"}]
  const freezer_things = [{name:"Icecream", qty:"-"}, {name:"Peas", qty:"1 bag"}]
  const pantry_things = [{name:"Captain Crunch", qty:"-"}, {name:"Peanut Butter", qty:"-"}]

  const refrig_element = refrig_things.map(function(p){
      return (
          <nav className="food-item">
              <h3>{p.name}</h3>
              <h3>{p.qty}</h3>
              <MoreHorizIcon className="edit"/>
          </nav>)
  })
  const freezer_element = freezer_things.map(function(p){
      return (
          <nav className="food-item">
              <h3>{p.name}</h3>
              <h3>{p.qty}</h3>
              <MoreHorizIcon className="edit"/>
          </nav>)
  })
  const pantry_element = pantry_things.map(function(p){
      return (
      <nav className="food-item">
          <h3>{p.name}</h3>
          <h3>{p.qty}</h3>
          <MoreHorizIcon className="edit"/>
      </nav>)
  })
  return (
    <div className="kitchenStock">
      <div className="container">
          <h1 className="font-weight-light">Kitchen Stock List</h1>
        <nav className="kitchen-stock-headers">
            <h2>Refrigerator</h2>
            <AddCircleOutlineIcon className="AddSign"/>
        </nav>
        <ul>
            {/* <li>Name     QTY</li> */}
            {refrig_element}
        </ul>
        <nav className="kitchen-stock-headers">
            <h2>Freezer</h2>
            <AddCircleOutlineIcon className="AddSign"/>
        </nav>
        <ul>{freezer_element}</ul>
        <nav className="kitchen-stock-headers">
            <h2>Pantry</h2>
            <AddCircleOutlineIcon className="AddSign"/>
        </nav>
        <ul>{pantry_element}</ul>
      </div>
    </div>
  );
}

export default KitchenStock;