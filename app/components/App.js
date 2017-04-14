import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Header from './common/Header';
import Footer from './common/Footer';

// This component handles the App template used on every page.
class App extends React.Component {
  render(){
    return (
      <main>
        <Header/>
        {this.props.children}
        <Footer/>
      </main>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default connect()(App);
