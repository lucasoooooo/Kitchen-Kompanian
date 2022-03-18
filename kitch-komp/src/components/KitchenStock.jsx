import React from "react";
import Box from "@mui/material/Box"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { DataGrid } from '@mui/x-data-grid';

function KitchenStock() {
  // These food items will later come from useState's
  // TODO: Remove these
  const refrig_things = 
    [{name:"Bread", qty:"1 Loaf", id:1}, {name:"Mayo", qty:"-", id:2}, {name:"Ham",qty:"-", id:3}]
  const freezer_things = 
    [{name:"Icecream", qty:"-", id:1}, {name:"Peas", qty:"1 bag", id:2}]
  const pantry_things = 
    [{name:"Captain Crunch", qty:"-", id:1}, {name:"Peanut Butter", qty:"-",id:2}]
  
  const columns = [{field:"name", headerName: "Name", width:300},{field:"qty", headerName:"Quantity", width:300}];
  return (
    <div className="kitchenStock">
      
      <div className="list">
          <h1 className="font-weight-light">Kitchen Stock List</h1>
        <nav className="kitchen-stock-headers">
            <h2>Refrigerator</h2>
            <AddCircleOutlineIcon className="add-sign" />
        </nav>
        <Box sx={{
          height:300,
          width: 1, 
          '& .MuiDataGrid-columnHeaders':{
          backgroundColor: '#6A994E'},
          '& .even':{
            backgroundColor: 'rgb(223, 212, 184)'
          },
          '& .odd':{
            backgroundColor: 'rgb(244, 233, 204)'
          }
          
          }}>
        <DataGrid
              columns={columns}
              rows={refrig_things}
              getCellClassName={(params)=>{
                return params.id%2 ===1 ? 'even' : 'odd'
              }}
              
        />
        </Box>

        <nav className="kitchen-stock-headers">
            <h2>Freezer</h2>
            <AddCircleOutlineIcon className="add-sign"/>
        </nav>
        <Box sx={{
          height:300,
          width: 1, 
          '& .MuiDataGrid-columnHeaders':{
          backgroundColor: '#6A994E'},
          '& .even':{
            backgroundColor: 'rgb(223, 212, 184)'
          },
          '& .odd':{
            backgroundColor: 'rgb(244, 233, 204)'
          }
          
          }}>
        <DataGrid
              columns={columns}
              rows={freezer_things}
              getCellClassName={(params)=>{
                return params.id%2 ===1 ? 'even' : 'odd'
              }}
        />
        </Box>

        <nav className="kitchen-stock-headers">
            <h2>Pantry</h2>
            <AddCircleOutlineIcon className="add-sign"/>
        </nav>
        <Box sx={{
          height:300,
          width: 1, 
          '& .MuiDataGrid-columnHeaders':{
          backgroundColor: '#6A994E'},
          '& .even':{
            backgroundColor: 'rgb(223, 212, 184)'
          },
          '& .odd':{
            backgroundColor: 'rgb(244, 233, 204)'
          }
          
          }}>

          <DataGrid 
                columns={columns}
                rows={pantry_things}
                getCellClassName={(params)=>{
                  return params.id%2 ===1 ? 'even' : 'odd'
                }}
          />
        </Box>
      </div>
      
      <br/><br/>

    </div>
  );
}

export default KitchenStock;