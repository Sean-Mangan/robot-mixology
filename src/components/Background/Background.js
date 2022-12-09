import React from 'react';
import "./Background.css"

function Background({children}) {
  return (
    <div className='drop'>
        <div style={{minHeight:"100vh"}}>
            {children}
        </div>
    </div>
  )
}

export default Background