import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
// import TheSimplestBreadcrumb from 'the-simplest-breadcrumb'
class App extends Component {
  render() {
    return (
      <div>
        {/* <TheSimplestBreadcrumb /> */}
        <Layout>
          <BurgerBuilder />
        </Layout>
      </div >
    );
  }
}

export default App;
