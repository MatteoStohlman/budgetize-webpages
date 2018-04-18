import React from 'react';
const Mobile=()=>(WrappedChild)=>{
  function isMobileDevice() {
      return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
  };
  return (props) => (
      <WrappedChild {...props} isMobile={true}/>
  );
}
export default Mobile
