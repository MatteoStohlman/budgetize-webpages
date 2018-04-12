import React from 'react';
import TextField from 'material-ui/TextField';
import {withState,compose} from 'recompose';
import PropTypes from 'prop-types';
import ReactTable from 'react-table'
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Snackbar from 'material-ui/Snackbar';
import {Row,Col} from 'react-bootstrap'
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {deleteBudgetLine,addBudgetLine} from 'api/budget'
import {toast} from 'react-toastify'
import numeral from 'numeral'
const BudgetTable = ({
  budget,loading,
  callback,categories,
  snackText,snackToast,
  ...props
  }) => {
    function handleDelete(id,name){
      snackToast('Deleting Budget: '+name,()=>{
        deleteBudgetLine(id).then(response=>{
          if(response.status){
            callback();
            toast.success('Budget deleted, refreshing')
          }else{
            toast.error('Unable to delete Budget, please try again')
          }
          snackToast(false)
        })
      })
    }
    const columns = [
      {
        Header: 'Name',
        accessor: 'category'
      },
      {
        Header:'Value',
        id:'value',
        accessor:row=>numeral(row.value).format('$0.00')
      },
      {
        Header:'Expenses',
        id:'actual_expense',
        accessor:row=>numeral(row.actual_expense).format('$0.00')
      },
      {
        Header:'Remaining',
        id:'remaining',
        accessor:row=>numeral(row.value-row.actual_expense).format('$0.00')
      },
      {
        Header:'% Used',
        id:'percent_used',
        accessor:row=>numeral(row.actual_expense/row.value).format('0%')
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
              <MenuItem primaryText="Delete" onClick={()=>handleDelete(row._original.id,row.categoryName)}/>
            </IconMenu>
          )
        }
      }
    ]
    const isLoading = loading && budget.length===0;
    return (
      <div>
        <Row>
          <Col xs={12}>
            <Row>
              <Col xs={4}>
                <h1 style={{marginLeft:10,display:'inline-block'}}>Budget
                  <RefreshIndicator
                    percentage={100}
                    size={40}
                    left={10}
                    top={5}
                    status={loading?'loading':'ready'}
                    style={{display: 'inline-block',position: 'relative'}}
                    onClick={callback}
                  />
                </h1>
              </Col>
              <Col xs={8}>
                <div style={{marginRight:10}}>{props.children}</div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <ReactTable
              data={budget}
              columns={columns}
              noDataText={isLoading?'Loading Budget':'No Budget Found'}
              className="-striped -highlight"
              defaultPageSize={15}
              style={{
                //height: "400px" // This will force the table body to overflow and scroll, since there is not enough room
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

// TextInput.propTypes={
//   label:PropTypes.string.isRequired
// }

export default compose(
  withState('snackText','snackToast',false),
)(BudgetTable)
