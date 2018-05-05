import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withState,compose,lifecycle,shouldUpdate} from 'recompose';
import PropTypes from 'prop-types';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper'
import {Row,Col} from 'react-bootstrap'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {toast} from 'react-toastify'
import CircularProgress from 'material-ui/CircularProgress';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import AddCategory from 'CategoryManager/components/AddCategory'
import '../style.css'
//COMPONENTS//
  import AutoComplete from 'material-ui/AutoComplete';
  import Mobile from 'HOC/mobile'
  import FlexDialog from 'components/FlexDialog'
  import FlatButton from 'material-ui/FlatButton';
  import AddActionButton from 'components/AddActionButton'
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
    cancelCallback,isMobile,
    refreshData,...props
  }) => {
    function handleSubmit(){
      updateIsSubmitting(true,()=>{
        var finalKeyword = keyword?keyword:initialValues.keyword?initialValues.keyword:false
        var finalMatchType = matchType?matchType:initialValues.matchType?initialValues.matchType:false
        var finalCategory = category?category:initialValues.category?initialValues.category:false
        console.log(finalKeyword,finalCategory,finalMatchType)
        if(!finalKeyword || !finalMatchType || !finalCategory){
          toast.error('Failed To Map')
          return false
        }
        addMapping(finalKeyword,finalMatchType,finalCategory)
        .then(response=>{
          if(response.status){
            toast.success('Mapping added, running categorizer')
            toggle();
            return runCategorizer()
          }
          else
            toast.error('Could not create mapping, please try again')
        })
        .then(response=>{
          if(response.status){
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
        onClick={()=>{
          toggle();
          cancelCallback?cancelCallback():null;
        }}
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
            console.log(trans);
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
      updateMatchType(matchType)
      if(matchType=='name' || matchType=='plaidTag'){
        var autocompleteArray = genAutocompleteArray(matchType)
        updateKeyword(autocompleteArray[0])
        updateShowAutocomplete(true)
      }
      if(matchType=='id'){
        if(guessTransactions)
          updateKeyword(guessTransactions[0].transaction_id)
        else
         throw 'Cannot find transaction id'
        updateShowAutocomplete(false)
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
          {
            withButton &&
            <AddActionButton onClick={toggle}/>
          }
          <FlexDialog
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
              <MenuItem value={'id'} primaryText="Transaction Only" secondaryText={!isMobile?'use this to map an individual transaction':''}/>
              <MenuItem value={'plaidTag'} primaryText="Smart Categories" secondaryText={!isMobile?'use this for the smartest type of matching':''}/>
              <MenuItem value={'name'} primaryText="Transaction Name" secondaryText={!isMobile?'use this for a more customized match':''}/>
            </SelectField>
            {/*autocompleteValue() && ['plaidTag','name'].indexOf(getMatchType())>=0*/}
            {showAutocomplete &&
              <AutoComplete
                hintText="..."
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
          </FlexDialog>
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
  Mobile(),
  connect(mapStateToProps,matchDispatchToProps),
  withState('keyword','updateKeyword',false),
  withState('category','updateCategory',false),
  withState('matchType','updateMatchType',false),
  withState('showAddCategory','updateShowAddCategory',false),
  withState('isSubmitting','updateIsSubmitting',false),
  withState('showAutocomplete','updateShowAutocomplete',true),
  withState('autocompleteArray','updateAutocompleteArray',false),
)(AddMapping)
