import React from 'react';
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
import AddMapping from 'MappingManager/components/AddMapping'
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {DATE} from 'CONSTANTS'
//ACTIONS//

const TransactionsTable = ({
    transactions,updateTransactions,
    snackText,snackToast,
    showCreateMapping,updateShowCreateMapping,
    loading,refreshCallback,
    categories,filter,
    ...props
  }) => {
    const columns = [
      {
        Header: 'Transaction Name',
        accessor: 'name',
      },
      {
        Header: '$ Value',
        id: 'value',
        accessor: ({value})=>{
          if(value>0)
            return( <span style={{color:'green'}}>{numeral(value).format('$0.00')}</span> )
          else
            return( <span style={{color:'red'}}>{numeral(value).format('$0.00')}</span> )

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
        Header: 'Transaction Date',
        id:'transactionDate',
        accessor: ({transaction_date})=>(
          moment(transaction_date).isValid()?
            moment(transaction_date).format(DATE.formats.pretty):
            null
        ),
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

// MappingTable.propTypes={
//   label:PropTypes.string.isRequired
// }

export default compose(
  withState('snackText','snackToast',false),
  withState('showCreateMapping','updateShowCreateMapping',{active:false})//Shape:{active:bool,data:{transactionEntity}}
)(TransactionsTable)
