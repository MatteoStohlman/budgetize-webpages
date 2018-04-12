import React from 'react';
import {withState,compose} from 'recompose';
import PropTypes from 'prop-types';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper'
import {Row,Col} from 'react-bootstrap'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import {toast} from 'react-toastify'
import CircularProgress from 'material-ui/CircularProgress';
import {addCategory} from 'api/categories'


const AddCategory =
  ({
    categoryName,updateCategoryName,
    toggle,isOpen,
    style,className,
    isSubmitting,updateIsSubmitting,
    withButton=true,
    callback,...props
  }) => {
    function handleSubmit(){
      updateIsSubmitting(true,()=>{
        addCategory(categoryName).then(response=>{
          if(response.status){
            toggle();
            updateIsSubmitting();
            callback();
            toast.success('Category added, refreshing categories list')
          }else{
            updateIsSubmitting();
            toast.error('Could not create category, please try again')
          }
        })
      })
    }
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={toggle}
      />,
      <FlatButton
        label="Save Category"
        secondary={true}
        onClick={handleSubmit}
        disabled={isSubmitting}
      />,
    ];
    return (
        <div style={style} className={className}>
          {withButton && <RaisedButton label='Add Category' onClick={toggle} primary={true} style={{marginRight:10,marginLeft:10}}/>}
          <Dialog
            title="Add A Category"
            actions={actions}
            modal={true}
            open={isOpen}
          >
            {isSubmitting &&
              <CircularProgress size={60} thickness={7} style={{position:'absolute',left:'50%',top:'50%',transform:'translate(-30px,-30px)'}}/>
            }
            <TextField
              hintText="Rent, Insurance, Food"
              floatingLabelText="Category Name"
              fullWidth={true}
              onChange={(event,value)=>updateCategoryName(value)}
              disabled={isSubmitting}
            />
          </Dialog>
        </div>
    )
}

// AddCategory.propTypes={
//   //label:PropTypes.string.isRequired
// }

export default compose(
  withState('categoryName','updateCategoryName',''),
  withState('isSubmitting','updateIsSubmitting',false)
)(AddCategory)
