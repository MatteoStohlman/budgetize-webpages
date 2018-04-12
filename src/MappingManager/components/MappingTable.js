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
import {deleteMapping} from 'api/mapping'
import {toast} from 'react-toastify'
import RefreshIndicator from 'material-ui/RefreshIndicator';

const MappingTable = ({
    snackText,snackToast,
    callback,loading,
    mappings,...props
  }) => {
    const columns = [
      {
        Header: 'Match Type',
        accessor: 'match_type',
      },
      {
        Header: 'Keyword',
        accessor: 'keyword',
      },
      {
        Header: 'Category Name',
        accessor: 'categoryName',
      },
      {
        width:35,
        Cell:({row})=>{
          console.log(row)
          return(
            <IconMenu
              iconButtonElement={<MoreVertIcon/>}
              anchorOrigin={{horizontal: 'left', vertical: 'top'}}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem primaryText="Delete" onClick={()=>handleDelete(row._original.id,row.keyword,row.match_type,row.categoryName)}/>
            </IconMenu>
          )
        }
      }
    ]
    function handleDelete(id,keyword, matchType, category){
      snackToast('Deleting Mapping for keyword: '+keyword,()=>{
        deleteMapping(id).then(response=>{
          if(response.status){
            callback();
            toast.success('Mapping deleted, refreshing mappings')
          }else{
            toast.error('Unable to delete Mapping, please try again')
          }
          snackToast(false)
        })
      })
    }
    const isLoading = loading && mappings.length===0;
    return(
      <div>
        <Row>
          <Col xs={12}>
            <div style={{width:'40%',display:'inline-block'}}>
              <h1 style={{marginLeft:10}}>Mappings
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
            </div>
            <div style={{width:'60%',display:'inline-block',textAlign:'right'}}>
              {props.children}
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <ReactTable
              data={mappings}
              noDataText={isLoading?'Loading Mappings':'No Mappings Found'}
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
      </div>
    )
}

// MappingTable.propTypes={
//   label:PropTypes.string.isRequired
// }

export default compose(
  withState('snackText','snackToast',false),
)(MappingTable)
