import React from 'react';
import './BuildControl.css'
const buildControl = (props) => (
  <div className="BuildControl d-flex align-items-center justify-content-between my-2 row">
    <div className="col-4 Label">{props.label}</div>
    <div className="col-8 d-flex">
      <button className="Less" onClick={props.removed} disabled={props.disabled}>
        Less
    </button>
      <button className="More" onClick={props.added}>
        More
    </button></div>
  </div>
)

export default buildControl;