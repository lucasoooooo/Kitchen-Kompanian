import React, { Component } from "react";
import { DataGrid} from '@mui/x-data-grid';
import Button from "@material-ui/core/Button";
import DeleteIcon from '@mui/icons-material/Delete'
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types'

// MUI Component Imports
// import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

// MUI Icon Imports
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import ClearIcon from '@mui/icons-material/Clear'
import IconButton from '@mui/material/IconButton'
// import MenuIcon from '@mui/icons-material/MoreVert'
import SearchIcon from '@mui/icons-material/Search'
// import { Paper } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
// import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'


class KitchenStock extends Component {

  constructor(props) {
    super(props);

    this.state = {
      props: [],
      addView: false,
      editView: false,
      openDeleteDialog: false,
      currentEditId: 0,
      numItems: 0,
      item: '',
      quantity: ''
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    // this.handleEditView = this.handleEditView(this);
    this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
    this.handleClosed = this.handleClosed.bind(this);
    this.handleOpened = this.handleOpened.bind(this);
  }
  
  componentDidMount() {
    console.log()
    this.setState({
      props: [...this.props.items],
      addView: false,
      editView: false,
      openDeleteDialog: false,
      currentEditId: 0,
      numItems: this.props.items.length+1,
      item: '',
      quantity: '',
      location:'',
      expiration:'',
      allergies:'',
      owner:''
    });
  }

  handleDelete(){
    console.log(`Deleting item of id: ${this.state.currentEditId}`)
    let temp = this.props.items.filter(
      item => item.id !== parseInt(this.state.currentEditId));
    this.props.onKitchenStockSubmit(temp)
    this.setState({
      currentEditId: this.props.items[0].id,
      addView: false,
      editView: false,
      openDeleteDialog: false,
      item: '',
      quantity: '',
      location:'',
      expiration:'',
      allergies:'',
      owner:''
    });
    // console.log(this.state.data)
  }
  handleAddView(){
    this.setState({
      addView: true,
      editView:false
    });
  }

  handleEditView(id){
    const foodItem = this.props.items.filter(item =>{
      return item.id === id
    })[0]
    this.setState({
      item: foodItem.item,
      quantity: foodItem.quantity,
      location: foodItem.location,
      expiration: foodItem.expiration,
      allergies: String(foodItem.allergies),
      owner: String(foodItem.owner)
    });
    this.setState({
      addView: false,
      editView: true,
      currentEditId: id
    });
  }
  handleBack(){
    this.setState({
      addView: false,
      editView: false,
      item: '',
      quantity: '',
      location:'',
      expiration:'',
      allergies:'',
      owner:''
    });
  }

  handleChange(event) {
    const name = event.target.name;
    this.setState({[name]: event.target.value});
    // console.log(this.state)
  }
  handleClosed(){
    this.setState({
      openDeleteDialog: false
    })
  }
  handleOpened(){
    this.setState({
      openDeleteDialog: true
    })
  }
  handleSubmitEdit(event){
    
    let temp = this.props.items.filter(
      item => item.id !== parseInt(this.state.currentEditId));
    temp.push({ id: this.state.numItems, 
      item: this.state.item, 
      quantity: this.state.quantity,
      location: this.state.location,
      expiration: this.state.expiration,
      allergies: this.state.allergies,
      owner: this.state.owner});

      //Expiration Checker
    var currentDate = new Date().getTime()
    const tempE = temp.map(function(x){
    //str.replace('one', '')
      if (x.expiration == ""){
        return {...x,  item: x.item.replace("(Expired) ", "")}
      }
      var d = Date.parse(x.expiration)
      if (d <= 1046702800000){ //Dont ask why I chose this number
        d = Date.parse(x.expiration + " 2022")
      }
      if (d <= currentDate && !x.item.includes("Expired") ){
        return {...x,  item:("(Expired) " + x.item)}
      }
      else{
        return {...x,  item: x.item.replace("(Expired) ", "")}
      }
    })
    this.props.onKitchenStockSubmit(tempE)
    this.setState({
      numItems: this.state.numItems+1,
      addView: false,
      editView: false,
      item: '',
      quantity: '',
      location:'',
      expiration:'',
      allergies:'',
      owner:''
    });
    
  }

  handleSubmit(event) { 
    event.preventDefault();
    let temp = [
      ...this.props.items
    ];
    temp.push({ id: this.state.numItems, 
                item: this.state.item, 
                quantity: this.state.quantity,
                location: this.state.location,
                expiration: this.state.expiration,
                allergies: this.state.allergies,
                owner: this.state.owner});
      //Expiration Checker
    var currentDate = new Date().getTime()
    const tempE = temp.map(function(x){
    
      if (x.expiration == ""){
        return {...x,  item: x.item.replace("(Expired) ", "")}
      }
      var d = Date.parse(x.expiration)
      if (d <= 1046702800000){ //Dont ask why I chose this number
        d = Date.parse(x.expiration + " 2022")
      }
      if (d <= currentDate && !x.item.includes("Expired") ){
        return {...x,  item:("(Expired) " + x.item)}
      }
      else{
        return {...x,  item: x.item.replace("(Expired) ", "")}
      }
    })

    this.props.onKitchenStockSubmit(tempE)
    this.setState({
      addView: false,
      editView: false,
      numItems: this.state.numItems+1,
      item: '',
      quantity: '',
      location:'',
      expiration:'',
      allergies:'',
      owner:''
    });
    console.log(this.state)
    // this.checkExpiration()
  }


  render() {
    return (
      <div>
      <div style={{ textAlign: "center" }}>
        <h1 textalign='center' style={{color: "white", background: "#343a40",
        paddingTop: '20px', paddingBottom: '20px'}}>Kitchen Stock</h1>
        <span className="horizontal-line" />
        <div className="centerDiv" style={{ height: 675, width: '100%' }}>

        {this.state.addView && !this.state.editView &&
        (<div>
          <Grid
            container
            direction='column'
            alignContent='center'
            justifyContent='center'
            alignItems='center'
            width={768}
            spacing={2}
            >
            <Grid
              item
              container
              alignContent="center"
              justifyContent='center'
              alignItems='center'
            >
            <Grid item sm>
              <Button
                variant='text'
                color='primary'
                style={{ border: 'none', outline: 'none'}}
                startIcon={<ArrowBackIcon>Back To List</ArrowBackIcon>}
                onClick={this.handleBack}>
                  Back To List
                </Button>
              </Grid>
              <Grid 
                container
                item 
                xs
                alignContent='flex-end'
                justifyContent='flex-end'
                alignItems='center'
                spacing={2}
              >
                <Button
                  variant='text'
                  color='primary'
                  style={{ border: 'none', outline: 'none' , marginRight:"100px"}}
                  startIcon={<SaveIcon>Save Food</SaveIcon>}
                  type="submit"
                  onClick={this.handleSubmit}
                >
                  Save Food Item
                </Button>
              </Grid>
              </Grid>
          </Grid>
          <h2>Add New Food Item</h2>
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
          <span className='textField'>
            <TextField
              type="text" 
              label="Storage Location"
              name="location" 
              value={this.state.location} 
              onChange={this.handleChange}
            />
          </span>
          {/* Add padding to the top of the bottom 3 insert cells
           */}
          <span style={{paddingTop: '200px'}}>
          <span className='textField'>
            <TextField
              type="text" 
              label="Expiration Date"
              name="expiration" 
              value={this.state.expiration} 
              onChange={this.handleChange}
            />
          </span>
          <span className='textField'>
            <TextField
              type="text" 
              label="Allergies"
              name="allergies" 
              value={this.state.allergies} 
              onChange={this.handleChange}
            />
          </span>
          <span className='textField'>
            <TextField
              type="text" 
              label="Owner"
              name="owner" 
              value={this.state.owner} 
              onChange={this.handleChange}
            />
          </span>
          </span>
        </form>
        </div>)
        }
        {!this.state.addView && this.state.editView &&
        <div>
           <Grid
            container
            direction='column'
            alignContent='center'
            justifyContent='center'
            alignItems='center'
            width={768}
            spacing={2}
            >
            <Grid
              item
              container
              alignContent="center"
              justifyContent='center'
              alignItems='center'
            >
            <Grid item sm>
              <Button
                variant='text'
                color='primary'
                style={{ border: 'none', outline: 'none'}}
                startIcon={<ArrowBackIcon>Back To List</ArrowBackIcon>}
                onClick={this.handleBack}>
                  Back To List
                </Button>
              </Grid>
              <Grid item>
              <Button
                  variant='text'
                  color='primary'
                  style={{ border: 'none', outline: 'none' , marginRight:"100px"}}
                  startIcon={<SaveIcon>Save Food</SaveIcon>}
                  type="submit"
                  onClick={this.handleSubmitEdit}
                >
                  Save Food Item
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant='text'
                  color='primary'
                  style={{ border: 'none', outline: 'none' }}
                  startIcon={<DeleteIcon>Delete Food Item</DeleteIcon>}
                  onClick={() => this.handleOpened()}
                >
                  Delete Food Item
                </Button>
              </Grid>
              </Grid>
          </Grid>
          <h2>View Food Item</h2>
          <form onSubmit={this.handleSubmitEdit}>
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
          <span className='textField'>
            <TextField
              type="text" 
              label="Storage Location"
              name="location" 
              value={this.state.location} 
              onChange={this.handleChange}
            />
          </span>
          {/* Add padding to the top of the bottom 3 insert cells
           */}
          <span style={{paddingTop: '200px'}}>
          <span className='textField'>
            <TextField
              type="text" 
              label="Expiration Date"
              name="expiration" 
              value={this.state.expiration} 
              onChange={this.handleChange}
            />
          </span>
          <span className='textField'>
            <TextField
              type="text" 
              label="Allergies"
              name="allergies" 
              value={this.state.allergies} 
              onChange={this.handleChange}
            />
          </span>
          <span className='textField'>
            <TextField
              type="text" 
              label="Owner"
              name="owner" 
              value={this.state.owner} 
              onChange={this.handleChange}
            />
          </span>
          </span>
        </form>
        </div>
        }
        {this.state.openDeleteDialog && (
                <Dialog
                  open={this.state.openDeleteDialog}
                  onClose={this.state.handleClosed}
                  aria-labelledby='alert-dialog-title'
                  aria-describedby='alert-dialog-description'
                >
                  <DialogTitle id='alert-dialog-title'>
                    {'Delete Ingredient'}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                      Are you sure that you want to delete {this.state.item}
                      ? You cannot reverse this action.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={this.handleClosed}
                      autoFocus
                      color='primary'
                      style={{ border: 'none', outline: 'none' }}
                    >
                      Cancel
                    </Button>
                    <Button
                      color='primary'
                      style={{ border: 'none', outline: 'none' }}
                      onClick={this.handleDelete}
                    >
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
              )}
        { !this.state.addView && !this.state.editView && 
        (<DataGrid
            components={{ Toolbar: QuickSearchToolbar }}
            componentsProps={{
              // Interaction between Search Bar and Table
              toolbar: {
                handleAddView: () => this.handleAddView()
              }
            }}
            onCellClick={(params, event) => {
              console.log(params.id)
              this.handleEditView(params.id)
            }}
            // {...data}
            rows={this.props.items}
            columns={[
              { field: 'item', headerName: 'Food Item', width: 200},
              { field: 'quantity', headerName: 'Quantity', width: 100},
              // {
              //   field: 'delete',
              //   headerName: '',
              //   width: 80,
              //   sortable: false,
              //   headerClassName: 'delete-item-column',
              //   hideSortIcons: true,
              //   renderCell: (params) => {
              //     return (
              //       <Button
              //         className="delete-btn"            
              //         onClick={() => this.handleDelete(params.id)}>
              //         <DeleteIcon className="delete" color="inherit" />
              //       </Button>
              //     );
              //   },
              // }
            
            ]}
            pageSize={25}
            // checkboxSelection
            // onRowSelected={this.handleRowSelection}
          />)}
        </div>
        <br/>
        
      </div>
      </div>

    );
  }
}

export default KitchenStock;

// Creates the search bar for the DataGrid
function QuickSearchToolbar (props) {
  return (
    <Grid container sx={{ p: 0.5 }} alignItems='center' alignContent='center'>
      <Grid item sm style={{marginRight:"455px"}}>
      <TextField
          variant='standard'
          value={props.value}

          onChange={props.onChange}
          placeholder='Search…'
          InputProps={{
            startAdornment: <SearchIcon fontSize='small' />,
            endAdornment: (
              <IconButton
                title='Clear'
                aria-label='Clear'
                size='small'
                style={{ visibility: props.value ? 'visible' : 'hidden' }}
                onClick={props.clearSearch}
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
          startIcon={<AddIcon>Add Food Item</AddIcon>}
          onClick={props.handleAddView}
        >
          Add Food Item
        </Button>
      </Grid>
    </Grid>
  )
}

QuickSearchToolbar.propTypes = {
  handleAddView: PropTypes.func.isRequired
}