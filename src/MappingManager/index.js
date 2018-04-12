import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withState,compose,lifecycle} from 'recompose';
import PropTypes from 'prop-types';
//COMPONENTS//
import MappingTable from './components/MappingTable'
import AddMapping from './components/AddMapping'
//ACTIONS//
import {updateMappings} from './actions'
import {updateCategories} from 'CategoryManager/actions'

const MappingManager = ({
    showAddMapping,toggleShowAddMapping,
    categories,updateCategories,
    mappings,updateMappings,...props
  }) => {
    return (
      <div>
        <MappingTable
          mappings={mappings.data}
          callback={updateMappings}
          loading={mappings.requesting}
        >
          <AddMapping
            refreshData={()=>{updateMappings();updateCategories()}}
            toggle={()=>toggleShowAddMapping(!showAddMapping)}
            isOpen={showAddMapping}
          />
        </MappingTable>
      </div>
    )
}

const mapStateToProps = state => ({
  categories:state.categories,
  mappings:state.mappings,
})
function matchDispatchToProps(dispatch){
  return  bindActionCreators({
    updateCategories:updateCategories,
    updateMappings:updateMappings
  },dispatch)
}

export default compose(
  connect(mapStateToProps, matchDispatchToProps),
  withState('showAddMapping','toggleShowAddMapping',false),
  lifecycle({
    componentDidMount(){
      this.props.updateMappings()
      this.props.updateCategories()
    }
  })
)(MappingManager)
