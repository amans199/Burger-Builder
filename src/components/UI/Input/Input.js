import React from 'react';
import './Input.css';
const input = (props) => {
  let inputElement = null;
  switch (props.elementType) {
    case ('input'):
      inputElement = <input className="InputElement" {...props.elementConfig} value={props.value} />
      break;
    case ('textarea'):
      inputElement = <textarea className="InputElement" {...props.elementConfig} value={props.value} />
      break;
    default:
      inputElement = <input className="InputElement" {...props.elementConfig} value={props.value} />
  }
  return (
    <div className="Input">
      <label className="Label w-100 mb-0 text-left pl-0">{props.label}</label>
      {inputElement}
    </div>
  )
}

export default input;