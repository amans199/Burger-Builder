// const { ProgressPlugin } = require("webpack");

import React from 'react'
import Aux from '../../hoc/Auxiliary'
// import classes from ''

const layout = (props) => (
  <Aux>
    <div>toolbar, sidedrawer, Backdrop</div>
    <main>
      {props.children}
    </main>
  </Aux>
);

export default layout;