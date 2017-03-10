import React from 'react';

class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render(){
    return (
      <div className="jumbotron">
        <h1>MERN seed App</h1>
        <p>MongoDB, ExpressJS, React, Node using Redux in ES6 for ultra-responsive webapps.</p>
      </div>
    );
  }
}

export default HomePage;
