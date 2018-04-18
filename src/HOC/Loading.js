import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import {pink500} from 'material-ui/styles/colors';
const Loading=WrappedChild=>({loading,...props})=>{
  return(
      <div>
        {loading && <CircularProgress color={pink500} size={30} style={{position:'absolute',left:'50%',zIndex:9999,top:35,transform:'translateY(-30px)'}}/>}
        <WrappedChild {...props}/>
      </div>
  )
}
export default Loading
