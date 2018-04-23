import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import {pink500} from 'material-ui/styles/colors';
const Loading=WrappedChild=>({loading,...props})=>{
  return(
      <div>
        {loading && <CircularProgress color={pink500} size={30} style={{position:'absolute',left:'50%',zIndex:9999,top:5,transform:'translateX(-15px)'}}/>}
        <WrappedChild {...props} loading={loading}/>
      </div>
  )
}
export default Loading
