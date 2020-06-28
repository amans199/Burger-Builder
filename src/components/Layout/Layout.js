// const { ProgressPlugin } = require("webpack");

import React from 'react'
import Aux from '../../hoc/Auxiliary'
// import classes from './Layout.css'

const layout = (props) => (
  <Aux>
    <div>toolbar, sidedrawer, Backdrop</div>
    <main className="mt-3">
      {props.children}
    </main>
  </Aux>
);

export default layout;