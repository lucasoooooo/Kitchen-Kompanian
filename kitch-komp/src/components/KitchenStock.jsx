import React from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// import { Input } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

function KitchenStock() {
  // These food items will later come from useState's
  // TODO: Remove these
  const refrig_things = 
  [{name:"Bread", qty:"1 Loaf", id:1}, {name:"Mayo", qty:"-", id:2}, {name:"Ham",qty:"-", id:3}]
  const freezer_things = [{name:"Icecream", qty:"-"}, {name:"Peas", qty:"1 bag"}]
  const pantry_things = [{name:"Captain Crunch", qty:"-"}, {name:"Peanut Butter", qty:"-"}]
  const [edit, setEdit] = React.useState(false)
  const [add, setAdd] = React.useState(false)
  const refrig_element = refrig_things.map(function(p){
      return (
          <nav className="food-item">
              <h3>{p.name}</h3>
              <h3>{p.qty}</h3>
              <MoreHorizIcon className="edit" onClick={flipEdit}/>
          </nav>)
  })
  const freezer_element = freezer_things.map(function(p){
      return (
          <nav className="food-item">
              <h3>{p.name}</h3>
              <h3>{p.qty}</h3>
              <MoreHorizIcon className="edit" onClick={flipEdit}/>
          </nav>)
  })
  const pantry_element = pantry_things.map(function(p){
      return (
      <nav className="food-item">
          <h3>{p.name}</h3>
          <h3>{p.qty}</h3>
          <MoreHorizIcon className="edit" onClick={flipEdit}/>
      </nav>)
  })
  function flipEdit(){
    setEdit(prev => !prev)
  }
  function flipAdd(){
    setAdd(prev => !prev)
  }
  const columns = [{field:"name", headerName: "name", width:150},{field:"qty", headerName:"qty", width:150}];
  return (
    <div className="kitchenStock">
      
      {!edit && !add && <div className="list">
          <h1 className="font-weight-light">Kitchen Stock List</h1>
        <nav className="kitchen-stock-headers">
            <h2>Refrigerator</h2>
            
            <AddCircleOutlineIcon className="add-sign" onClick={flipAdd}/>
        </nav>
        <DataGrid
              // components = {{Toolbar: QuickSearchToolBar}}
              // getRowId={(r) => r.DT_RowId}
              columns={columns}
              rows={refrig_things}
              // rowsHeight={10}
              // pageSize={100}
              // filterMode="server"
              // ItemsSource="{Binding Clients.RowItems}"
              // // onFilterModelChange={onFilterChange}
              // // loading={loading}
        />
        <ul>
            {/* <li>Name     QTY</li> */}
            {refrig_element}
        </ul>
        <nav className="kitchen-stock-headers">
            <h2>Freezer</h2>
            <AddCircleOutlineIcon className="add-sign" onClick={flipAdd}/>
        </nav>
        <ul>{freezer_element}</ul>
        <nav className="kitchen-stock-headers">
            <h2>Pantry</h2>
            <AddCircleOutlineIcon className="add-sign" onClick={flipAdd}/>
        </nav>
        <ul>{pantry_element}</ul>
      </div>}
      {edit && !add && <form className="editing">
        <label for="name">Change Name: </label>
        <input type="text" id="name" name="name"></input><br/>
        <label for="qty">Change Quantity: </label>
        <input type="text" id="qty" name="qty"></input><br/>
        <nav className="delete-apply">
          <button onClick={flipEdit}>Delete</button>
          <input type="submit" value="Apply"></input>
        </nav>
        <br/><br/>
      </form>}
      {add && !edit && <form className="editing">
        <label for="name">Name: </label>
        <input type="text" id="name" name="name"></input><br/>
        <label for="qty">Quantity: </label>
        <input type="text" id="qty" name="qty"></input><br/>
        <nav className="delete-apply">
          <button onClick={flipAdd}>Delete</button>
          <input type="submit" value="Add"></input>
        </nav>
        <br/><br/>
      </form>}

    </div>
  );
}

export default KitchenStock;