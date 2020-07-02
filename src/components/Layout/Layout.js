// const { ProgressPlugin } = require("webpack");

import React from 'react'
import Aux from '../../hoc/Auxiliary'
// import classes from './Layout.css'
import './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
const layout = (props) => (
  <Aux>
    <Toolbar></Toolbar>
    <main className="Content">
      {props.children}
    </main>
  </Aux>
);

export default layout;