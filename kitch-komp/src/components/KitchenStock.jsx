import React, { Component } from "react";
import { DataGrid} from '@mui/x-data-grid';
import Button from "@material-ui/core/Button";
import DeleteIcon from '@mui/icons-material/Delete'
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types'
import {Typography} from '@mui/material'
import Grid from '@mui/material/Grid'
import QuestionMarkIcon from '@mui/icons-material/Help';
import Snackbar from '@mui/material/Snackbar'
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import ClearIcon from '@mui/icons-material/Clear'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SaveIcon from '@mui/icons-material/Save'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import MuiAlert from '@mui/material/Alert';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


class KitchenStock extends Component {

  constructor(props) {
    super(props);

    this.state = {
      props: [],
      addView: false,
      editView: false,
      openDeleteDialog: false,
      currentEditId: 0,
      helpBox: false,
      openAdd: false,
      openDelete: false,
      openEdit: false,
      openSearch: false,
      deleteItem:'',
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
    this.handleHelp = this.handleHelp.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
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
      helpBox: false,
      openAdd: false,
      openDelete: false,
      openEdit: false,
      openSearch: false,
      deleteItem:'',
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
      owner:'',
      openDelete: true
    });
    // console.log(this.state.data)
  }
  handleAddView(){
    this.setState({
      addView: true,
      editView:false
    });
  }
  handleClose(event, reason){
    if (reason === 'clickaway') {
      return;
    }
    this.setState({
      openAdd: false,
      openDelete: false,
      openEdit: false,
      openSearch: false
    })
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
  handleHelp(){
    console.log("Closed/Opened Help Box")
    this.setState({
      helpBox: !this.state.helpBox
    })
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
      if (d <= currentDate && x.item.includes("Expired") ){
        return {...x}
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
      owner:'',
      openEdit: true
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
      if (d <= currentDate && x.item.includes("Expired") ){
        return {...x}
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
      owner:'',
      openAdd: true
    });
    console.log(this.state)
    // this.checkExpiration()
  }

  // Filter the recipes based on the requested search
  handleSearch() {
    console.log("Searching...")
    this.setState({
      openSearch: true
    })
  }
  
  // searchValue => {
  //   setSearchText(searchValue)
  //   const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')

  //   const filteredRows = props.members.filter(row => {
  //     return Object.keys(row).some(field => {
  //       return searchRegex.test(row[field].toString())
  //     })
  //   })
  //   setRows(filteredRows)
  // }

  render() {
    return (
      <div>
      <div style={{ textAlign: "center"}}>
        <Grid
          alignItems="center"
          container
          style={{
            color: 'white',
            background: '#343a40',
            paddingTop: '20px',
            paddingBottom: '20px'
          }}>
        <Grid item sm/>
          <Grid item sm={8}>
            <h1 textalign='center'>Kitchen Stock</h1>
          </Grid>
          <Grid item sm>
            <Button startIcon={<QuestionMarkIcon />} style={{border: 'none', outline: 'none', color: 'white'}} 
            onClick={this.handleHelp}>
              Page info
            </Button>
          </Grid>
        </Grid>
        
        
        <span className="horizontal-line" />
        <div className="centerDiv" style={{ height: '1102px', width: '100%' }}>

        {this.state.addView && !this.state.editView &&
        (<div style={{paddingTop:"20px"}}>
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
            <Grid item sm style={{marginRight:"440px"}}>
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
                  style={{ border: 'none', outline: 'none' }}
                  startIcon={<SaveIcon>Save Food</SaveIcon>}
                  type="submit"
                  onClick={this.handleSubmit}
                >
                  Save Food Item
                </Button>
              </Grid>
              </Grid>
          </Grid>
          <Grid item>
            <Typography >Enter food item information below</Typography>
          </Grid>
          
          <form onSubmit={this.handleSubmit}>
          <Grid style={{paddingTop:"40px"}}>
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
          </Grid>
          <Grid style={{paddingTop:"40px"}}>
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
          <span className='textField'>
            <TextField
              type="text" 
              label="Expiration Date"
              name="expiration" 
              value={this.state.expiration} 
              onChange={this.handleChange}
            />
          </span>
          </Grid>
          <Grid style={{paddingTop:"40px"}}>
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
          </Grid>
        </form>
        </div>)
        }
        {!this.state.addView && this.state.editView &&
        <div style={{paddingTop:"13px"}}>
           <Grid
            container
            direction='column'
            alignContent='center'
            justifyContent='center'
            alignItems='center'
            width={768}
            spacing={3}
            >
            <Grid
              item
              container
              alignContent="center"
              justifyContent='center'
              alignItems='center'
            >
            <Grid item sm >
              <Button
                variant='text'
                color='primary'
                style={{ border: 'none', outline: 'none',marginRight:"120px"}}
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
                  style={{ border: 'none', outline: 'none'}}
                  startIcon={<DeleteIcon>Delete Food Item</DeleteIcon>}
                  onClick={() => this.handleOpened()}
                >
                  Delete Food Item
                </Button>
              </Grid>
              </Grid>
          </Grid>
          <Grid item>
            <Typography>Enter food item information below</Typography>
          </Grid>
          <form onSubmit={this.handleSubmitEdit}>
          <Grid style={{paddingTop:"40px"}}>
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
            </Grid>
            <Grid style={{paddingTop:"40px"}}>
            <span className='textField'>
              <TextField
                type="text" 
                label="Storage Location"
                name="location" 
                value={this.state.location} 
                onChange={this.handleChange}
              />
            </span>
            <span className='textField'>
              <TextField
                type="text" 
                label="Expiration Date"
                name="expiration" 
                value={this.state.expiration} 
                onChange={this.handleChange}
              />
            </span>
            </Grid>
            <Grid style={{paddingTop:"40px"}}>
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
          </Grid>
        </form>
        </div>
        }
        {this.state.helpBox && (
          <Dialog
          open={this.state.helpBox}
          onClose={this.handleHelp}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-help-title'>
            {'Page Info'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              This is the Kitchen Stock page.<br/> <br/>
               Here you will find all your
               ingredients that are currently in your home. <br/> <br/>
               To sort the
                food items by alphabetically, quantity or location, 
                tap the label you want to sort.<br/> <br/>
                 To add a new food item, 
                tap the "Add Food Item" button at the top right. <br/> <br/>
               To edit or view more about a food item, tap the row 
               you want to see to go into edit mode. <br/> <br/>
               In edit mode, you can edit/save your 
               food item, or delete it.<br/><br/> 
                You can also delete your food item from the regular view by 
                clicking the trash can icon on the left of every row.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleHelp}
              autoFocus
              color='primary'
              style={{ border: 'none', outline: 'none' }}
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
        )}
        {this.state.openDeleteDialog && (
                <Dialog
                  open={this.state.openDeleteDialog}
                  onClose={this.handleClosed}
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
            height={"100px"}  
            components={{ Toolbar: QuickSearchToolbar }}
            componentsProps={{
              // Interaction between Search Bar and Table
              toolbar: {
                handleAddView: () => this.handleAddView(),
                handleSearch: () => this.handleSearch()
                // onChange: event => requestSearch(event.target.value),
                // clearSearch: () => requestSearch(''),
              }
              
            }}
            onCellClick={(params, event) => {
              console.log(params)

              if (params.field !== 'delete'){
                this.handleEditView(params.id)
              }else{
                  this.setState({
                    currentEditId: params.id,
                    item: params.row.item
                  })
                  this.handleOpened()
              }
            }}
            // {...data}
            rows={this.props.items}
            columns={[
              { field: 'item', headerName: 'Food Item', width: 300},
              { field: 'quantity', headerName: 'Quantity', width: 150},
              { field: 'location', headerName: 'Location', width: 220},
              {
                field: 'delete',
                headerName: '',
                width: 80,
                sortable: false,
                headerClassName: 'delete-item-column',
                hideSortIcons: true,
                renderCell: (params) => {
                  return (
                    <Button className="delete-btn" >
                      <DeleteIcon className="delete" color="inherit" />
                    </Button>
                  );
                },
              }
            
            ]}
            pageSize={25}
            onRowSelected={this.handleRowSelected}
            selectionModel={this.state.selectionModel}
          />)}
        </div>
        <br/>
        
      </div>
      <Snackbar open={this.state.openAdd} autoHideDuration={3000} onClose={this.handleClose}>
          <Alert onClose={this.handleClose} severity="success" sx={{ width: '100%' }}>
            Item Added to Kitchen Stock
          </Alert>
        </Snackbar>
        <Snackbar open={this.state.openDelete} autoHideDuration={3000} onClose={this.handleClose}>
          <Alert onClose={this.handleClose} severity="success" sx={{ width: '100%' }}>
            Item Deleted from Kitchen Stock
          </Alert>
        </Snackbar>
        <Snackbar open={this.state.openEdit} autoHideDuration={3000} onClose={this.handleClose}>
          <Alert onClose={this.handleClose} severity="success" sx={{ width: '100%' }}>
            Item Edited
          </Alert>
        </Snackbar>
        <Snackbar open={this.state.openSearch} autoHideDuration={3000} onClose={this.handleClose}>
          <Alert onClose={this.handleClose} severity="success" sx={{ width: '100%' }}>
            Search Feature Currently not implemented
          </Alert>
        </Snackbar>
      </div>

    );
  }
}

export default KitchenStock;

// Creates the search bar for the DataGrid
function QuickSearchToolbar (props) {
  return (
    <Grid container sx={{ p: .5 }} alignItems='center' alignContent='center'>
      <Grid item sm style={{marginRight:"365px"}}>
      <TextField
          variant='standard'
          value={props.value}
          style={{ paddingRight: 15 }}
          onChange={props.handleSearch}
          placeholder='Search???'
          InputProps={{
            startAdornment: <SearchIcon fontSize='small' />,
            endAdornment: (
              <IconButton
                title='Clear'
                aria-label='Clear'
                size='small'
                style={{ visibility: props.value ? 'visible' : 'hidden' }}
                // onClick={this.addView}
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
  handleAddView: PropTypes.func.isRequired,
  // onChange: PropTypes.func.isRequired,
  // value: PropTypes.string.isRequired,
}