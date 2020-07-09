import React from 'react';
import './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/Toggler'
import BreadcrumbMaster from 'the-simplest-breadcrumb'
// const BreadcrumbMaster = () => import('the-simplest-breadcrumb');

const toolbar = (props) => {

  BreadcrumbMaster({
    wrapper_id: 'breadcrumb199__list',
    splitter: '/',
    styles: {
      items_gab: '5px', // margin between items
      color: '#fff', // color of all the items
      color_selected: '#000', // color of selected item
      splitter_color: '#fff'
    },
    strings: {
      home: 'Home' // home : to change the text in the first item
    },
    // customElements: [ // customElements : if you want to use custom static elements 
    //   { index: 1, text: 'firstElement', url: '#' },
    //   { index: 2, text: 'secondElement', url: '#' },
    //   { index: 3, text: 'thirdElement', url: '#' },
    //   { index: 4, text: 'fourthElement', url: '#' },
    // ]
  })
  return (
    <header className="Toolbar">
      {/* <div>MENU</div> */}
      <DrawerToggle clicked={props.drawerToggleClicked} />
      <Logo />
      <div id="breadcrumb199__list"></div>
      <nav className="DesktopOnly">
        <NavigationItems />
      </nav>
    </header>
  )
}

export default toolbar;