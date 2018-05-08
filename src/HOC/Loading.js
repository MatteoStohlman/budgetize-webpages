import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {primary,secondary} from 'Main/theme'
const Loading=WrappedChild=>({loading,...props})=>{
  return(
      <div>
        {loading &&
          <div style={{position:'fixed',zIndex:999999,width:'100vw',height:'100vh',top:0,left:0,backgroundColor:'rgb(0,0,0,.3)'}}>
            <span
              style={{
                width:60,
                height:100,
                position:'absolute',
                left:'50%',
                top:'50%',
                transform:'translate(-30px,-50px)',
              }}
            >
              <RefreshIndicator
                style={{
                  left:30,
                  top:30,
                  transform:'translate(-30px,-30px)',
                }}
                size={60}
                status='loading'
                color={secondary.main}
              />
              <span style={{position:'absolute',bottom:0,left:0}}>Loading...</span>
            </span>
          </div>
        }
        <WrappedChild {...props} loading={loading}/>
      </div>
  )
}
export default Loading
