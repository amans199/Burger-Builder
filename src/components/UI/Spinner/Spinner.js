import React from 'react';
import './Spinner.css'
import Aux from '../../../hoc/Auxiliary/Auxiliary'
const spinner = (props) => {
  let pageErrorOrLoader
  if (props.error) {
    pageErrorOrLoader = <p className="text-center">Error in the page , please call support</p>
  } else {
    pageErrorOrLoader = <div className="loader">Loading...</div>
  }
  return (
    <Aux>
      {pageErrorOrLoader}
    </Aux>
  )
}

export default spinner