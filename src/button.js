import React from 'react';

class Button extends React.Component {
    render() {
      return <button>{this.props.name}</button>;
    }
  }

  export default Button; // Don’t forget to use export default!