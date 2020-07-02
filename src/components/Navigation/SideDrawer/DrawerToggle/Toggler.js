import React from 'react';
import './Toggler.css'
const drawerToggle = (props) => (
  <div onClick={props.clicked} className="DrawerToggle">
    <div></div>
    <div></div>
    <div></div>
  </div>
)

export default drawerToggle