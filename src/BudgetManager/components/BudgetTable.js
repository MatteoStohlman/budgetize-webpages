import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
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
import {deleteBudgetLine} from 'api/budget'
import {toast} from 'react-toastify'
import numeral from 'numeral'
import moment from 'moment'
import {DATE} from 'CONSTANTS'
import {ignoreTransaction} from 'TransactionsManager/actions'
//ACTIONS//
  import {toggleAddBudget} from 'BudgetManager/actions'
  import {controlComponent as controlAddNotes} from 'TransactionsManager/actions'
//COMPONENTS//
  import AddNotes from 'TransactionsManager/components/AddNotes'
  import TransactionsMenu from 'TransactionsManager/components/TransactionsMenu'
  import SplitTransaction from 'TransactionsManager/components/SplitTransaction'


const BudgetTable = ({
  budget,loading,
  callback,categories,
  snackText,snackToast,
  toggleAddBudget,ignoreTransaction,
  controlAddNotes,transactionComponents,
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
        accessor: 'categoryName'
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
              <MenuItem primaryText="Edit" onClick={()=>toggleAddBudget(true,{id:row._original.id,category:{name:row._original.categoryName,id:row._original.categoryId},value:row._original.value})}/>
            </IconMenu>
          )
        }
      }
    ]
    const transactionColumns = [
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Date',
        id:'transactionDate',
        accessor: ({date})=>(
          moment(date).isValid()?
            moment(date).unix():
            null
        ),
        Cell:({row})=>(
          moment(row._original.date).isValid()?
            moment(row._original.date).format(DATE.formats.pretty):
            null
        )
      },
      {
        Header: '$ Value',
        id: 'value',
        accessor:({value})=>Number(value),
        Cell: ({row})=>{
          if(row._original.value>0)
            return( <span style={{color:'green'}}>{numeral(row._original.value).format('$0.00')}</span> )
          else
            return( <span style={{color:'red'}}>{numeral(row._original.value).format('$0.00')}</span> )

        }
      },
      {
        Header: 'Notes',
        accessor: 'notes'
      },
      {
        width:35,
        Cell:({row,...props})=>{
          return(
              <TransactionsMenu transaction={row._original} refreshCallback={callback}/>
          )
        }
      }
    ]
    const isLoading = loading && budget.length===0;
    return (
      <div>
        {transactionComponents.SplitTransaction.isOpen && <SplitTransaction/>}
        {transactionComponents.AddNotes.isOpen && <AddNotes/>}
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
              SubComponent={row => {
                return (
                  <div style={{padding:25,backgroundColor:"#e0e0e0"}}>
                    <ReactTable
                      style={{backgroundColor:'white'}}
                      data={row.original.transactions}
                      columns={transactionColumns}
                      noDataText="No Transactions"
                      className="-striped -highlight"
                      defaultPageSize={10}
                    />
                  </div>
                )
              }}
              defaultSorted={[
                {
                  id: "transactionDate",
                  desc: true
                }
              ]}
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
const mapStateToProps = state => ({
  transactionComponents:state.transactions.components,
})
function matchDispatchToProps(dispatch){
  return  bindActionCreators({
    toggleAddBudget:toggleAddBudget,
    ignoreTransaction:ignoreTransaction,
    controlAddNotes:controlAddNotes,
  },dispatch)
}

export default compose(
  connect(mapStateToProps,matchDispatchToProps),
  withState('snackText','snackToast',false),
)(BudgetTable)
