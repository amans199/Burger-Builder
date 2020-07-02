import React from 'react';
import './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/Toggler'
const toolbar = (props) => (
  <header className="Toolbar">
    {/* <div>MENU</div> */}
    <DrawerToggle clicked={props.drawerToggleClicked} />
    <Logo />
    <nav className="DesktopOnly">
      <NavigationItems />
    </nav>
  </header>
)

export default toolbar;