import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withState,compose,lifecycle,shouldUpdate} from 'recompose';
import PropTypes from 'prop-types';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper'
import {Row,Col} from 'react-bootstrap'
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {toast} from 'react-toastify'
import CircularProgress from 'material-ui/CircularProgress';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import AddCategory from 'CategoryManager/components/AddCategory'
//MATERIAL COMPONENTS//
import AutoComplete from 'material-ui/AutoComplete';
//ACTIONS//
import {addMapping} from 'api/mapping'
import {getUserCategories} from 'api/categories'
import {runCategorizer} from 'api/categorizer'

const AddMapping =
  ({
    keyword,updateKeyword,
    category,updateCategory,
    matchType,updateMatchType,
    initialValues,
    toggle,isOpen,
    style,className,
    showAddCategory,updateShowAddCategory,
    isSubmitting,updateIsSubmitting,categories,
    withButton=true,guessTransactions,
    showAutocomplete,updateShowAutocomplete,
    autocompleteArray,updateAutocompleteArray,
    refreshData,...props
  }) => {
    function handleSubmit(){
      updateIsSubmitting(true,()=>{
        addMapping(keyword,matchType,category)
        .then(response=>{
          if(response.status){
            toast.success('Mapping added, running categorizer')
            return runCategorizer()
          }
          else
            toast.error('Could not create mapping, please try again')
        })
        .then(response=>{
          if(response.status){
            toggle();
            updateIsSubmitting();
            refreshData();
            toast.success('Categorizer complete. '+response.message)
          }else{
            updateIsSubmitting();
            toast.error('Categorizer Failed, please try again')
          }
        })
      })
    }
    const actions = [
      <FlatButton
        label='Add Category'
        primary={true}
        onClick={()=>updateShowAddCategory(true)}
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={toggle}
      />,
      <FlatButton
        label="Save Mapping"
        secondary={true}
        onClick={handleSubmit}
        disabled={isSubmitting}
      />,
    ];
    function genAutocompleteArray(matchType){
      //console.log('generatingAutocompleteArray',matchType);
      //console.log(guessTransactions);
      var returnValue = []
      if(guessTransactions){
        if(matchType=='name'){
          guessTransactions.map((trans)=>{
            trans.name.split(" ").map((word)=>{
              returnValue.push(word)
            })
          })
        }else if(matchType=='plaidTag'){
          guessTransactions.map((trans)=>{
            JSON.parse(trans.plaidTags).map((plaidTag)=>{
              returnValue.push(plaidTag)
            })
          })
        }
        //console.log(returnValue);
        updateAutocompleteArray(returnValue)
        return returnValue
      }else{
        updateAutocompleteArray([])
        return []
      }
    }
    function handleMatchTypeSelect(matchType){
      //console.log('updating match type to: '+matchType);
      updateMatchType(matchType)
      var autocompleteArray = genAutocompleteArray(matchType)
      updateKeyword(autocompleteArray[0])
      if(matchType=='name' || matchType=='plaidTag'){
        //console.log('updatingShowAutoComplete');
        updateShowAutocomplete(true)
      }
      if(matchType=='id' && guessTransactions){
        updateKeyword(guessTransactions[0].transaction_id)
      }
    }
    function autocompleteValue(){
      if(keyword)
        return keyword
      else if(initialValues && initialValues.keyword)
        return initialValues.keyword
      else
        return false
    }
    function getMatchType(){
      //console.log('gettingMatchType')
      if(matchType)
        return matchType
      else if(initialValues.matchType)
        return initialValues.matchType
      else
        return false
    }
    if(!autocompleteArray && initialValues && initialValues.matchType)
      genAutocompleteArray(initialValues.matchType)
    return (
        <div style={style} className={className}>
          {showAddCategory &&
            <AddCategory
              isOpen={true}
              toggle={()=>updateShowAddCategory(false)}
              withButton={false}
              callback={refreshData}
            />
          }
          {withButton && <RaisedButton label='Add Mapping' onClick={toggle} primary={true} style={{marginRight:10,marginLeft:10}}/>}
          <Dialog
            title="Add A Mapping"
            actions={actions}
            modal={true}
            open={isOpen}
          >
            {isSubmitting &&
              <CircularProgress size={60} thickness={7} style={{position:'absolute',left:'50%',top:'50%',transform:'translate(-30px,-30px)'}}/>
            }
            <SelectField
              floatingLabelText="Match Type"
              value={matchType?matchType:initialValues?initialValues.matchType:''}
              fullWidth={true}
              onChange={(event,index,value)=>handleMatchTypeSelect(value)}
              disabled={isSubmitting}
            >
              <MenuItem value={'id'} primaryText="Transaction Only" secondaryText='use this to map an individual transaction'/>
              <MenuItem value={'plaidTag'} primaryText="Plaid Tag" secondaryText='use this for the smartest type of matching'/>
              <MenuItem value={'name'} primaryText="Transaction Name" secondaryText='use this for a more customized match'/>
            </SelectField>
            {/*autocompleteValue() && ['plaidTag','name'].indexOf(getMatchType())>=0*/}
            {showAutocomplete &&
              <AutoComplete
                hintText="Giant, Sunoco, Landlord"
                floatingLabelText="Keyword"
                fullWidth={true}
                dataSource={autocompleteArray?autocompleteArray:[]}
                onUpdateInput={(value)=>{console.log(value);updateKeyword(value)}}
                onNewRequest={(value)=>updateKeyword(value)}
                filter={AutoComplete.fuzzyFilter}
                openOnFocus={true}
                //searchText={autocompleteValue()}
                menuStyle={{maxHeight:200}}
              />
            }
            <SelectField
              floatingLabelText="Category"
              value={category?category:initialValues?initialValues.category:''}
              fullWidth={true}
              onChange={(event,index,value)=>{console.log(value);updateCategory(value)}}
              disabled={isSubmitting}
            >
            {
              categories.length?
                categories.map((category)=>{
                  return(
                    <MenuItem value={category.id} primaryText={category.name}/>
                  )
                }):
                null
            }
            </SelectField>
          </Dialog>
        </div>
    )
}

const mapStateToProps = state => ({
  categories:state.categories.data,
})
function matchDispatchToProps(dispatch){
  return  bindActionCreators({
    updateCategories:getUserCategories
  },dispatch)
}
// AddCategory.propTypes={
//   //label:PropTypes.string.isRequired
// }

export default compose(
  connect(mapStateToProps,matchDispatchToProps),
  withState('keyword','updateKeyword',false),
  withState('category','updateCategory',false),
  withState('matchType','updateMatchType',false),
  withState('showAddCategory','updateShowAddCategory',false),
  withState('isSubmitting','updateIsSubmitting',false),
  withState('showAutocomplete','updateShowAutocomplete',true),
  withState('autocompleteArray','updateAutocompleteArray',false),
)(AddMapping)
