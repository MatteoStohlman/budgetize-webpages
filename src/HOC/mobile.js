import React from 'react';
const Mobile=()=>(WrappedChild,...props)=>{
  function isMobileDevice() {
      return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
  };
  return (props) => (
      <WrappedChild {...props} isMobile={isMobileDevice()}/>
  );
}
export default Mobile
