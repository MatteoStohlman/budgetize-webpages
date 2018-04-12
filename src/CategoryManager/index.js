import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withState,compose,lifecycle} from 'recompose';
import PropTypes from 'prop-types';

//COMPONENTS//
import CategoriesTable from 'CategoryManager/components/CategoriesTable'
import AddCategory from './components/AddCategory'

//ACTIONS//
import {updateCategories} from './actions'
//import {getUserCategories} from 'api/categories'

const CategoryManager =
  ({
    categories,isOpen,...props,
    showAddCategory,toggleShowAddCategory,
    updateCategories,
  }) => {
  return (
  	<div>
  		<CategoriesTable
        categories={categories.data}
        refreshUserCategories={updateCategories}
        loading={categories.requesting}
      >
        <AddCategory
          refreshData={updateCategories}
          toggle={()=>toggleShowAddCategory(!showAddCategory)}
          isOpen={showAddCategory}/>
      </CategoriesTable>
  	</div>
  )
}
const mapStateToProps = state => ({
  categories:state.categories
})
function matchDispatchToProps(dispatch){
  return  bindActionCreators({
    updateCategories:updateCategories
  },dispatch)
}

export default compose(
  connect(mapStateToProps, matchDispatchToProps),
  withState('showAddCategory','toggleShowAddCategory',false),
  lifecycle({
    componentDidMount(){
      this.props.updateCategories()
    }
  })
)(CategoryManager)

// export default compose(
//   withState('activeTab','updateActiveTab','search')
// )(TabBar)
