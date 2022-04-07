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
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert';
import QuestionMarkIcon from '@mui/icons-material/Help';
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

class GroceryList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      item: '',
      quantity: '',
      selectionModel: [],
      openAdd: false,
      openDelete: false,
      openTransfer: false,
      viewInfo: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectionModelChange = this.handleSelectionModelChange.bind(this);
    this.handleAddToKitchen = this.handleAddToKitchen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpenAdd = this.handleOpenAdd.bind(this);
    this.handleInfoClicked = this.handleInfoClicked.bind(this);

  }


  componentDidMount() {
    this.setState({
      item: '',
      quantity: '',
      selectionModel: [],
      openAdd: false,
      openDelete: false,
      openTransfer: false,
      viewInfo: false
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

    this.handleOpenDelete()

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
    this.handleOpenAdd()
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
    this.handleOpenTransfer()
  }

  handleInfoClicked(){
    this.setState({viewInfo: true})
  }

  handleDefaultList(){
    this.props.onDefaultList()
  }

  handleOpenAdd(){
    this.setState({
      openAdd: true
    })
  }

  handleOpenDelete(){
    this.setState({
      openDelete: true
    })
  }
  handleOpenTransfer(){
    this.setState({
      openTransfer: true
    })
  }

  handleClose(event, reason){
    if (reason === 'clickaway') {
      return;
    }
    this.setState({
      openAdd: false,
      openDelete: false,
      openTransfer: false
    })
  }

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ textAlign: 'center' }}>
          <Grid
            alignItems="center"
            container
            style={{
              color: 'white',
              background: '#343a40',
              paddingTop: '20px',
              paddingBottom: '20px'
            }}
          >

            <Grid item sm>

            </Grid>
            <Grid item sm={8}>
              <h1 textalign='center'>Grocery List</h1>
            </Grid>
            <Grid item sm>
              <Button startIcon={<QuestionMarkIcon />} style={{color: "white"}} onClick={this.handleInfoClicked}>
                Page info
              </Button>
            </Grid>
          </Grid>

          <span className='horizontal-line' />
        </div>
        <div className="centerDiv" style={{ height: 675, width: '100%' }}>
          <DataGrid
            components={{ Toolbar: QuickSearchToolbar }}
            componentsProps={{
              // Interaction between Search Bar and Table
              toolbar: {
                handleAddToKitchen: () => this.handleAddToKitchen(),
                handleDefaultList: () => this.handleDefaultList()
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
        {this.state.viewInfo ? (
        <Dialog
          open={this.state.viewInfo}
          onClose={() => this.setState({viewInfo: false})}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>Grocery List</DialogTitle>
          <DialogContent>
            <DialogContentText
              id='alert-dialog-description'
              style={{
                wordWrap: 'break-word',
                display: 'inline-block',
                whiteSpace: 'pre-line'
              }}
            >
              {'This is the Grocery List page.\n\n To add a new grocery item, fill out the needed information at the\n' +
              'bottom of the page and press the "Add Item" buttom or press the Enter Key. \n\n' + 
              'To import your previously saved starter shopping list, press the \n "Import Starter List" button so the top of the List\n\n' +
              'To delete an item from the list, press the Trash Can Icon on the row \n you would like to delete.\n\n' + 
              'As you shop, check items off the list using the check boxes at the far left. \n' +
              'When you complete your shopping trip, you can add the items to your kitchen.' +
              ' To do so, press the "Move Checked Items to Kitchen. Those checked items will then be moved to your Kitchen Stock List.'
              }
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.setState({viewInfo: false})}
              autoFocus
              color='primary'
              style={{ border: 'none', outline: 'none' }}
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}
        <Snackbar open={this.state.openAdd} autoHideDuration={3000} onClose={this.handleClose}>
          <Alert onClose={this.handleClose} severity="success" sx={{ width: '100%' }}>
            Item Added to Grocery List
          </Alert>
        </Snackbar>
        <Snackbar open={this.state.openDelete} autoHideDuration={3000} onClose={this.handleClose}>
          <Alert onClose={this.handleClose} severity="success" sx={{ width: '100%' }}>
            Item Deleted from Grocery List
          </Alert>
        </Snackbar>
        <Snackbar open={this.state.openTransfer} autoHideDuration={3000} onClose={this.handleClose}>
          <Alert onClose={this.handleClose} severity="success" sx={{ width: '100%' }}>
            Item(s) Moved to Kitchen Stock List
          </Alert>
        </Snackbar>
      </div>

    );
  }
}

export default GroceryList;

function QuickSearchToolbar (props) {
  return (
    <Grid container sx={{ p: 0.5 }} alignItems='center' alignContent='center'>
      <Grid item sm style={{marginRight:"50px"}}>
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
          startIcon={<AddIcon>Import Starter List</AddIcon>}
          onClick={props.handleDefaultList}
        >
          Import Starter List
        </Button>
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
