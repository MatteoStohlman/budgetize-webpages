import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import {primary,secondary} from 'Main/theme'
const Loading=WrappedChild=>({loading,...props})=>{
  console.log(props);
  return(
      <div>
        {loading && <CircularProgress color={secondary.main} size={30} style={{position:'fixed',left:'50%',zIndex:9999,top:5,transform:'translateX(-15px)'}}/>}
        <WrappedChild {...props} loading={loading}/>
      </div>
  )
}
export default Loading
