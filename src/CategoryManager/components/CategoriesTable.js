import React from 'react';
import TextField from 'material-ui/TextField';
import {withState,compose} from 'recompose';
import PropTypes from 'prop-types';
import ReactTable from 'react-table'
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FA from 'react-fontawesome';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {toast} from 'react-toastify'
import Snackbar from 'material-ui/Snackbar';
import {Row,Col} from 'react-bootstrap'
import {deleteCategory} from 'api/categories'
import RefreshIndicator from 'material-ui/RefreshIndicator';

const CategoriesTable = ({
    categories,refreshUserCategories,...props,
    snackText,snackToast,
    loading,
  }) => {
    function handleDelete(id,name){
      snackToast('Deleting category: '+name,()=>{
        deleteCategory(id).then(response=>{
          if(response.status){
            refreshUserCategories();
            toast.success('Category deleted, refreshing categories')
          }else{
            toast.error('Unable to delete category, please try again')
          }
          snackToast(false)
        })
      })
    }
    const columns = [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        width:35,
        Cell:({row})=>{
          return(
            <IconMenu
              iconButtonElement={<MoreVertIcon/>}
              anchorOrigin={{horizontal: 'left', vertical: 'top'}}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem primaryText="Delete" onClick={()=>handleDelete(row._original.id,row.name)}/>
            </IconMenu>
          )
        }
      }
    ]
    const isLoading = loading && categories.length===0;
    return(
      <div>
        <Row>
          <Col xs={12}>
            <div style={{width:'40%',display:'inline-block'}}>
              <h1 style={{marginLeft:10}}>Categories
                <RefreshIndicator
                  percentage={100}
                  size={40}
                  left={10}
                  top={5}
                  status={loading?'loading':'ready'}
                  style={{display: 'inline-block',position: 'relative'}}
                  onClick={refreshUserCategories}
                />
              </h1>
            </div>
            <div style={{width:'60%',display:'inline-block',textAlign:'right'}}>
              <div style={{marginRight:10}}>{props.children}</div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <ReactTable
              data={categories}
              columns={columns}
              noDataText={isLoading?'Loading Categories':'No Categories Found'}
              className="-striped -highlight"
              defaultPageSize={20}
              style={{
                height: "600px" // This will force the table body to overflow and scroll, since there is not enough room
              }}
            />
          </Col>
        </Row>
        <Snackbar
            open={snackText?true:false}
            message={snackText}
            autoHideDuration={5000}
            onRequestClose={()=>snackToast(false)}
          />
      </div>
    )
}

export default compose(
  withState('snackText','snackToast',false),
)(CategoriesTable)
