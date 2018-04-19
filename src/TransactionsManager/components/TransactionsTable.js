import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TextField from 'material-ui/TextField';
import {withState,compose} from 'recompose';
import PropTypes from 'prop-types';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {Row,Col} from 'react-bootstrap'
import ReactTable from 'react-table'
import Snackbar from 'material-ui/Snackbar';
import {toast} from 'react-toastify'
import moment from 'moment'
import numeral from 'numeral'
import IconButton from 'material-ui/IconButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {DATE} from 'CONSTANTS'
//ACTIONS//
  import {ignoreTransaction} from '../actions'
  import {controlComponent} from 'TransactionsManager/actions'
//COMPONENTS//
  import AddMapping from 'MappingManager/components/AddMapping'
  import AddNotes from 'TransactionsManager/components/AddNotes'
  import SplitTransaction from 'TransactionsManager/components/SplitTransaction'

const TransactionsTable = ({
    transactions,updateTransactions,
    snackText,snackToast,
    showCreateMapping,updateShowCreateMapping,
    loading,refreshCallback,
    categories,filter,
    controlComponent,
    ignoreTransaction,
    isMobile,
    ...props
  }) => {
    const columns = [
      {
        Header: 'Name',
        accessor: 'name',
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
        Header: 'Plaid Tags',
        id:'plaidTags',
        accessor: ({plaidTags})=>(
          plaidTags && plaidTags!='null'?
            JSON.parse(plaidTags).join(', '):
            null
        ),
      },
      {
        Header: 'Date',
        id:'transactionDate',
        accessor: ({transaction_date})=>(
          moment(transaction_date).isValid()?
            moment(transaction_date).unix():
            null
        ),
        Cell:({row})=>(
          moment(row._original.transaction_date).isValid()?
            moment(row._original.transaction_date).format(DATE.formats.pretty):
            null
        )
      },
      {
        Header: 'Notes',
        accessor: 'notes',
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
              <MenuItem primaryText="Create Mapping" onClick={()=>updateShowCreateMapping({active:true,data:[row._original]})}/>
              <MenuItem primaryText="Ignore Transaction" onClick={()=>ignoreTransaction(row._original.id)}/>
              <MenuItem primaryText="Split" onClick={()=>controlComponent('SplitTransaction',{
                  isOpen:true,
                  targetTransaction:{...row._original,category:{id:row._original.category_id,name:row._original.categoryName}},
                  valueTotal:row._original.value
                })}
              />
              <MenuItem primaryText="Add Notes" onClick={()=>controlComponent('AddNotes',{isOpen:true,transaction:row._original,value:row._original.notes})}/>
            </IconMenu>
          )
        }
      }
    ]
    if(filter=='latestTransactions'){
      var categoryColumn = {
        Header: 'Category Name',
        accessor: 'categoryName',
      }
      columns.splice(columns.length-2,0,categoryColumn)
    }
    function genInitialMappingValues(){
      if(showCreateMapping.active){
        if(showCreateMapping.data[0].plaidTags){
          let plaidTags = JSON.parse(showCreateMapping.data[0].plaidTags)
          let lastPlaidTag = plaidTags[plaidTags.length-1]
          return {matchType:'plaidTag',keyword:lastPlaidTag}
        }
      }
      return false
    }
    return(
      <div>
        <AddNotes/>
        <SplitTransaction/>
        <Row>
          <Col xs={12}>
            <div style={{width:'40%',display:'inline-block'}}>
              <h1 style={{marginLeft:10}}>
                Transactions
                <RefreshIndicator
                  percentage={100}
                  size={40}
                  left={10}
                  top={5}
                  status={loading?'loading':'ready'}
                  style={{display: 'inline-block',position: 'relative'}}
                  onClick={refreshCallback}
                />
              </h1>

            </div>
            <div style={{width:'60%',display:'inline-block',textAlign:'right'}}>
              {props.children}
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <ReactTable
              data={transactions[filter?filter:'uncategorizedTransactions']}
              noDataText={loading?'Loading Mappings':'No Mappings Found'}
              columns={columns}
              className="-striped -highlight"
              defaultPageSize={20}
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
        <AddMapping
          isOpen={showCreateMapping.active}
          guessTransactions={showCreateMapping.data}
          toggle={()=>updateShowCreateMapping({active:false})}
          withButton={false}
          refreshData={refreshCallback}
          initialValues={genInitialMappingValues()}
        />
      </div>
    )
}
const mapStateToProps = state => ({

})
function matchDispatchToProps(dispatch){
  return  bindActionCreators({
    ignoreTransaction:ignoreTransaction,
    controlComponent:controlComponent,
  },dispatch)
}

// MappingTable.propTypes={
//   label:PropTypes.string.isRequired
// }

export default compose(
  connect(mapStateToProps,matchDispatchToProps),
  withState('snackText','snackToast',false),
  withState('showCreateMapping','updateShowCreateMapping',{active:false})//Shape:{active:bool,data:{transactionEntity}}
)(TransactionsTable)
